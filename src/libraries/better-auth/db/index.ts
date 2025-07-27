import { accountsTable } from './accounts.table';
import { sessionsTable } from './sessions.table';
import { usersTable } from './users.table';
import { verificationsTable } from './verifications.table';

export * from './accounts.table';
export * from './sessions.table';
export * from './users.table';
export * from './verifications.table';

export const authenticationSchema = {
  user: usersTable,
  session: sessionsTable,
  account: accountsTable,
  verification: verificationsTable
};
