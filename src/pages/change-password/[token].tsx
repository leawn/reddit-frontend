import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useState } from 'react'
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { toErrorMap } from '../../util/toErrorMap';
import { useRouter } from 'next/router';
import { createUrqlClient } from '../../util/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import NextLink from "next/link";

const ChangePassword = ({ token }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
        const router = useRouter();
        const [, changePassword] = useChangePasswordMutation();
        const [tokenError, setTokenError] = useState("");
        return (
            <Wrapper variant="regular">
                <Formik 
                    initialValues={{ newPassword: "" }}
                    onSubmit={ async (values, { setSubmitting, setErrors }) => {
                        const response = await changePassword({
                            newPassword: values.newPassword,
                            token
                        });
                        if (response.data?.changePassword.errors) {
                            const errorMap = toErrorMap(response.data.changePassword.errors);
                            if ("token" in errorMap) {
                                setTokenError(errorMap.token);
                            }
                            setErrors(errorMap);
                        } else if (response.data?.changePassword.user) {
                            router.push("/");
                            // worked
                        }
                        setSubmitting(false);
                    }}>
                    {( props ) => (
                        <Form>
                            <Box>
                                <InputField
                                    name="newPassword"
                                    placeholder="new password"
                                    label="New Password"
                                    type="password"
                                />
                            </Box>
                            {tokenError ? (
                                <Flex>
                                    <Box style={{ color: "red" }}>{tokenError}</Box>
                                    <NextLink href="/forgot-password">
                                        <Link>go forget it again</Link>
                                    </NextLink>
                                </Flex>
                            ) : null}
                            <Button mt={4} type="submit" isLoading={props.isSubmitting} colorScheme="teal">change password</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}

export const getServerSideProps: GetServerSideProps = async ( {query} ) => {
    return {
        props: {
            token: query.token as string
        }
    }
}

export default withUrqlClient(createUrqlClient)(ChangePassword);