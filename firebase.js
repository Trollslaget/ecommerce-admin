import { getApp, getApps, initializeApp } from "firebase/app";

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDZ8XaqodYeLHHtdSpytLqKi-PcIHmedFw",
	authDomain: "image-upload-b3a4d.firebaseapp.com",
	projectId: "image-upload-b3a4d",
	storageBucket: "image-upload-b3a4d.appspot.com",
	messagingSenderId: "666811775204",
	appId: "1:666811775204:web:f7ee51720c9a4baed214f1",
};
const app = initializeApp(firebaseConfig)
const storage = getStorage();
export {storage}
