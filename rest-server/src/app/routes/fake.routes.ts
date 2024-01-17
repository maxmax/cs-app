import { Application } from 'express';
import { generateUsers } from '../controllers/fake.controller';

const router = require('express').Router();

// Get Fake Users
router.get('/', generateUsers);

export default (app: Application): void => {
  app.use('/api/fake/users', router);
};
