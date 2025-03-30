import { FC } from 'react';

type Widget = {
  id: string;
  component: FC;
  order?: number;
};

const widgets: Widget[] = [];

export const registerWidget = (widget: Widget) => {
  widgets.push(widget);
};

export const getWidgets = () => widgets.sort((a, b) => (a.order || 0) - (b.order || 0));
