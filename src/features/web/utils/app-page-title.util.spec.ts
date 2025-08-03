import { beforeEach, describe, expect, it } from 'vitest';
import { appPageTitle } from './app-page-title.util';

describe('app page title', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_APP_NAME = 'App';
  });

  it('renders app title only', () => {
    const title = appPageTitle();

    expect(title).toBe('App');
  });

  it('renders app title with page name', () => {
    const title = appPageTitle('Hello');

    expect(title).toBe('Hello | App');
  });

  it('renders app title with nested page name', () => {
    const title = appPageTitle('Hello', 'World');

    expect(title).toBe('Hello - World | App');
  });
});
