const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './book.proto';

const {
  GetBook,
  ListBooks,
  AddBook,
  UpdateBook,
  DeleteBook,
} = require('./resolvers/bookService');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const bookProto = grpc.loadPackageDefinition(packageDefinition);
const ServiceDefinition = bookProto.book.BookService.service;

const server = new grpc.Server();

server.addService(ServiceDefinition, {
  GetBook,
  ListBooks,
  AddBook,
  UpdateBook,
  DeleteBook,
});

server.bindAsync(
  `0.0.0.0:${process.env.PORT || 8001}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) throw error;
    console.log(`Server running at http://127.0.0.1:${port}`);
    server.start();
  }
);
