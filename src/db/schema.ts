import { authenticatorsTable, sessionsTable, usersTable, verificationTokensTable } from '@/features/authentication/_db';

export const users = usersTable;
export const sessions = sessionsTable;
export const verificationTokens = verificationTokensTable;
export const authenticators = authenticatorsTable;
