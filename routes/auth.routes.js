import express from "express";
import { user } from "../model/user.js";
import bcrypt from "bcrypt";

const Router = express.Router();

Router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
 

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
     const hashPass=await bcrypt.hash(password,10)

    const newUser = new user({ username, email, password:hashPass});
    await newUser.save();

    res.json({ message: "Account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating account" });
  }
});

// login

Router.post("/signin",async(req,res)=>
{
    const {email,password}=req.body;
    try{
    const existingUser=await user.findOne({email})
    if(!existingUser)
    {
        return res.status(400).json({message:"user not found"});
    }
    const isCompare=await bcrypt.compare(password, existingUser.password);
    
    if (!isCompare) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful", user: existingUser });
}
catch(err)
{
    console.error("login error",err)
     res.status(500).json({ message: "Error logging in" });
}

})

export default Router;
