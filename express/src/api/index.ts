import express, { Router } from 'express';

export const router: Router = express.Router();

router.use('/user', require('./user'));

// why export const not working

module.exports = router;