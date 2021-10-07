import {
    Button 
} from "@chakra-ui/react";
import Page from "../../components/Page";
import { auth } from "../../index";

const AccountLayout = () => {
    return (
        <Page>
            <Button onClick={() => auth.signOut()}>Sign Out</Button>
        </Page>
    )
}

export default AccountLayout;