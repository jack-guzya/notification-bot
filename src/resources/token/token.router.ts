import express from 'express';
import { StatusCodes } from 'http-status-codes';
import tokenService from './token.service';

const router = express.Router();

router.use('/:id', async (req, res, next) => {
  const isValid = tokenService.check(req.params.id);

  if (!isValid) {
    res.sendStatus(StatusCodes.FORBIDDEN);
  }

  next();
});

export default router;
