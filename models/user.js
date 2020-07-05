const envvar = require('envvar');
const dynamoose = require("dynamoose");
// Create new DynamoDB instance
const ddb = new dynamoose.aws.sdk.DynamoDB({
    "accessKeyId": envvar.string('AWS_ACCESS_KEY_ID'),
    "secretAccessKey": envvar.string('AWS_SECRET_ACCESS_KEY'),
    "region": envvar.string('AWS_REGION')
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

const userSchema = new dynamoose.Schema({
    "email": String, // primary key
    "password": String,
    "items": {
        "type": Set,
        "schema": [String]
    }
}, {
    "timestamps": true,
    "saveUnknown": true
})

const User = dynamoose.model('bnkr_user', userSchema)

module.exports = User