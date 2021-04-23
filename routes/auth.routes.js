const { Router } = require("express")
const User = require("../models/User")
const bcrypt = require("bcryptjs")

const router = Router()

router.post('/register', async(req, res) => {
    try {
        const { email, password } = req.body
        const candidate = await User.FindOne({ email })
        if (candidate) {
            return res.status(400).json({ message: "This Email already exists" })
        }
        const hashedPass = bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPass })
        await user.save()
        res.status(201).json({ message: "User created with email " + email })


    } catch (e) {
        res.status(500).json({ message: "Something gone wrong, try again" })
    }
})


router.post('/login', async(req, res) => {
    try {

    } catch (e) {

    }
})

module.exports = router