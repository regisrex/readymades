import { json } from "@sveltejs/kit";

export function ApiResponse<T>(status: number, success: boolean, message: string, data?: T, error?: string) {
    return json({
        status,
        success,
        message,
        data,
        error
    })
}

export function errorHandler(error: Error | any) {
    return ApiResponse(401, false, 'Something went wrong', null, error.message)
}