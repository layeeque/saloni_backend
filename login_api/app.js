const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const router=express.Router();
const login= require('./login/controller/login');
const port = 3000;
const db=require('./db_connection/db');
var cors = require('cors')
const dashboard=require('./dashboard/controller/dashboard');
const upload=require('./uploads/controller/upload')
const personal_data=require('./personal_data/controller/personal_data')

app.use(bodyparser.urlencoded({ extended: false }))

app.use(bodyparser.json());

app.use(cors())

db();

app.use("/api", router);
router.use(express.static('upload'));
login(router);
dashboard(router);
upload(router);
personal_data(router);


app.get('*', (req, res) => {
    res.send("angularjs");
    
});

app.listen(port, () => {
    console.log("server started at port no: ::::" + port);
});