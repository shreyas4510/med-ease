import * as React from 'react';
import { Field } from 'formik';
import Select from 'react-select';
import { SelectProps } from "./types/select";
import { debounce } from 'lodash';

const CustomSelect = React.forwardRef<HTMLSelectElement, SelectProps>(({
    onSearch = () => {},
    ...props
}, ref) => {   
    const debounceSearch = debounce((searchValue) => {
        if (searchValue.length < 3) return;
        onSearch(searchValue)
    }, 500);
 
    return (
        <Field
            name={props.name}
            component={({ field }: any) => (
                <Select
                    {...field}
                    classNamePrefix="custom-select"
                    className={`
                        text-sm font-normal font-sans
                        rounded-lg shadow-md shadow-slate-100
                        focus:shadow-outline-blue dark:focus:shadow-outline-blue
                        dark:outline-blue-600 focus:shadow-lg border border-solid
                        hover:border-blue-500 dark:hover:border-blue-500
                        focus:border-blue-500 dark:focus:border-blue-600
                        bg-white focus-visible:outline-0
                    `}
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            border: 'none'
                        }),
                    }}
                    ref={ref}
                    onInputChange={debounceSearch}
                    options={props.options}
                    onChange={(option: Record<string, string>) => props.setFieldValue(field.name, option.value)}
                    value={ props.options.find((option) => option.value === field.value )}
                />
            )}
        />
    )
})

export default CustomSelect;
