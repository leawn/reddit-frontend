import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../util/createUrqlClient';

const ForgotPassword: React.FC<{}> = ({}) => {
        const [complete, setComplete] = useState(false);
        const [, forgotPassword] = useForgotPassword();
        return (
            <Wrapper variant="regular">
                <Formik 
                    initialValues={{ email: "" }}
                    onSubmit={ async (values, { setSubmitting, setErrors }) => {
                        await forgotPassword(values);
                        setComplete(true);
                        setSubmitting(false);
                    }}>
                    {( props ) => (
                        complete ? (<Box>We sent you an email</Box>) :
                        (<Form>
                            <Box>
                                <InputField
                                    name="email"
                                    placeholder="email"
                                    label="email"
                                    type="email"
                                />
                            </Box>
                            <Button mt={4} type="submit" isLoading={props.isSubmitting} colorScheme="teal">forgot password</Button>
                        </Form>)
                    )}
                </Formik>
            </Wrapper>
        );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);