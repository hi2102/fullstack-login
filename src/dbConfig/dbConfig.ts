import mongoose from 'mongoose';

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_DB_URI!)
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('MongoDB connected successfully')
    })

    connection.on('error', (err) => {
      console.log(`Connection Error. Please make sure MongoDB is running. ${err}`)
      process.exit();
    })
  } catch (error) {
    console.log('error =>', error)
    process.exit();
  }
}