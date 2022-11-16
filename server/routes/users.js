import express from 'express';

import { getUserInfo } from '../controllers/users.js';

const router = express.Router();

router.get('/:userId', getUserInfo);

export default router;
