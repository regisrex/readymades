import { ApiResponse } from "$lib/server/apiResponse";
import { prisma } from "$lib/server/database";
import env from "$lib/server/env";
import { type RequestEvent } from "@sveltejs/kit";
import { compare, hash } from "bcrypt";
import jwt from 'jsonwebtoken';
import type { ILoginDTO, ISignupDTO } from "./dtos";


export async function POST(event: RequestEvent) {
    const query = new URL(event.request.url)
    const requestFor = query.searchParams.get("for")
    const body = await event.request.json()
    switch (requestFor) {
        case ("signup"):
            return await signup(body as ISignupDTO)
        case ("login"):
            return await login(body as ILoginDTO)
        default:
            return ApiResponse(404, false, "Resource not found")
    }

}


async function signup(body: ISignupDTO) {
    try {

        const data: ISignupDTO = body;
        const passwordMatch = data.password === data.confirm_password;
        if (!passwordMatch) throw new Error("Passwords mismatch")

        const emailTaken = await prisma.admin.findUnique({
            where: { email: data.email }
        })
        if (emailTaken) throw new Error("Email already in use")

        const verificationCode = Math.random().toString(36).substring(7).toUpperCase()
        const hashedPassword = await hash(data.password, 10)

        await prisma.admin.create({
            data: {
                email: data.email,
                full_name: data.fullname,
                password: hashedPassword,
                verification_code: verificationCode
            }
        })

        return ApiResponse(200, true, "Admin added, check your email for verification")
    } catch (error: any) {
        return ApiResponse(500, false, "Something went wrong", null, error.message)
    }
}

async function login(body: ILoginDTO) {
    try {


        const { email, password } = body
        const admin = await prisma.admin.findUnique({
            where: {
                email
            }
        })
        if (!admin) throw new Error("Admin not found")
        const passwordMatch = await compare(password, admin.password)
        if (!passwordMatch) throw new Error("Password is incorrect")

        const token = jwt.sign({
            email: admin.email,
            id: admin.id
        }, env.JWT_SECRET, {
            expiresIn: '1day'
        })

        return ApiResponse(200, true, `Signed in  as ${admin.full_name}`, {
            token: token
        })
    } catch (error: any) {
        return ApiResponse(500, false, "Something went wrong", null, error.message)
    }

}