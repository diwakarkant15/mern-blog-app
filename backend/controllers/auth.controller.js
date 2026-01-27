import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const signup = async(req, res) => {
    
    const {name, username, email, password} = req.body

    try{
    if(!username || !name || !email || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
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