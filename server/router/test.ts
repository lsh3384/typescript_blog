const express = require("express");
const router = express.Router();

router.get("/", (req: any, res: any) => {
    console.log("/api/")
    res.send({ test : "hi"});
})

module.exports = router;