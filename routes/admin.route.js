require('dotenv').config()
const { Router } = require('express')
const router = Router()
const Admin = require('../models/admin.module')
const bcrypt = require('bcryptjs')
const jwtToken = require('jsonwebtoken')


router.post('/registration', async (req, res) => {
   try {
      const { login, password } = req.body

      if (!login && !password) {
         res.status(400).json({ message: 'Incorrect data during registration' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const admin = new Admin({
         login, password: hashedPassword
      })
      await admin.save()

      res.status(201).json({ message: 'Admin created' })
   }
   catch (error) {
      res.status(400).json({ message: 'Error creating admin' })
      console.error(error)
   }
})


router.post('/login', async (req, res) => {
   try {
      const { login, password } = req.body

      const admin = await Admin.findOne({ login })
      if (!admin) {
         return res.status(400).json({
            message: {
               login: 'Incorrect data during registration'
            }
         })
      }
      const isMatch = await bcrypt.compare(password,
         admin.password)

      if (!isMatch) {
         return res.status(400).json({
            message: {
               password: 'Incorrect data during registration!'
            }
         })
      }

      const jwtSecret = process.env.JWT_SECRET
      const token = jwtToken.sign(
         { adminId: admin.id },
         jwtSecret,
         { expiresIn: '1h' }
      )
      res.json({
         token,
         login: admin.login,
         adminId: admin.id,
      })
   }
   catch (error) {
      console.error(error)
   }
})

module.exports = router