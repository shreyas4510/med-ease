import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePickerProps } from './types/datePicker';

const CustomDatePicker = React.forwardRef<HTMLSelectElement, DatePickerProps>((props, ref) => {
    return (
        <Field name={props.name}>
            {({ field }: FieldProps) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={props.label}
                        format="DD-MM-YYYY"
                        value={field.value ? dayjs(field.value) : null}
                        minDate={dayjs(props.minDate)}
                        onChange={(date) => props.setFieldValue(props.name, dayjs(date).toISOString())}
                    />
                </LocalizationProvider>
            )}
        </Field>
    );
});

export default CustomDatePicker;
