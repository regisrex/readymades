import { ApiResponse, errorHandler } from "$lib/server/apiResponse";
import cloudinary from "$lib/server/cloudinary";
import type { RequestEvent } from "@sveltejs/kit";
import { deleteSchema, uploadSchema } from "./dtos";

export async function POST(event: RequestEvent) {
    try {
        const { file, filename } = uploadSchema.parse(await event.request.json())
        const file_url = await uploadFile(file, filename)
        return ApiResponse(200, true, 'File uploaded', file_url)
    } catch (error) {
        return errorHandler(error)
    }

}
export async function DELETE(event: RequestEvent) {
    try {
        const { file_url } = deleteSchema.parse(await event.request.json())
        const file = await deleteFile(file_url)
        return ApiResponse(200, true, 'File deleted', file)
    } catch (error) {
        return errorHandler(error)
    }

}

async function uploadFile(file: string, filename: string) {
    const res = await cloudinary.uploader.upload(file, {
        access_mode: 'public',
        public_id: filename
            .replaceAll(/[. ]/g, '-')
            .toLocaleLowerCase(),
        allowed_formats: ['jpg', 'png', 'jpeg', 'webm', 'webp', 'pdf'],
    });
    return res.secure_url
}

async function deleteFile(url: string) {
    const publicId = url.split('/').pop()!.split('.')[0];
    const res = await cloudinary.uploader.destroy(publicId);
    return res.result
}