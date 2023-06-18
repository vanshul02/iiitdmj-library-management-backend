import { AppDataSource } from "../../../db/DataSource";
import { Book } from "../../../db/entity/Book";

const bookRepository = AppDataSource.getRepository(Book);

export const getBookByIdUtility = async (bookId: number) => {
  const result = await bookRepository.findOneBy({
    id: bookId
  });
  return result;
};