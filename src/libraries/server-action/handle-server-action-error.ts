import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { ServerActionError } from './server-action-result';

type ProcessableError = Error & {
  statusCode: number;
  body: {
    code: string;
    message: string;
  };
};

export const isProcessableError = (error: unknown): error is ProcessableError =>
  error instanceof Error &&
  typeof (error as Partial<ProcessableError>).statusCode === 'number' &&
  typeof (error as Partial<ProcessableError>).body === 'object' &&
  typeof (error as Partial<ProcessableError>).body?.code === 'string' &&
  typeof (error as Partial<ProcessableError>).body?.message === 'string';

const statusCodeMessages: Record<number, string> = {
  400: 'L’opération n’est pas valide. Veuillez vérifier les informations envoyées.',
  401: 'Vous devez être authentifié pour effectuer cette opération.',
  403: 'Vous n’avez pas les droits nécessaires pour accéder à cette ressource.',
  404: 'La ressource demandée est introuvable.',
  409: 'Un conflit empêche l’exécution de cette opération.',
  410: 'La ressource demandée n’est plus disponible.',
  422: 'Les informations envoyées ne sont pas valides.',
  429: 'Trop de tentatives. Veuillez réessayer plus tard.',
  502: 'Le service est temporairement indisponible. Veuillez réessayer ultérieurement.',
  503: 'Le service est temporairement indisponible. Veuillez réessayer ultérieurement.',
  504: 'Le service est temporairement indisponible. Veuillez réessayer ultérieurement.'
};

export const handleServerActionError = (error: unknown, customErrors?: Record<string, string>): ServerActionError => {
  if (isRedirectError(error)) throw error;

  if (!isProcessableError(error)) return ServerActionError('Une erreur interne est survenue. Veuillez réessayer plus tard.');

  const customMessage = customErrors?.[error.body.code];

  if (customMessage != null) return ServerActionError(customMessage);

  return ServerActionError(
    statusCodeMessages[error.statusCode ?? 0] ?? 'Une erreur interne est survenue. Veuillez réessayer plus tard.'
  );
};
