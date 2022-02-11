const Pool=require('pg').Pool

const pool=new Pool({
    user:"postgres",
    host:"database-1.c9qwjlfgnuw4.ap-southeast-1.rds.amazonaws.com",
    database:"Vehicle",
    password:"seak1812002",
    post:5432
})

module.exports = pool;