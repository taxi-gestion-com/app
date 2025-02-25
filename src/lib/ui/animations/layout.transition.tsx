'use client';

import { ComponentProps, ReactNode, useContext, useEffect, useRef } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { AnimatePresence, motion, MotionStyle } from 'framer-motion';

const usePreviousValue = <T,>(value: T): T | undefined => {
  const prevValue = useRef<T | undefined>(undefined);

  useEffect(() => {
    prevValue.current = value;
    return () => {
      prevValue.current = undefined;
    };
  });

  return prevValue.current;
};

const FrozenRouter = (props: { children: ReactNode }): ReactNode => {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;

  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);

  const changed = segment != prevSegment && segment != undefined && prevSegment != undefined;

  return <LayoutRouterContext.Provider value={changed ? prevContext : context}>{props.children}</LayoutRouterContext.Provider>;
};

type LayoutTransitionProps = {
  children: ReactNode;
  initial: NonNullable<ComponentProps<typeof motion.div>['initial']>;
  animate: NonNullable<ComponentProps<typeof motion.div>['animate']>;
  exit: NonNullable<ComponentProps<typeof motion.div>['exit']>;
  transition?: NonNullable<ComponentProps<typeof motion.div>['transition']>;
  className?: ComponentProps<typeof motion.div>['className'];
  style?: MotionStyle;
};

export const LayoutTransition = ({
  children,
  initial,
  animate,
  exit,
  transition = {},
  className,
  style = {}
}: LayoutTransitionProps): ReactNode => {
  const segment: string | null = useSelectedLayoutSegment();

  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        className={className}
        style={style}
        key={segment}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}>
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
};
