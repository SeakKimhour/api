const {Router}=require('express');
const controller=require('./controller');
const routes =Router();
const pool = require('../../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../../utils/jwtGenerator');
const validInfo= require('../../middleware/validInfo');
const authorization= require('../../middleware/authorization');

//jwt
routes.post('/login',validInfo,async (req, res) => {
    try {
       
       //1. destructure the req.body

       const {username, user_password}=req.body;

       //2. check if user doesn't exist (if not then we throw error)

       const user=await pool.query("SELECT * FROM users WHERE users_name=$1 ",[username])
       if (user.rows.length==0) {
           return res.status(401).json("Password or Username does not incorrect...!!!")
       }

       //3.check if incoming password is the same the database password

       const validPassword=await bcrypt.compare(user_password,user.rows[0].users_password);

       if(!validPassword) {
           return res.status(401).json("Password or username incorrect")
       }
       //4. give them the jwt token

       const token =jwtGenerator(user.rows[0].user_id)
       res.json({token});

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error")
    }
})
routes.get('/is-verify', authorization,async(req, res) => {
   try {
       res.json(true);
   } catch (error) {
       console.err(err.message);
       res.status(500).send("Server error")
   }
})
routes.get('/',controller.getVehicle );
routes.get('/:id',controller.getVehicleById)
routes.post('/',controller.addVehicle)
routes.delete('/:id',controller.deleteVehicle)
routes.put('/:id',controller.updateVehicle)
module.exports=routes;