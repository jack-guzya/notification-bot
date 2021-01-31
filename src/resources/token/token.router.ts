import express from 'express';
import tokenService from './token.service';
import error from '../../utils/error';

const router = express.Router();

router.use(
  '/:id',
  error.wrapper(async (req, res, next) => {
    tokenService.check(req.params.id);

    next();
  })
);

export default router;
