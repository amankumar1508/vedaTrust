const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

/**
 * @desc Upload file to S3
 */
exports.uploadFile = async (file, folder = 'prescriptions') => {
    const fileName = `${folder}/${Date.now()}-${file.originalname}`;
    
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        return {
            success: true,
            key: fileName,
            url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
        };
    } catch (error) {
        console.error("S3 Upload Error:", error);
        throw error;
    }
};

/**
 * @desc Delete file from S3
 */
exports.deleteFile = async (key) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
    };

    try {
        await s3Client.send(new DeleteObjectCommand(params));
        return { success: true };
    } catch (error) {
        console.error("S3 Delete Error:", error);
        throw error;
    }
};

/**
 * @desc Generate signed URL for private access
 */
exports.getPresignedUrl = async (key, expiresIn = 3600) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
    };

    try {
        const command = new GetObjectCommand(params);
        return await getSignedUrl(s3Client, command, { expiresIn });
    } catch (error) {
        console.error("Presigned URL Error:", error);
        throw error;
    }
};
