import mysql from 'mysql2/promise.js'

const conexao = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'senai' 
})
export default conexao 