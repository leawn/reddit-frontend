import React from "react";
import { Formik, Form } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/react';
import { Wrapper } from "../components/Wrapper"
import { InputField } from '../components/InputField';

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
        return (
            <Wrapper variant="regular">
                <Formik 
                    initialValues={{ username: "", password: ""}}
                    onSubmit={values => {
                        console.log(values);
                    }}>
                    {( isSubmitting ) => (
                        <Form>
                            <Box>
                                <InputField
                                    name="username"
                                    placeholder="username"
                                    label="Username"
                                />
                            </Box>
                            <Box mt={4}>
                                <InputField
                                    name="password"
                                    placeholder="password"
                                    label="Password"
                                    type="passsword"
                                />
                            </Box>
                            <Button mt={4} type="submit" isLoadin={isSubmitting} colorScheme="teal">register</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}

export default Register;