import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from "../components/Wrapper"
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import { useRouter } from "next/router";
import { createUrqlClient } from '../util/createUrqlClient';
import { withUrqlClient } from "next-urql";

interface loginProps {}

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
            <Wrapper variant="regular">
                <Formik 
                    initialValues={{ username: "", password: ""}}
                    onSubmit={ async (values, { setSubmitting, setErrors }) => {
                        const response = await login(values);
                        if (response.data?.login.errors) {
                            setErrors(toErrorMap(response.data.login.errors));
                        } else if (response.data?.login.user) {
                            // worked
                            router.push("/");
                        }
                        setSubmitting(false);
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
                                    type="password"
                                />
                            </Box>
                            <Button mt={4} type="submit" isLoading={props.isSubmitting} colorScheme="teal">login</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}

export default withUrqlClient(createUrqlClient)(Login);