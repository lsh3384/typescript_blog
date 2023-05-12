const express = require("express");
const dbConnection = require("../database");

const router = express.Router();
import { RowDataPacket } from "mysql2"

export interface User extends RowDataPacket {
  idx: number
  id: string
  name: string
}


router.get("/", (req: any, res: any) => {
    dbConnection.query<User[]>(
        'SELECT * FROM `user` WHERE `name` = ?',
        ['lee'],
        function(err, results, fields) {
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
      
          // If you execute same statement again, it will be picked from a LRU cache
          // which will save query preparation time and give better performance
        }
      );
    
    res.send({ test : "hi"});
})

module.exports = router;