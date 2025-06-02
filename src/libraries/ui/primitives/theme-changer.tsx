'use client';

import type { ReactNode } from 'react';
import { RiComputerLine, RiMoonClearLine, RiSunLine } from 'react-icons/ri';
import { useTheme } from 'next-themes';

const Theme = ({
  label,
  value,
  selected,
  icon,
  onClick
}: {
  label: string;
  value: string;
  selected: string | undefined;
  icon: ReactNode;
  onClick: () => void;
}) => (
  <span
    suppressHydrationWarning
    className='data-checked:text-base-content data-checked:bg-base-100 data-checked:ring-base-content/20 rounded-full p-1.5 data-checked:ring sm:p-1'
    aria-label={label}
    role='radio'
    aria-checked={selected === value}
    data-checked={selected === value ? true : null}
    onClick={onClick}>
    {icon}
  </span>
);

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='bg-base-300 inline-grid grid-cols-3 gap-0.5 rounded-full p-0.75' role='radiogroup'>
      <Theme
        label='Thème système'
        value='system'
        selected={theme}
        icon={<RiComputerLine />}
        onClick={() => setTheme('system')}
      />
      <Theme label='Thème clair' value='light' selected={theme} icon={<RiSunLine />} onClick={() => setTheme('light')} />
      <Theme label='Thème sombre' value='dark' selected={theme} icon={<RiMoonClearLine />} onClick={() => setTheme('dark')} />
    </div>
  );
};

export { ThemeChanger };
