import { useTranslation } from "react-i18next";
import { 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel 
} from "@chakra-ui/react";
import Page from "../../components/Page";
import SnackPanel from "./snacks/SnackPanel";

const ConsoleLayout = () => {
    const { t } = useTranslation();

    return (
        <Page title="navigation.console">
            <Tabs colorScheme="primary">
                <TabList>
                    <Tab>{t("console.snacks")}</Tab>
                    <Tab>{t("console.reservations")}</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel><SnackPanel/></TabPanel>
                    <TabPanel>
                    <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Page>
    )
}

export default ConsoleLayout;