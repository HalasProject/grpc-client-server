import { PROXY_URL } from '../config.js';

const { BookServiceClient } = require('../clients/book_grpc_web_pb.js');

export const bookClient = () => {
  const client = new BookServiceClient(PROXY_URL, null, null);
  return client;
};
