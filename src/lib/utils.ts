import { genSalt, hash } from 'bcryptjs';

export async function getHashedValue(value: string) {
  const salt = await genSalt();
  return await hash(value, salt);
}
