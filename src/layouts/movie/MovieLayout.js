import { useTranslation } from "react-i18next";
import { Heading } from "@chakra-ui/layout";
import Page from "../../components/Page";
import { auth } from "../../index";

const MovieLayout = () => {
    const { t } = useTranslation();

    return (
        <Page>
            <Heading as="h2" size="xl">{t("navigation.movies")}</Heading>
        </Page>
    )
}

export default MovieLayout;