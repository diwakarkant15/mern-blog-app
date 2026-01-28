import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js"

export const signup = async(req, res, next) => {
    
    const {name, username, email, password} = req.body

    try{
    if(!username || name==="" || email === "" || !password){
       next(errorHandler(400, "All fields are required"))
    } 

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        username,
        email,
        password: hashedPassword,
    })
    await user.save();
    
    console.log("User created successfully");
    res.json("signup successful", hashedPassword);

  }catch(e){
    res.status(500).json( {message: "Some error occured", error: e.message});
  }

}