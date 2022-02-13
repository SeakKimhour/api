module.exports=(req,res,next)=>{
    const {username,user_password} = req.body;

   if (req.path==="/register"){
       if(![username,user_password].every(Boolean)){
           return res.status(401).json("Missing Credentials");
       }

   }   else if (req.path==="/login"){
       if(![username,user_password].every(Boolean)){
           return res.status(401).json("Missing Credentials");
       }

   }
   next();
}