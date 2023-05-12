const express = require("express");
const dbConnection = require("../database");

const router = express.Router();
import { QueryError,RowDataPacket } from "mysql2"

export interface User extends RowDataPacket {
  idx: number
  id: string
  name: string
}

router.get("/", (req: any, res: any) => {
    dbConnection.query('SELECT * FROM `user`', (err: QueryError, results:User[]) => {console.log(results);});
    res.send({ test : "hi"});
})

module.exports = router;