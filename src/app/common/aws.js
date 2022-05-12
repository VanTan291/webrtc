require("dotenv").config({ path: __dirname + '/../../../.env', debug: process.env.DEBUG })
const fs = require("fs");
const { AWS_KEY_ID, AWS_SECRET_KEY, REGION, BUCKET } = process.env;
const AWS = require('aws-sdk');

class AmazonS3File {
    constructor() {
        AWS.config.update({
            accessKeyId: AWS_KEY_ID,
            secretAccessKey: AWS_SECRET_KEY,
            region: REGION
        });

        this.s3 = new AWS.S3();
    }

    saveFileS3(file, folder) {
        var params = { 
            Bucket: BUCKET, 
            Key: folder + '/' + Date.now() + '.jpg',
            Body: file.buffer
        };
        
        return new Promise((resolve, reject) => {
            this.s3.upload(params, async function (err, data) {
                if (err) {
                    reject(err);
                }

                resolve(data);
            })
        })
    }

    getFileS3(url) {
        var params = { Bucket: BUCKET, Key: url };
        return new Promise((resolve, reject) => {
            this.s3.getObject(params, async function (err, data) {
                if (err) {
                    reject(err);
                }

                resolve(data);
            })
        })
    }

    deleteFileS3(url) {
        var params = { Bucket: BUCKET, Key: url };
        return new Promise((resolve, reject) => {
            this.s3.deleteObject(params, function (err, data) {
                if (err) {
                    reject(err);
                }

                resolve(data);
            })
        })
    }

}

module.exports = AmazonS3File;