import { ApiResponse } from "$lib/server/apiResponse"
import env from "$lib/server/env"
import jwt from "jsonwebtoken"
import type { RequestEvent } from "./routes/api/auth/$types"

// auth whitelist ( do not modify )
const WHITE_LIST = [
    '/api/products',
    '/api/auth?for=login'
]
export async function handle({ event, resolve }: { event: RequestEvent, resolve: any }) {

    if (!event.url.pathname.startsWith('/api')) return resolve(event)

    const url = new URL(event.request.url)
    const pathnameWithQuery = url.href.split(url.origin)[1]
    if (WHITE_LIST.includes(pathnameWithQuery)) return resolve(event)

    try {
        const authHeader = event.request.headers.get("Authorization")
        if (!authHeader) throw new Error("Unauthorized")
        const parsedHeader = authHeader.split(" ")
        if (!parsedHeader.at(0) || parsedHeader.at(0) != 'Bearer') throw new Error("Unauthorized")
        if (!parsedHeader.at(1)) throw new Error("Unauthorized")
        const jwtPayload = jwt.verify(parsedHeader.at(1) as string, env.JWT_SECRET)
        event.locals = jwtPayload
        return resolve(event)

    } catch (error: any) {
        return ApiResponse(400, false, error.message)
    }

}