
import express from 'express';
import upload from '../multerConfig.js';
import authentication from '../../app/middlewares/user-authentication.js';
import mediaController from '../../app/controllers/media-upload-controller.js';

const imageUploadRoute = express.Router();

//api for image upload
imageUploadRoute.post('/upload', authentication,upload.single('file'),mediaController.uploadImage);

export default imageUploadRoute;