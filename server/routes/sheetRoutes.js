const express=require("express")
const {createDrive,addEmployeeRole}=require("../controller/sheetController.js")

const router=express.Router()
router.post('/api/employee',createDrive)
router.post('/addrole',addEmployeeRole)
module.exports=router

