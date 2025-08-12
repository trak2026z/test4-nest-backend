import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitUsersTable1723590000000 implements MigrationInterface {
  public async uq(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({`
        name: 'user',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar', length: '100', isNullable: false },
          { name: 'email', type: 'varchar', isUnique: true, isNullable: false },
          { name: 'createdAt', type: 'timestamp', default: 'now()' }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
