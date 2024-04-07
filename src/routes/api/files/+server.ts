import { ApiResponse, errorHandler } from "$lib/server/apiResponse";
import type { RequestEvent } from "@sveltejs/kit";
import { uploadSchema } from "./dtos";
import { deleteFile, uploadFile } from "./utils";

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
        const file_url = new URL(event.request.url).searchParams.get("fileurl")
        if (!file_url) throw new Error("No file url provided")
        const file = await deleteFile(file_url)
        return ApiResponse(200, true, 'File deleted', file)
    } catch (error) {
        return errorHandler(error)
    }

}

