import cloudinary from "$lib/server/cloudinary";

export async function uploadFile(file: string, filename: string) {
    const res = await cloudinary.uploader.upload(file, {
        access_mode: 'public',
        public_id: filename
            .replaceAll(/[. ]/g, '-')
            .toLocaleLowerCase(),
        allowed_formats: ['jpg', 'png', 'jpeg', 'webm', 'webp', 'pdf'],
    });
    return res.secure_url
}

export async function deleteFile(url: string) {
    const publicId = url.split('/').pop()!.split('.')[0];
    const res = await cloudinary.uploader.destroy(publicId);
    return res.result
}