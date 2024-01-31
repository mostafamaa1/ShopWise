import mongoose from 'mongoose';

const url = process.env.MONGODB_URI || "";

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB connection URL)
mongoose.connect(url)

// Drop the database
async function dropDatabase() {
  try {
    await mongoose.connection.db.dropDatabase();
    console.log('Database dropped successfully.');
  } catch (err) {
    console.error('Error dropping database:', err);
  } finally {
    // Close the Mongoose connection
    mongoose.connection.close();
  }
}

// Call the dropDatabase function
dropDatabase();
