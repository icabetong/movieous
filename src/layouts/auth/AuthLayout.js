import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import Page from "../../components/Page";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import UserInformationForm from "./UserInformationForm";

const AuthLayout = () => {
    const [mode, setMode] = useState("sign-in");
    
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
                <AuthInnerLayout mode={mode} setMode={setMode}/>
            </Flex>
        </Page>
    )
}

const AuthInnerLayout = (props) => {
    switch(props.mode) {
        case "sign-in": return <SignInForm setMode={props.setMode}/>
        case "sign-up": return <SignUpForm setMode={props.setMode}/>
        case "enter-info": return <UserInformationForm setMode={props.setMode}/>
        default: return <div></div>
    }
}

export default AuthLayout;