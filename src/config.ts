import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://root:password@localhost:27017/';
const DB_NAME = process.env.DB_NAME || 'handlingsDB';
const ORIGIN_ALLOW = process.env.ORIGIN_ALLOW || '*';

export {
  PORT,
  DB_ADDRESS,
  DB_NAME,
  ORIGIN_ALLOW,
};
