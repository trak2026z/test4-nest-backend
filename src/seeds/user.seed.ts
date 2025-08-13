import { DataSource } from 'typeorm';
import dataSource from '../../config/ormconfig';

async function seed() {
  const ds: DataSource = await dataSource.initialize();

  const usersCount = await ds.query(`SELECT COUNT(*) FROM "users"`);
  if (parseInt(usersCount[0].count, 10) > 0) {
    console.log('Users already exist, skipping seed.');
    await ds.destroy();
    return;
  }

  await ds.query(
    `INSERT INTO "users" (name, email) VALUES
      'Alice Example', 'alice@example.com',
      'Bob Sample', 'bob@example.com'
    `,
  );

  console.log('Seed completed: inserted 2 users.');
  await ds.destroy();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
