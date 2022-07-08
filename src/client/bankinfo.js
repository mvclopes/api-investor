const PROTO_PATH = './moneypad.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const MoneyPad = grpc.loadPackageDefinition(packageDefinition).MoneyPad;

const client = new MoneyPad('localhost:50051', grpc.credentials.createInsecure());

module.exports = client;