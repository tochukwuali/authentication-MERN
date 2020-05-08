const User = require("../models/User");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// @desc Get all Transactions
// @route GET api/v1/Transactions
// @access public
exports.getUsers = async (req, res, next) => {
   try {
      const users = await User.find()

      return res.status(200).json({
         success: true,
         count: users.length,
         data: users
      }) 
   } catch (error) {
         return res.status(500).json({
            success: false,
            error: 'Server Error'
         })
   }
}

//@desc Add User
//@route POST api/v1/users
//@access public
exports.addUser = (req, res, next) => {

const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
if (!isValid) {
  return res.status(400).json(errors);
}

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  })
}; 

//@desc login a user and return JWT
//route POST api/v1/login
//@access Public
exports.loginUser = (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }    
        // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        }

        // Sign token
        jwt.sign(
          payload,
          process.env.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
  } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    })
  })        
}

