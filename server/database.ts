require("dotenv").config();

const mysql = require('mysql2');
import { QueryError,RowDataPacket } from "mysql2"

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'blog'
});

module.exports = connection;