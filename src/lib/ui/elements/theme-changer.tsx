'use client';

import { useTheme } from 'next-themes';
import { RiComputerLine, RiMoonClearLine, RiSunLine } from 'react-icons/ri';
import { RadioGroup, RadioItem } from './radio';

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <RadioGroup>
      <RadioItem
        label='Thème système'
        value='system'
        selected={theme}
        icon={<RiComputerLine />}
        onClick={() => setTheme('system')}
      />
      <RadioItem label='Thème clair' value='light' selected={theme} icon={<RiSunLine />} onClick={() => setTheme('light')} />
      <RadioItem
        label='Thème sombre'
        value='dark'
        selected={theme}
        icon={<RiMoonClearLine />}
        onClick={() => setTheme('dark')}
      />
    </RadioGroup>
  );
};

export { ThemeChanger };
