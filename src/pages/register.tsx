import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from "../components/Wrapper"
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import { useRouter } from "next/router";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../util/createUrqlClient';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [, register] = useRegisterMutation();
    return (
            <Wrapper variant="regular">
                <Formik 
                    initialValues={{ email: "", username: "", password: ""}}
                    onSubmit={ async (values, { setSubmitting, setErrors }) => {
                        const response = await register({ options: values });
                        if (response.data?.register.errors) {
                            setErrors(toErrorMap(response.data.register.errors));
                        } else if (response.data?.register.user) {
                            // worked
                            router.push("/");
                        }
                        setSubmitting(false);
                    }}>
                    {( props ) => (
                        <Form>
                            <Box mt={4}>
                                <InputField
                                    name="email"
                                    placeholder="email"
                                    label="Email"
                                />
                            </Box>
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
                                    type="password"
                                />
                            </Box>
                            <Button mt={4} type="submit" isLoading={props.isSubmitting} colorScheme="teal">register</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}

export default withUrqlClient(createUrqlClient)(Register);