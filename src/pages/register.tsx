import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from "../components/Wrapper"
import { InputField } from '../components/InputField';
import { useMutation } from "urql";

interface registerProps {

}

const REGISTER_MUT = `
mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password: $password }) {
        errors {
            field
            message
        }
        user {
            id
            username
        }
    }
}
`

const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useMutation(REGISTER_MUT);
    return (
            <Wrapper variant="regular">
                <Formik 
                    initialValues={{ username: "", password: ""}}
                    onSubmit={ async (values, actions) => {
                        console.log(values);
                        await register(values);
                        actions.setSubmitting(false);
                    }}>
                    {( props ) => (
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
                            <Button mt={4} type="submit" isLoading={props.isSubmitting} colorScheme="teal">register</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}

export default Register;