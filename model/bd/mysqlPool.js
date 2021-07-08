//npm modules
const mysql = require('mysql2/promise')
//pool creation
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
    queueLimit: parseInt(process.env.DB_QUEUELIMIT),
    connectionLimit: parseInt(process.env.DB_CONNECTIONLIMIT)
})
// pool.query()
// .then(([data,meta])=>{
//     console.log(data)
// })
// .catch(err => {
//     console.log(err)
// })
pool.on('release',(e)=>{
    console.log('Released')
})
module.exports = pool