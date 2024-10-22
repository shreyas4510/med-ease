import * as React from 'react';
import { InputProps } from '@mui/base/Input';
import clsx from 'clsx';
import { Field } from 'formik';

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <Field
      ref={ref}
      className={clsx(`
          w-full text-sm font-normal font-sans leading-5
          px-3 py-3 rounded-lg shadow-md shadow-slate-100
          focus:shadow-outline-blue dark:focus:shadow-outline-blue
          dark:outline-blue-600 focus:shadow-lg border border-solid
          hover:border-blue-500 dark:hover:border-blue-500
          focus:border-blue-500 dark:focus:border-blue-600
          bg-white focus-visible:outline-0
      `)}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    />
  )
})

export default Input;
