
import express from 'express';
import authentication from '../../app/middlewares/user-authentication.js';
import upload from '../multerConfig.js';
import mediaController from '../../app/controllers/media-upload-controller.js';

const imageUploadRoute = express.Router();
//api for image upload 1
imageUploadRoute.post('/upload', authentication,upload.single('file'),mediaController.uploadImage);

export default imageUploadRoute;