
import express from 'express';
const router = express.Router();

import controller from '../controllers/auth';

import { signUpValidator } from '../middleware';

router.post(
  '/signup',
  [
    signUpValidator.isADuplicatedUsername,
    signUpValidator.isADuplicatedEmail,
    signUpValidator.checkRolesExisted
  ],
  controller.signup
);

router.post('/signin', controller.signin);


module.exports = (app) => app.use('/api/auth', router);