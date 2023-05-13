import { cleanEnv, num, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    DBHOST: str(),
    DBPORT: port(),
    DBUSER: str(),
    DBPASS: str(),
    DBNAME: str(),
    CORS_ORIGIN: str(),
    ACCESS_TOKEN_EXPIRY: num(),
    REFRESH_TOKEN_EXPIRY: num(),
    REDIS_CACHE_EXPIRY: num(),
    JWT_ACCESS_TOKEN_PRIVATE_KEY: str(),
    JWT_ACCESS_TOKEN_PUBLIC_KEY: str(),
    JWT_REFRESH_TOKEN_PRIVATE_KEY: str(),
    JWT_REFRESH_TOKEN_PUBLIC_KEY: str(),
  });
};

export default validateEnv;