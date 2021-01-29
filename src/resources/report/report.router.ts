import express from 'express';
import bot from '../../bot';

const router = express.Router();

router.route('/:id').post((req, res, next) => {
  bot.telegram.sendMessage(`-${req.params.id}`, req.body.message);
  next();
});

export default router;
