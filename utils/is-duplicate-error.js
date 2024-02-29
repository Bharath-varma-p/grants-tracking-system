module.exports.isDuplicateError = (error) => error.code === "ER_DUP_ENTRY" && error.message.includes("random_uuid_key");
