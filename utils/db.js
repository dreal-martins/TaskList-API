const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

// const connectDb = (uri) => {
//   return mongoose.connect(uri);
// };

module.exports = connectDb;
