import React from "react";
import { useTranslation } from "react-i18next"; 
import {
    Button,
    Flex,
    Input,
    Heading,
    Stack,
} from "@chakra-ui/react";
import Page from "../../sections/Page";

const AuthLayout = () => {
    const { t } = useTranslation();
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
                        textAlign="center" >
                        { t(isSignIn ? "auth.sign-in" : "auth.sign-up") }
                    </Heading>
                    <Heading
                        as="h2"
                        size="sm"
                        color="text.secondary"
                        opacity="0.8"
                        fontWeight="normal"
                        textAlign="center">
                        { t(isSignIn ? "auth.sign-in-summary" : "auth.sign-up-summary")}
                    </Heading>

                    {   isSignIn 
                        ? <SignInFormLayout/>
                        : <SignUpFormLayout/>
                    }
                    
                    <Button mb="4" borderRadius="md">
                        {t(isSignIn ? "auth.sign-in" : "auth.sign-up")}
                    </Button>
                    <Button 
                        variant="ghost" 
                        borderRadius="md"
                        onClick={() => setSignIn(!isSignIn)} >
                        {t(isSignIn ? "auth.sign-in-secondary-action" : "auth.sign-up-secondary-action")}
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