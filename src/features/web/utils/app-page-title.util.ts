export const appPageTitle =
  (appName: string = process.env.NEXT_PUBLIC_APP_NAME) =>
  (...pageTitle: string[]): string =>
    pageTitle.length === 0 ? appName : [pageTitle.join(' - '), appName].join(' | ');
