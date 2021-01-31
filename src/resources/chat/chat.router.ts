import express from 'express';
import { StatusCodes } from 'http-status-codes';
import chatService from './chat.service';
import error from '../../utils/error';

const router = express.Router();

router
  .route('/:id')
  .post(
    error.wrapper(async (req, res) => {
      await chatService.sendMessage(
        req.params.id,
        `${req.headers['user-agent']}:\n ==== \nHi!`
      );

      res.sendStatus(StatusCodes.OK);
    })
  )
  .get(
    error.wrapper(async (req, res) => {
      await chatService.sendMessage(
        req.params.id,
        `${req.headers['user-agent']}:\n ==== \nIt woke me up!`
      );

      res.sendStatus(StatusCodes.OK);
    })
  );

router.route('/:id/send_document').post(
  error.wrapper(async (req, res) => {
    await chatService.sendDocument(
      req.params.id,
      req.body.filename || 'untitled.json',
      req.body.payload
    );

    res.sendStatus(StatusCodes.OK);
  })
);

router.route('/:id/send_message').post(
  error.wrapper(async (req, res) => {
    await chatService.sendMessage(
      req.params.id,
      req.body.message || 'Empty message'
    );

    res.sendStatus(StatusCodes.OK);
  })
);

export default router;
