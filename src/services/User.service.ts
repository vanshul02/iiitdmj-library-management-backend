import { User } from '../db/entity/User';
import { AppDataSource } from '../db/DataSource';
import { signJwt } from '../utils/jwt';
import { UserInputAttributes } from '../interfaces/User';
import redisClient from '../utils/ConnectRedis';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: UserInputAttributes) => {
  return (await AppDataSource.manager.save(
    AppDataSource.manager.create(User, input)
  )) as User;
};

export const findUserByEmail = async ({ email }: { email: string }) => {
  return await userRepository.findOneBy({ email });
};

export const findUserById = async (userId: number) => {
  return await userRepository.findOneBy({ id: userId });
};

export const findUser = async (query: Object) => {
  return await userRepository.findOneBy(query);
};

// ? Sign access and Refresh Tokens
export const signTokens = async (user: User) => {
  // 1. Create Session
  redisClient.set(user.id.toString(), JSON.stringify(user), {
    EX: (process.env.REDIS_CACHE_EXPIRY as any) * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${(process.env.ACCESS_TOKEN_EXPIRY as any)}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${(process.env.REFRESH_TOKEN_EXPIRY as any)}m`,
  });

  return { access_token, refresh_token };
};

