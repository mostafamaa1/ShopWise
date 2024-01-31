import mongoose from 'mongoose';

let isConnected = false;  // Variable to track the connection status

const { MONGODB_URI, MONGODB_URI_DEV } = process.env;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    const connectionUri = process.env.NODE_ENV === 'production' ? MONGODB_URI : MONGODB_URI_DEV;
    

    if(isConnected) return console.log('=> using existing database connection')

    try {
        await mongoose.connect(connectionUri!)

        isConnected = true;

        console.log('MONGODB connected')
    } catch (error) {
        console.log('Error connecting to MongoDB:', error)
        
    }
}