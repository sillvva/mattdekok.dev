const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const articleDir = "content/articles";
const storageDir = "blog/articles";

(async () => {
  const dirRemoved = await new Promise((resolve, reject) => {
    fs.rmdir(articleDir, { recursive: true }, err => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });

  if (!dirRemoved) return false;

  const dirCreated = await new Promise((resolve, reject) => {
    fs.mkdir(articleDir, { recursive: true }, (err, path) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(path);
      }
    });
  });

  if (!dirCreated) return false;

  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL)
    ),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });

  const files = await admin.storage().bucket().getFiles({ directory: storageDir });
  const mdFiles = files[0].filter(file => file.name.includes(".md"));
  for (let i = 0; i < mdFiles.length; i++) {
    const file = mdFiles[i];
    let fileContent = "";
    file
      .createReadStream()
      .on("data", chunk => {
        fileContent += chunk.toString();
      })
      .on("end", async () => {
        const filePath = file.name || "";
        const fileExtension = path.extname(filePath);
        const baseFileName = path.basename(filePath, fileExtension);
        fs.appendFileSync(
          `${articleDir}/${baseFileName}${fileExtension}`,
          fileContent
        );
      });
  }
})();
