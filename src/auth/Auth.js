import { useState } from "react";
import { Stack, Box, Center, Heading, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";


const AuthComponent = () => {
    const [isSignInMode, setSignInMode] = useState(true);

    return (
        <Stack bg="background.main" direction={["column", "row"]} spacing={6} minH="100vh">
            <Box></Box>
            <Box>
                { isSignInMode 
                ? <SignInComponent onChangeMode={setSignInMode}/>
                : <SignUpComponent onChangeMode={setSignInMode}/>
                }
            </Box>
        </Stack>
    )
}

const SignInComponent = (props) => {
    return (
        <Center minH="100%">
            <Box m={4}>
                <Heading as="h4">Sign In</Heading>
                <Text color="gray.200">Enter your details to access the vast libraries of entertainment.</Text>

                <Input 
                    focusBorderColor="primary.main"
                    mt={8} 
                    mb={4} 
                    placeholder="Email"/>
                <Input 
                    focusBorderColor="primary.main"
                    mb={12} 
                    placeholder="Password"/>

                <Button bg="primary.main" onClick={() => props.onChangeMode(false)}>Sign In</Button>
            </Box>
        </Center>
    )
}

const SignUpComponent = (props) => {
    return (
        <Center minH="100%">
            <Box m={4}>
                <Heading as="h4">Sign Up</Heading>
                <Text>Register now to access the vast libraries of entertainment.</Text>

                <Input mt={8} mb={4} placeholder="Email"/>
                <Input mb={4} placeholder="Password"/>
                <Input mb={12} placeholder="Confirm Password"/>

                <Button onClick={() => props.onChangeMode(true)}>Sign In</Button>
            </Box>
        </Center>
    )
}

export default AuthComponent;