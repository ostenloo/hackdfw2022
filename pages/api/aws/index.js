import aws from "aws-sdk"
import crypto from "crypto"
/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
const AWS = (req, res) => {
    if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" })
    else {
        try {
            const region = process.env.AWS_REGION;
            const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
            const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
            const bucketName = process.env.AWS_BUCKET_NAME;

            const s3 = new aws.S3({
                region,
                accessKeyId,
                secretAccessKey,
                signatureVersion: "v4"
            });

            const rawBytes = crypto.randomBytes(16);
            const imgName = rawBytes.toString("hex");

            const params = {
                Bucket: bucketName,
                Key: imgName,
                Expires: 60,
            };

            const uploadURL = s3.getSignedUrl("putObject", params);

            return res.status(200).json({ uploadURL });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

export default AWS;