const express=require("express")
const bodyParser = require('body-parser');
const app=express()
app.use(bodyParser.json())
const router=require("./routes/sheetRoutes.js")
app.use('/',router)
app.listen(8000,()=>{
    console.log("Port 8000 is in use");
});