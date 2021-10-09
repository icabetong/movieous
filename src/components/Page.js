import { useTranslation } from "react-i18next";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Header from "./Header";

const Page = (props) => {
    const { t } = useTranslation();

    return (
        <Flex
            direction="column"
            align="center"
            maxW={{xl: "1200px"}}
            minH="100vh"
            m="0 auto">
            <Header/>
            <Box minW="100%" minH="70vh" px={8}>
                { props.title && <Heading as="h2" size="xl" mb={4}>{t(props.title)}</Heading> }
            {props.children}
            </Box>
        </Flex>
    )
}

export default Page;