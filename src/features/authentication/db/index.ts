import { authenticatorsTable } from './authenticators.table';
import { sessionsTable } from './sessions.table';
import { usersTable } from './users.table';
import { verificationTokensTable } from './verification-tokens.table';

export * from './authenticators.table';
export * from './sessions.table';
export * from './users.table';
export * from './verification-tokens.table';

export const authenticationSchema = {
  users: usersTable,
  sessions: sessionsTable,
  verificationTokens: verificationTokensTable,
  authenticators: authenticatorsTable
};
