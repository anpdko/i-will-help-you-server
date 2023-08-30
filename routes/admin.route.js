require('dotenv').config()
const { Router } = require('express')
const router = Router()
const Admin = require('../models/admin.module')
const bcrypt = require('bcryptjs')
const jwtToken = require('jsonwebtoken')
const { verifyToken } = require('../middleware/admin.middleware');


// router.post('/registration', async (req, res) => {
//    try {
//       const { login, password } = req.body

//       if (!login || !password) {
//          return res.status(400).json({ message: 'Incorrect data during registration' })
//       }

//       const hashedPassword = await bcrypt.hash(password, 12)

//       const admin = new Admin({
//          login, password: hashedPassword
//       })
      
//       try {
//          await admin.save()
//          res.status(201).json({ message: 'Admin created' })
//       } catch (error) {
//          if (error.code === 11000 && error.keyPattern && 'login' in error.keyPattern) {
//             return res.status(409).json({ message: 'Login already exists' })
//          }
//          res.status(400).json({ message: 'Error creating admin' })
//          console.error(error)
//       }
//    }
//    catch (error) {
//       res.status(500).json({ message: 'Internal server error' })
//       console.error(error)
//    }
// })

router.get('/is/registered', verifyToken,  async (req, res) => {
   return res.status(200).json({
      message: "Authorization check successful"
   })
})


router.post('/login', async (req, res) => {
   try {
      const { login, password } = req.body

      const admin = await Admin.findOne({ login })
      if (!admin) {
         return res.status(400).json({
            message: {
               login: 'Incorrect login. Please try again'
            }
         })
      }
      const isMatch = await bcrypt.compare(password,
         admin.password)

      if (!isMatch) {
         return res.status(400).json({
            message: {
               password: 'Incorrect password. Please try again'
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