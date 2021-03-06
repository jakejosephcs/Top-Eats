// Handles AWS S3 image upload and retrival
const aws = require("aws-sdk");
// dotenv file to hide environment variables
require("dotenv").config();

// Randomizing our image name
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);

// AWS info
const region = "us-east-1";
const bucketName = "4ww3-project-part-3-images";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_KEY_ID;

// Creating new S3 bucket
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

// Creating and returning our upload URL
async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

exports.generateUploadURL = generateUploadURL;
