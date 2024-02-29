globalThis.bucketHost = process.env.s3_bucket_host || "https://s3.wasabisys.com/";
globalThis.bucketName = process.env.s3_bucket_name || "peel9attach";
globalThis.bucketFullURL = globalThis.bucketHost + globalThis.bucketName;
