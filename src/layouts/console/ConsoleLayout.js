import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";
import {
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel 
} from "@chakra-ui/react";
import SnackPanel from "./snacks/SnackPanel";
import BlogPanel from "./blogs/BlogPanel";
import TheaterPanel from "./theater/TheaterPanel";
import LoadingStateLayout from "../state/LoadingStateLayout";
import Page from "../../components/Page";
import { useAuthState } from "../../utils/auth";

const ConsoleLayout = () => {
    const { t } = useTranslation();
    const { status, user } = useAuthState();

    return (
        <>
        { status === "fetched"
            ? user.isAdmin
                ? <Page title="navigation.console">
                    <Tabs colorScheme="blue">
                        <TabList>
                            <Tab>{t("console.snacks")}</Tab>
                            <Tab>{t("console.theater")}</Tab>
                            <Tab>{t("console.blogs")}</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <SnackPanel/>
                            </TabPanel>
                            <TabPanel>
                                <TheaterPanel/>
                            </TabPanel>
                            <TabPanel>
                                <BlogPanel/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Page>
                : <Redirect to="/error/"/>
            : <LoadingStateLayout/>
         }
         </>
    )
}

export default ConsoleLayout;