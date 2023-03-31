const Admin = require('./Schema')
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// *************************************************************************
const Register = asyncHandler(async (req, res) => {
	// Our register logic starts here
	try {
	  // Get user input
	  const { fullname, email, password } = req.body;
  
	  // Validate user input
	  if (!fullname || !email || !password) {
		res.status(400).send("All input is required");
	  }
  
	  // check if user already exist
	  // Validate if user exist in our database
	  const CheckUser = await Admin.findOne({ email });
  
	  if (CheckUser) {
		return res.status(409).send("Email Already Exist. Please Login");
	  }
	  //Encrypt user password
	  encryptedPass = await bcrypt.hash(password, 10);
	  // Create user in our database
	  const user = await Admin.create({
		fullname,
		email,
		password: encryptedPass,
	  });
  
	  // return new user
	  res.json({
		_id: user.id,
		fullname: user.fullname,
		email: user.email,
	  });
	} catch (err) {
	  console.log(err);
	  
	}
	// Our register logic ends here
  });
  
  
  
  // *************************************************************************
  const Login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
  
	// check email
	const user = await Admin.findOne({ email });
  
	if (user && (await bcrypt.compare(password, user.password))) {
	  res.json({
		_id: user.id,
		email: user.email,
		password: user.password,
		token: userToken(user._id),
	  });
	} else {
	  res.status(400).json({
		message: "Invalid Credentials",
	  });
	}
  });
  
  // Create token
  const userToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN, {
	  expiresIn: "2h",
	});
  };
module.exports = { Register, Login };
