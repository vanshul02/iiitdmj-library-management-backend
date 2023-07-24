import { SignOptions } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

// ? Sign Access or Refresh Token
export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions
) => {
  const privateKey = Buffer.from(
    (keyName === 'accessTokenPrivateKey') ? process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY as any : process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY as any,
    'base64'
  ).toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

// ? Verify Access or Refresh Token
export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    const publicKey = Buffer.from(
      (keyName === 'accessTokenPublicKey') ? process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY as any : process.env.JWT_REFRESH_TOKEN_PUBLIC_KEY as any,
      'base64'
    ).toString('ascii');
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};