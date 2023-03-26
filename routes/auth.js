const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET='ktiscool';
//end point to creat a user on /api/auth/createuser

router.post('/createuser', [body('name', 'Enter a valid name').isLength({ min: 3 }), body('email', 'Enter a valid email').isEmail(), body('password', 'Enter a valid password').isLength({ min: 5 })], async (req, res) => {

  // console.log(req.body);
  let success=false;
  //check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }
  //create a new user
  try {
    
    //check for unique email
    let user = await User.findOne({ email: req.body.email });
    //if user exist send error
    if (user) {
      return res.status(400).json({ success,error: "Sorry a user with this email already exist" });
    }
    const salt=await bcrypt.genSalt(10);
    const secPassword= await bcrypt.hash(req.body.password,salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
    })
    
    console.log(user.id);
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    // console.log(jwtData);
    success=true;
    res.json({success,authtoken});
  } catch (error) {
    res.status(500).send("Some error occured");
  }
})


//end point to login a user on /api/auth/login
router.post('/login', [ body('email', 'Enter a valid email').isEmail(), body('password', 'Password cannot be blank').exists()], async (req, res) => {
  let success=false;
  //check validation
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
const {email,password}=req.body;
try {
  let user=await User.findOne({email:email});
  if(!user){
    return res.status(400).json({ success,error: "Wrong Credentials" });
  }
  const passwordCompare=await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    return res.status(400).json({ success,error: "Wrong Credentials" });
  }
  const data={
    user:{
      id:user.id
    }
  }
  const authtoken=jwt.sign(data,JWT_SECRET);
  // console.log(jwtData);
  success=true;
  res.json({success,authtoken});

}catch (error) {
    res.status(500).send("Ineternal server error");
  }
})


//get loggedin user details:post /api/auth/getUser
router.post('/getuser',fetchuser, async (req, res) => {
  
  try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    
  }
  
})

module.exports = router;