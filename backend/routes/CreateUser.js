// router, routes

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = "MyNameIsPreetKMistryandIamACSE$#"
// require('dotenv').config();

// bcryptjs => for password hashing
const bcrypt = require('bcryptjs');

// jwt => json web token => for authentication => use at time of login
const jwt = require('jsonwebtoken');


// 2 methods : get, post
// get => to fetch the data
// post => to send the data

// validations added

router.post('/createUser',
    [body('email', 'Email incorrect, Email should contain @ !').isEmail(),
    body('name', 'Write a Valid Name !').isLength({ min: 3 }),
    body('password', 'Password Not Valid !').isLength({ min: 5 })
    ],
    async (req, res) => {
        // jesi hi /createUser pe post request aayegi, ye function call hoga

        // validation based on the rules defined above
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // password hashing => bcryptjs
        // bcryptjs => mostly all functions are async
        const salt = await bcrypt.genSalt(10);

        // generate hash
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            // manually setting the fields => static
            // await User.create({
            //     name:"Shyam Das",
            //     location: "Delhi",
            //     email: "shyamdas123@gmail.com",
            //     password: "shyamdas123"
            // })

            // dynamic => data aayega frontend se or thuderclient body se
            // thunderclient mein header mein content-type application/json set karna padega
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            })

            res.json({ success: true });
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });

router.post('/loginUser',
    [body('email', 'Email incorrect, Email should contain @ !').isEmail(),
    body('password', 'Password Not Valid !').isLength({ min: 5 })
    ],
    async (req, res) => {

        // validation based on the rules defined above
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;

        try {
            // check and find the user entered details in the database
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Enter Valid Credentials" });
            }

            // compare the password entered by the user with the password stored in the database
            // bcryptjs => compare function
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Enter Valid Credentials" });
            }

            // jwt token generation
            // jwt.sign => to generate token
            const data = {
                user: {
                    // mongo db se _id leke yaha pein save kara lo
                    id: userData.id
                }
            }

            // make .env file in the root directory and add JWT_SECRET=your_secret_key
            // secret key will be random 32 character string

            // if JWT_SECRET is in .env file, then use process.env.JWT_SECRET
            // const authToken = jwt.sign(data, process.env.JWT_SECRET);

            // if JWT_SECRET is in the same file, then use JWT_SECRET
            // can also add expirry time => expiresIn: '3600s' => 1 hour => but we are not adding it

            // in this case the data will remain in the cache until the server is restarted or cache is cleared
            const authToken = jwt.sign(data, JWT_SECRET);

            return res.json({ success: true, authToken : authToken });
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });

module.exports = router;