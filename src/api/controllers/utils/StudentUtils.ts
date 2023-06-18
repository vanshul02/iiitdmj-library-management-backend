import { Student } from "../../../db/entity/Student";
import { AppDataSource } from "../../../db/DataSource";

const studentRepository = AppDataSource.getRepository(Student);

export const getStudentByIdUtility = async (studentId: number) => {
  return await studentRepository.findOne({
    where: {
      id: studentId
    }
  });
};