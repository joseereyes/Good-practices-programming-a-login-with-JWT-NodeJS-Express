const express = require("express");
const app = express();
const router = require("./router/router");
const conf = require("./config/default");



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", router);



app.listen(conf.server.port, () => { console.log("App running on port: " + conf.server.port), conf.db() });