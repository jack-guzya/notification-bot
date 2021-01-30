import express from 'express';
import { StatusCodes } from 'http-status-codes';
import chatService from './chat.service';

const router = express.Router();

router.route('/:id').post(async (req, res) => {
  chatService.sendMessage(req.params.id, `${req.ip} says "Hi!"'`);

  res.sendStatus(StatusCodes.OK);
});

router.route('/:id').get(async (req, res) => {
  chatService.sendMessage(req.params.id, `${req.ip} woke me up!'`);

  res.sendStatus(StatusCodes.OK);
});

router.route('/:id/send_document').post(async (req, res) => {
  chatService.sendDocument(
    req.params.id,
    req.body.filename || 'untitled.json',
    req.body.payload
  );

  res.sendStatus(StatusCodes.OK);
});

router.route('/:id/send_message').post(async (req, res) => {
  chatService.sendMessage(req.params.id, req.body.message || 'Empty message');

  res.sendStatus(StatusCodes.OK);
});

export default router;
