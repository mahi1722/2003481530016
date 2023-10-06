const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Company = require("../models/companySchema");


const auth = async(req, res, next) => {
  try {
    let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "You are not logged in! Please log in to get access" });
  }

    //verification
  const decoded = await promisify(jwt.verify)(token, process.env.ACTIVATION_TOKEN_SECRET); // workon jwt secret

  //check if user still exists
  let currentUser = await Company.find({clientID:decoded.clientID});

  if (!currentUser) {
    return res.status(401).json({
      message: "The company belonging to this token no longer exists.",
    });
  }

  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = auth;
