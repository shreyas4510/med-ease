import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { formDataType, TProps } from "./types/authView";
import Input from "./input";
import Button from "./button";
import { ErrorMessage, Form, Formik } from "formik";
import CustomSelect from "./select";

const AuthView = ({
    title,
    top,
    formData,
    handleReset,
    validationSchema,
    initialValues,
    handleSubmit
}: TProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('register-hospital-card');
            const rect = element?.getBoundingClientRect();
            if (rect && rect.top < window.innerHeight && rect.bottom >= 0) {
                setIsVisible(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const InputView = (
        obj: formDataType,
        setFieldValue: ( name: string, option: string ) => void
    ) => {
        switch (obj.type) {
            case 'select':
                return (
                    <CustomSelect
                        name={obj.name}
                        options={obj.options as []}
                        setFieldValue={setFieldValue}
                        onSearch={obj.onSearch}
                    />
                )
            default:
                return <Input name={obj.name} type={obj.type} placeholder={obj.label} />
        }
    }

    return (
        <div className="relative h-full">
            <div className="bg-custom-gradient h-custom-25 absolute right-0 left-0 top-0">
                <div
                    className="cursor-pointer px-16 my-5 text-start font-poppins text-3xl text-white"
                    onClick={handleReset}
                >MedEase</div>
                <p className="font-poppins my-4 font-bold text-4xl text-white">{title}</p>
            </div>
            <Card
                id='register-hospital-card'
                className={
                    `absolute left-0 right-0 ${top} mt-32 mx-auto !shadow-custom ` +
                    `transition-opacity duration-1000 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`
                }
                sx={{ maxWidth: '40rem' }}
            >
                <CardContent>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, isSubmitting, dirty, isValid }) => (
                            <Form className="grid grid-cols-2 gap-4" >
                                {
                                    formData.map((item, index) => (
                                        <div className={item.className} key={`auth-form-${item.label}-${index}`}>
                                            <label className="text-start text-blue-500 font-medium">{item.label}</label>
                                            {InputView(item, setFieldValue)}
                                            <ErrorMessage name={item.name} component="div" className="text-start text-red-500 text-xs" />
                                        </div>
                                    ))
                                }
                                <Button
                                    disabled={ isSubmitting || !isValid || !dirty }
                                    type="submit"
                                    className="mx-auto col-span-2 text-white bg-blue-500"
                                >Submit</Button>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}

export default AuthView;