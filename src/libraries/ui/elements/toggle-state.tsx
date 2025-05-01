import { useState, type ReactNode } from 'react';

type ToggleStateProps = {
  children: (isActive: boolean, toggleActive: () => void) => ReactNode;
};

export const ToggleState = ({ children }: ToggleStateProps) => {
  const [isActive, setIsActive] = useState(false);

  return <>{children(isActive, () => setIsActive(!isActive))}</>;
};
