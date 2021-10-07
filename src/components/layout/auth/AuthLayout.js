import React from "react";
import {
    Button,
    Flex,
    Input,
    Heading,
    Stack,
} from "@chakra-ui/react";
import Page from "../../sections/Page";

const AuthLayout = () => {
    const [isSignIn, setSignIn] = React.useState(true);

    return (
        <Page>
            <Flex
                align="center"
                justify="center"
                direction={{base: "column-reverse", md: "row"}}
                wrap="no-wrap"
                minW={{base: "100vw", md: "40vw"}}
                minH="70vh"
                px={8}
                mb={16}
            >
                <Stack
                    border="1px"
                    borderColor="surface.400"
                    borderRadius="md"
                    bg="surface.700"
                    spacing={4}
                    w={{base: "80%", md: "60%"}}
                    p={12}
                    align="center"
                >
                    <Heading
                        as="h1"
                        size="lg"
                        fontWeight="bold"
                        color="primary.300"
                        textAlign="center"
                    >
                    { isSignIn ? "Sign In" : "Sign Up" }
                    </Heading>
                    <Heading
                        as="h2"
                        size="sm"
                        color="text.secondary"
                        opacity="0.8"
                        fontWeight="normal"
                        lineHeight={1.5}
                        textAlign="center">
                        Enter your credentials to continue
                    </Heading>

                    {   isSignIn 
                        ? <SignInFormLayout/>
                        : <SignUpFormLayout/>
                    }
                    
                    <Button
                        borderRadius="8px"
                        py="4"
                        px="4"
                        lineHeight="1"
                        >
                        {isSignIn ? "Sign-in" : "Sign-up"}
                    </Button>
                </Stack>
            </Flex>
        </Page>
    )
}

const SignInFormLayout = () => {
    return (
        <>
            <Input placeholder="Email"/>
            <Input placeholder="Password"/>
        </>
    )
}

const SignUpFormLayout = () => {
    return (
        <>
            <Input/>
            <Input/>
            <Input/>
        </>
    )
}

export default AuthLayout;