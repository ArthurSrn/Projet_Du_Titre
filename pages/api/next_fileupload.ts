import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
const cloudinary = require("cloudinary").v2;
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";


export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  var namepath = "";
  // console.log(files.name)
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/imagesup");
    options.filename = (name, ext, path, form) => {
      //namepath = Date.now().toString() + "_" + path.originalFilename;
      namepath = ""+ path.originalFilename;
      return namepath;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
   
      
      if (err) reject(err);
      resolve({ fields, files });

    })
  });
};

const handler: NextApiHandler = async (req, res) => {
    console.log("test")
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/imagesup"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/imagesup"));
  }
  await readFile(req, true).then( async (value) =>{
    console.log("corp du texte:", value.fields.body[0],);
    console.log("nom du fichier:", value.files.size, )
    const { currentUser } = await serverAuth(req, res);
    const resultCloudinary = await cloudinary.uploader.upload("./public/imagesup/potager.webp" )  //ImageUrl.replace(/\\/g,"\\\\")))  
 .then( async (result: any) => {
    console.log(result.secure_url, "toto")
  const post = await prisma.post.create({
    data: {
      body:value.fields.body[0],
      ImageUrl:result.secure_url,
      userId: currentUser.id
      // userId: "64b723414f1c567ab18c191b"
    }
  
  });
 });
  });
  

  res.json({ done: "ok" });
};

export default handler;