import express from 'express';

const app = express();
const test = require("./router/test");
app.use(express.json());
var cors = require('cors')
app.use(cors());
app.use("/api", test);

app.use(express.static('public'));

const port = 5000;
app.listen(port, () => console.log(`${port}`));