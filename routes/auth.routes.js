const { Router } = require("express")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const config = require("config")


const router = Router()

router.post('/register',[
    check("email", "Not valid email").isEmail(),
    check("password", "Required lengths is 1").isLength({ min: 1 })
],async(req, res) => {
    try {      
        const errors = validationResult(req)
        
       
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid registration data"
            })
        }

        
        const { email, password } = req.body
        console.log("Body server output - ",req.body)
        const candidate = await User.findOne({ email })
        
        if (candidate) {
            return res.status(400).json({ message: "This Email already exists" })
        }
        
        const hashedPass = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPass })
        await user.save()
        res.status(201).json({ message: "User created with email " + email })


    } catch (e) {
        res.status(500).json({ message: "Something gone wrong, try again" })
    }
    
    
})


router.post('/login', [
    check("email", "Not valid email").normalizeEmail().isEmail,
    check("password", "Enter password").exists()
], async(req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid registration data"
            })
        }
        const { email, password } = req.body
        const user = await User.FindOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }
        const token = jwt.sign({ userId: user.id },
            config.get('jwtSecret'), {
                expiresIn: "1h"
            })
        res.json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({ message: "Something gone wrong, try again" })
    }
})

module.exports = router