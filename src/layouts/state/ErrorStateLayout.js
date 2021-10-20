import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    Heading,
    Stack
} from "@chakra-ui/react";
import { ReactComponent as Figure } from "../../assets/error.svg";
import Page from "../../components/Page";

const ErrorStateLayout = () => {
    const { t } = useTranslation();

    return ( 
        <Page>
            <Flex
                align="center"
                justify={{base: "center", md: "space-around", xl: "space-between"}}
                direction={{base: "column-reverse", md: "row"}}
                wrap="no-wrap"
                minH="70vh"
                px={8}
                mb={16} >
                <Stack
                    spacing={4}
                    w={{base: "80%", md: "40%"}}
                    align={['center', 'center', 'flex-start', 'flex-start']} >
                    <Heading
                        as="h1"
                        size="xl"
                        fontWeight="bold"
                        color="blue.500"
                        textAlign={['center', 'center', "left", 'left']}>
                        {t("error.generic-title")}
                    </Heading>
                    <Heading
                        as="h2"
                        size="md"
                        color="gray.100"
                        opacity="0.8"
                        fontWeight="normal"
                        lineHeight={1.5}
                        textAlign={["center", "center", "left", "left"]}>
                        {t("error.generic-message")}
                    </Heading>
                    <Link to="/">
                        <Button colorScheme="blue" borderRadius="8px" lineHeight="1" >{t("button.back-to-home")}</Button>
                    </Link>
                </Stack>
                <Box w="80%" mb={{ base: 12, md: 0 }}>
                    <Figure/>
                </Box>
            </Flex>
        </Page>
    );
}

export default ErrorStateLayout;