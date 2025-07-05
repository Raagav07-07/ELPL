const {createGoogleSheetsAndDrive}=require("../utils/googleSheets.js")
const {google}=require("googleapis")
const path=require("path")
const roleSheetId="1dJUY-p4UcLwzlK201zt6QtMXkfLOoNM_GqGEzgVokbo"
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../service-account.json"),
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});
const createDrive=async (req,res)=>{
  const {name,email}=req.body;
  if(!name || !email){
    return res.status(401).json({"error":"Email or name is required"})
  }
  else{
    try{
        const folderId=await createGoogleSheetsAndDrive(name,email);
        res.status(201).json({
      message: 'Resources created successfully',
      folderId,
    });
    }
    catch(err){
        res.status(400).json({"error":`Unsuccessful attempt ${err}`})
    }
  }
}
const addEmployeeRole=async (req,res)=>{
  const {email,role}=req.body;
  const client=await auth.getClient()
  const sheets=await google.sheets({version:"v4",auth:client})
  try{
  await sheets.spreadsheets.values.append({
    auth:client,spreadsheetId:roleSheetId,range:"Sheet1!A:B",valueInputOption:"USER_ENTERED",
    resource:{
      values:[[email,role]]
    }
  });
  return res.status(200).json({"Success":"Role added"})
}
  catch(err){
    return res.status(400).json({"Error":err})
  }
}
module.exports={createDrive,addEmployeeRole}