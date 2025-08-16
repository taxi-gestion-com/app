import { describe, expect, it } from 'vitest';
import { appPageTitle } from './app-page-title.util';

describe('app page title', () => {
  it('renders app title only', () => {
    const title = appPageTitle('App')();

    expect(title).toBe('App');
  });

  it('renders app title with page name', () => {
    const title = appPageTitle('App')('Hello');

    expect(title).toBe('Hello | App');
  });

  it('renders app title with nested page name', () => {
    const title = appPageTitle('App')('Hello', 'World');

    expect(title).toBe('Hello - World | App');
  });
});
