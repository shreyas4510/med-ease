export interface DatePickerProps {
    name: string;
    label: string;
    minDate: string;
    setFieldValue: ( name: string, value: any ) => void
}
