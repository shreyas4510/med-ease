import * as React from 'react';
import { Input as BaseInput, InputProps } from '@mui/base/Input';
import clsx from 'clsx';

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <BaseInput
      ref={ref}
      {...props}
      className={clsx(props.className)}
      slotProps={{
        ...props.slotProps,
        input: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.input,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `
                w-full text-sm font-normal font-sans leading-5
                px-3 py-3 rounded-lg shadow-md shadow-slate-100
                focus:shadow-outline-blue dark:focus:shadow-outline-blue
                dark:outline-blue-600 focus:shadow-lg border border-solid
                hover:border-blue-500 dark:hover:border-blue-500
                focus:border-blue-500 dark:focus:border-blue-600
                bg-white focus-visible:outline-0
              `,
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

export default Input;