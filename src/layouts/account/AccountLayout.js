import { useTranslation } from "react-i18next";
import { 
    Button,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel 
} from "@chakra-ui/react"
import Page from "../../components/Page";
import { auth } from "../../index";

const AccountLayout = () => {
    const { t } = useTranslation();

    return (
        <Page title="navigation.account">
            <Tabs colorScheme="primary">
                <TabList>
                    <Tab>{t("console.snacks")}</Tab>
                    <Tab>{t("console.reservations")}</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Button onClick={() => auth.signOut()}>Sign Out</Button>
                    </TabPanel>
                    <TabPanel>
                    <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Page>
    )
}

export default AccountLayout;