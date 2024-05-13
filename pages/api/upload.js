import multiparty from 'multiparty';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '@/firebase';
// ------------------
//      LEGACY
// ------------------


const bucketName = 'dawid-next-ecommerce';

export default async function handle(req,res) {

  await mongooseConnect();
  await isAdminRequest(req,res);

  const form = new multiparty.Form();

  const links = ['https://firebasestorage.googleapis.com/v0/b/image-upload-b3a4d.appspot.com/o/images%2Funnamed.png?alt=media&token=541f5195-2dcf-48c7-ac4d-c966289cc2ad'];
 
 
  return res.json({links});

}

export const config = {
  api: {bodyParser: false},
};