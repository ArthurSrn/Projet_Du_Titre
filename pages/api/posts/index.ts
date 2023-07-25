import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

import checkBody from "../module/checkBody";

const cloudinary = require("cloudinary").v2;

const path = require("path");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    
    // if (req.method === 'POST') {
    //   const { currentUser } = await serverAuth(req, res);
    //   const { body } = req.body;

    //   const post = await prisma.post.create({
    //     data: {
    //       body,
    //       userId: currentUser.id
    //     }
    //   });

    //   return res.status(200).json(post);
    // }

    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { body, ImageUrl} = req.body;

      if (!checkBody(req.body, ['body', 'ImageUrl'])) {    
                return res.status(400).send({ result: false, error: 'Missing or empty fields' })
              }
              console.log("toto")
              let resultulr = ""
              const uploadImg = ImageUrl
              let uploading = uploadImg.replace(/\\/g,"\\\\")
              console.log(uploading)
              const resultCloudinary = await cloudinary.uploader.upload("C:\\Users\\arthsrnn\\Documents\\capotage\\public\\images\\aubergine.webp")//ImageUrl.replace(/\\/g,"\\\\"))
          
              .then((result: any) => {
               console.log(result.secure_url, "toto")
                resultulr = result.secure_url;
        
              })
     
      const post = await prisma.post.create({
        data: {
          body,
          ImageUrl:resultulr,
          userId: currentUser.id
        }
      });

      return res.status(200).json(post);
    }

    

    if (req.method === 'GET') {
      const { userId } = req.query;

      console.log({ userId })

      let posts;

      if (userId && typeof userId === 'string') {
        posts = await prisma.post.findMany({
          where: {
            userId
          },
          include: {
            user: true,
            comments: true
          },
          orderBy: {
            createdAt: 'desc'
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
      }

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}



// import { NextApiRequest, NextApiResponse } from "next";



// import serverAuth from "@/libs/serverAuth";
// import prisma from "@/libs/prismadb";

// import checkBody from "../module/checkBody";

// const cloudinary = require("cloudinary").v2;


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST' && req.method !== 'GET') {
//     return res.status(405).end();
//   }

//   try {
    
//     if (req.method === 'POST') {

//       if (!checkBody(req.body, ['path','userId', 'comment'])) {    
//         return res.status(400).send({ result: false, error: 'Missing or empty fields' })
//       }
//       // const { currentUser } = await serverAuth(req, res);
//       const { path, userId, comment } = req.body;
//       // const ImageUrl = req.body.path;
//        let resultulr = ""
//       const resultCloudinary = await cloudinary.uploader.upload(path)
//       .then((result: any) => {
       
//         resultulr = result.secure_url;

//       })
      
//       const post = await prisma.post.create({
//         data: {
//           bio:comment,
//           ImageUrl:resultulr,
//           userId:userId,
//           // userId: currentUser.id,
//         }
//       });
      

      
//       // console.log("Image URL ", ImageUrl);
     
      


//       return res.status(200).json({post});
//     }

//     if (req.method === 'GET') {
//       const { userId } = req.query;

//       console.log({ userId })

//       let posts;

//       if (userId && typeof userId === 'string') {
//         console.log("if ")
//         posts = await prisma.post.findMany({
//           where: {
//             userId
//           },
//           // include: {
//           //   user: true,
//           //   comments: true
//           // },
//           orderBy: {
//             createdAt: 'desc'
//           },
//         }).then( result => {
//           return res.status(200).json({data:result});
//         }
          
//         )
        
//       } else {
//         posts = await prisma.post.findMany({
//           include: {
//             user: true,
//             comments: true
//           },
//           orderBy: {
//             createdAt: 'desc'
//           }
//         });
//       }

      
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).end();
//   }
// }