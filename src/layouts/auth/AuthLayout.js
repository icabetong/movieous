import { useState } from "react";
import { useTranslation } from "react-i18next"; 
import {
    Button,
    Flex,
    Heading,
    Stack,
} from "@chakra-ui/react";
import Page from "../../components/Page";
import SignInFormLayout from "./SignInFormLayout";
import SignUpFormLayout from "./SignUpFormLayout";

const AuthLayout = () => {
    const [isSignIn, setSignIn] = useState(true);
    const [hasCreatedAccount, setCreatedAccount] = useState(false);
    
    return (
        <Page>
            <Flex
                align="center"
                justify="center"
                direction={{base: "column-reverse", md: "row"}}
                wrap="no-wrap"
                minW={{base: "90%", md: "60%", lg: "60%"}}
                minH="70vh"
                px={{base: 0, md: 6}}
                mb={16}>
                
                <AuthCoreLayout isSignIn={isSignIn} setSignIn={setSignIn}/>
            </Flex>
        </Page>
    )
}

const AuthCoreLayout = (props) => {
    const { t } = useTranslation();

    return (
        <Stack
            border="1px"
            borderColor="surface.400"
            borderRadius="md"
            bg="surface.700"
            spacing={{base: 2, md: 4}}
            w={{base: "90%", md: "60%"}}
            p={12}
            align="center">
            <Heading
                as="h1"
                size="lg"
                fontWeight="bold"
                color="primary.300"
                textAlign="center" >
                { t(props.isSignIn ? "auth.sign-in" : "auth.sign-up") }
            </Heading>
            <Heading
                as="h2"
                size="sm"
                color="text.secondary"
                opacity="0.8"
                fontWeight="normal"
                textAlign="center">
                { t(props.isSignIn ? "auth.sign-in-summary" : "auth.sign-up-summary")}
            </Heading>

            {   props.isSignIn 
                ? <SignInFormLayout />
                : <SignUpFormLayout />
            }
            
            <Button 
                variant="link" 
                borderRadius="md"
                onClick={() => props.setSignIn(!props.isSignIn)} >
                {t(props.isSignIn ? "auth.sign-in-secondary-action" : "auth.sign-up-secondary-action")}
            </Button>
        </Stack>
    )
}

export default AuthLayout;