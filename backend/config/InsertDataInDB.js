const { MongoClient } = require('mongodb');

// Replace with your own MongoDB URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function insertUsers() {
  try {
    await client.connect();
    const db = client.db('myDatabase');        // Replace with your DB name
    const usersCollection = db.collection('users');

    const users = [
      { name: 'Alice', email: 'alice@example.com', age: 25 },
      { name: 'Bob', email: 'bob@example.com', age: 30 },
      { name: 'Charlie', email: 'charlie@example.com', age: 22 }
    ];

    const result = await usersCollection.insertMany(users);
    console.log(`${result.insertedCount} users inserted successfully.`);
  } catch (error) {
    console.error('Error inserting users:', error);
  } finally {
    await client.close();
  }
}

insertUsers();


// to run : node filename.js
