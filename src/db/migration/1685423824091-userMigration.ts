import { MigrationInterface, QueryRunner } from "typeorm"
import { User } from "../entity/User"
import { Role } from "../../interfaces/User";

export class UserMigration1685423824091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const connection = await queryRunner.connection;
        const userRepository = connection.getRepository(User);
        const userStudent = new User();
        userStudent.password = '12345678';
        userStudent.email = 'student@email.com'
        userStudent.role = Role.STUDENT;
        userStudent.firstName = 'Dummy';
        userStudent.lastName = 'Student';
        const userStaff = new User();
        userStaff.password = '12345678';
        userStaff.email = 'staff@email.com';
        userStaff.role = Role.STAFF;
        userStaff.firstName = 'Dummy';
        userStaff.lastName = 'Staff';
        await userRepository.save([userStudent, userStaff]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM public.user WHERE email LIKE '%@email.com'`);
    }

}
