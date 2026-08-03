"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProductImageBuffer = uploadProductImageBuffer;
const cloudinary_1 = require("cloudinary");
let configured = false;
function ensureConfigured() {
    if (configured)
        return;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
        const err = new Error('Cloudinary non configuré (variables CLOUDINARY_* manquantes)');
        err.status = 500;
        throw err;
    }
    cloudinary_1.v2.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
    });
    configured = true;
}
async function uploadProductImageBuffer(file) {
    ensureConfigured();
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'zen/products',
            resource_type: 'image',
            use_filename: true,
            unique_filename: true,
        }, (error, result) => {
            if (error || !result)
                return reject(error || new Error('Upload Cloudinary échoué'));
            resolve(result.secure_url);
        });
        stream.end(file.buffer);
    });
}
