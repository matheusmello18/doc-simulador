
 const express = require("express");
 const serve = express();
 const bodyParser = require("body-parser")
 const path = require("path")
 
 serve.use(bodyParser.urlencoded({extended: false}))
 serve.use(bodyParser.json())
 serve.use(express.static(path.join(__dirname, "")))
 
 serve.listen(8082, function(){
   console.log("Servidor Rodando. Url: http://localhost:8082");
 });