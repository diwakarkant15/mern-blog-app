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


export const signin = async(req, res) => {
  const {email, password} = req.body;
  try{
  const user = await User.findOne({email});

  if(!user){
    return res.status(401).json({
      success: "false",
      message: "Invalid credentials"
    })
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if(!isPasswordCorrect){
   return res.status(401).json({message: "Bad request"});
  }

  return res.status(200).json({
    success: "true",
    message: "successfully signed in",
    user : {
      id: user._id,
      email: user.email,
      name: user.name,
    }
  })

}catch(e){
  return res.status(500).json( {message: "Some error occured", error: e.message});
}
}