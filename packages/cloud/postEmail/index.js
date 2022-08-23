const MongoClient = require('mongodb').MongoClient;

async function main(args) {
    const uri = process.env['DATABASE_URL'];
    let client = new MongoClient(uri);

    let newEmail = args.email;
    try {
        await client.connect();
        await client.db('do-coffee').collection('email-list').insertOne({ subscriber: newEmail });
        console.log(`added ${newEmail} to the database`);
        return { ok: true };
    } catch (e) {
        console.error(e);
        return {
            body: {
                error: 'There was a problem adding the email address to the database.'
            },
            statusCode: 400,
        };
    } finally {
        await client.close();
    }
}

// Makes the function available as a module in the project.
module.exports.main = main;