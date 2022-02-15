const {Router}=require('express');
const controller=require('./controller');
const routes =Router();
const pool = require('../../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../../utils/jwtGenerator');
const authorization= require('../../middleware/authorization');

//jwt
routes.post('/register', async (req, res) => {
    try {

        //1. destructure the req.body (name,email,password)

        const { username, user_password } = req.body;

        //2 . check is user exist (if user exist then th row error)

        const user = await pool.query("SELECT * FROM users WHERE users_name = $1", [username],);
        if (user.rows.length !== 0) {
            return res.status(401).send("user already exists");
        }

        //3. Bcrypt the user password

        const saltRound = 10;

        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(user_password, salt)

        //4. enter the new inside our database

        const newUser = await pool.query("INSERT INTO users( users_name,users_password) VALUES($1,$2) RETURNING *", [username, bcryptPassword]);

        //5. generate our jwt token
        const token = jwtGenerator(newUser.rows[0]["user_id"])
        res.json({token});
    } catch (error) {
        res.status(500).send("Server error")
    }
})



routes.post('/login',async (req, res) => {
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
        console.error(error.message);
        res.status(500).send("Server error")
    }
})
routes.get('/is-verify', authorization,async(req, res) => {
   try {
       res.json(true);
   } catch (error) {
       console.error(err.message);
       res.status(500).send("Server error")
   }
})
routes.get('/',controller.getVehicle );
routes.get('/:id',controller.getVehicleById)
routes.post('/',controller.addVehicle)
routes.delete('/:id',controller.deleteVehicle)
routes.put('/:id',controller.updateVehicle)
routes.delete('/delete/all',controller.deleteALL)
module.exports=routes;