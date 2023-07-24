import { AppDataSource } from "../../../db/DataSource";
import { Copy } from "../../../db/entity/Copy";

const copyReposity = AppDataSource.getRepository(Copy);

export const getCopyByIdUtility = async (copyId: number) => {
  const result = await copyReposity.findOne({
    where: {
      id: copyId
    },
    relations: {
      book: true
    }
  });
  return result;
};