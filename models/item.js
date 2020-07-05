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

const schema = new dynamoose.Schema({
    "id": String, // primary key - ITEM_ID
    "token": String, // ACCESS_TOKEN
    "bank": String // name of bank
}, {
    "timestamps": true
})

const Item = dynamoose.model('bnkr_items', schema)
// Item.scan().exec((err, res) => console.log(res))

module.exports = Item