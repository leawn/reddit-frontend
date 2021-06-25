import React from 'react';
import { Box, Link, Flex, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../util/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    const [{data, fetching: meFetching}] = useMeQuery({
        pause: isServer(),
    });
    let body = null;

    // data is loading
    if (meFetching) {
    // user is not logged in
    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link color="white" mr={4}>login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link color="white">register</Link>
                </NextLink>
            </>
        )
    // user is loggen in
    } else {
        body = (
            <Flex>
            <Box mr={2} color="white">{data.me.username}</Box>
            <Button
                onClick={() => {
                    logout();
                }}
                isLoading={logoutFetching}
                color="white"
                variant="link"
            >
                logout
            </Button>
            </Flex>
        )
    }
    return (
        <Flex bg="black" p={4}>
            <Box ml={"auto"}>
                {body}
            </Box>
        </Flex>
    );
}