import { News } from "@/models/News";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  await isAdminRequest(req,res);
  console.log(req.body, 'прилетело в апи');
  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await News.findOne({_id:req.query.id}));
    } else {
      res.json(await News.find());
    }
  }

  if (method === 'POST') {
    const {title,description,images} = req.body;
    const newsDoc = await News.create({
      title,description,images
    })
    res.json(newsDoc);
  }

  if (method === 'PUT') {
    const {title,description,images,_id} = req.body;
    console.log(title,description,images,_id, 'попало в пут');
    await News.updateOne({_id}, {title,description,images});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await News.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}