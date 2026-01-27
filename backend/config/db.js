import  { mongoose, connect } from "mongoose";

export const connectToDb = async ()=> {
   try{
     await mongoose.connect(process.env.MONGO_URI);
     console.log("Database connection succesful✅")
   }
   catch(e){
    console.error("DB connection failure❌", e);
   }
}
