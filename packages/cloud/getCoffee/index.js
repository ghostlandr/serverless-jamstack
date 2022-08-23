const MongoClient = require('mongodb').MongoClient;

async function main() {
    const uri = process.env['DATABASE_URL'];
    let client = new MongoClient(uri);

    try {
        await client.connect();
        const inventory = await client.db('do-coffee').collection('available-coffees').find().toArray();
        console.log(inventory);
        return {
            body: inventory
        };
    } catch (e) {
        console.error(e);
        return {
            body: {
                error: 'There was a problem retrieving data.'
            },
            statusCode: 400,
        };
    } finally {
        await client.close();
    }
}

// Makes the function available as a module in the project.
module.exports.main = main;