const { google } = require("googleapis");
const path = require("path");
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../service-account.json"),
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});
const Parent_Path="1DSiexXZvEdsDoFAtzlu2z98zgFusjqh6"
async function createGoogleSheetsAndDrive(employee_name, employee_email) {
  const client = await auth.getClient();
  const drive = google.drive({ version: "v3", auth: client });
  const folder = await drive.files.create({
    requestBody: {
      name: `${employee_name}_Folder`,
      mimeType: "application/vnd.google-apps.folder",
      parents:[Parent_Path]
    },
    fields:'id'
  });
  const folderID=folder.data.id
  return folderID;
}
module.exports={createGoogleSheetsAndDrive}