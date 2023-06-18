import { AppDataSource } from "../../../db/DataSource";
import { User } from "../../../db/entity/User";

const userRepository = AppDataSource.getRepository(User);
export const getUserById = async (userId: number) => {
  const user = await userRepository.findOne({
    where: {
      id: userId
    },
    relations: {
      student: true,
      staff: true
    }
  });
  return user;
};