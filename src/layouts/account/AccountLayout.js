import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import { 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
} from "@chakra-ui/react"
import Page from "../../components/Page";   
import InformationPanel from "./InformationPanel";
import ReservationPanel from "./ReservationPanel";
import { useAuthState } from "../../utils/auth";

const AccountLayout = () => {
    const { t } = useTranslation();
    const { status, user } = useAuthState();

    return (
        <>
        { status === "fetched" 
            ? <Page title={`${user.firstname} ${user.lastname}`}>
                <Tabs>
                    <TabList>
                        <Tab>{t("account.account")}</Tab>
                        <Tab>{t("account.reservations")}</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <InformationPanel/>
                        </TabPanel>
                        <TabPanel>
                            <ReservationPanel/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Page>
        : <Redirect to="/error"/>
        }
        </>
    )
}

export default AccountLayout;