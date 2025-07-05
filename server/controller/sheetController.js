const {createGoogleSheetsAndDrive}=require("../utils/googleSheets.js")
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

module.exports={createDrive}