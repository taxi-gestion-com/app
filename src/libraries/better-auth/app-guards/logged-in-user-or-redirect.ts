import { loggedInUserOrRedirectTo } from '../guards/logged-in-user-or-redirect-to';

export const loggedInUserOrRedirect = loggedInUserOrRedirectTo('/login');
