import { v2 as cloudinary } from 'cloudinary'

let configured = false

function ensureConfigured() {
  if (configured) return
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    const err = new Error('Cloudinary non configuré (variables CLOUDINARY_* manquantes)') as any
    err.status = 500
    throw err
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  })
  configured = true
}

export async function uploadProductImageBuffer(file: Express.Multer.File) {
  ensureConfigured()

  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'zen/products',
        resource_type: 'image',
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error || !result) return reject(error || new Error('Upload Cloudinary échoué'))
        resolve(result.secure_url)
      }
    )
    stream.end(file.buffer)
  })
}

