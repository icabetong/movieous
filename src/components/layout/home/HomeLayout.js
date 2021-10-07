import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Box, 
    Button,
    Flex,
    Image,
    Heading,
    Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Page from "../../sections/Page";

const HomeLayout = ({image, ctaLink, ...rest}) => {
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
                mb={16}
                {...rest}
            >
                <Stack
                    spacing={4}
                    w={{base: "80%", md: "40%"}}
                    align={['center', 'center', 'flex-start', 'flex-start']}
                >
                    <Heading
                        as="h1"
                        size="xl"
                        fontWeight="bold"
                        color="primary.300"
                        textAlign={['center', 'center', "left", 'left']}>
                        {t("landing_title")}
                    </Heading>
                    <Heading
                        as="h2"
                        size="md"
                        color="primary.100"
                        opacity="0.8"
                        fontWeight="normal"
                        lineHeight={1.5}
                        textAlign={["center", "center", "left", "left"]}>
                        {t("landing_summary")}
                    </Heading>
                    <Link to={ctaLink}>
                        <Button borderRadius="8px" lineHeight="1" >{t("landing_action")}</Button>
                    </Link>
                </Stack>
                <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                    <Image src={image} size="100%" rounded="1rem" shadow="2xl" />
                </Box>
            </Flex>
        </Page>
    )
}

HomeLayout.propTypes = {
    image: PropTypes.string,
    ctaLink: PropTypes.string
}

HomeLayout.defaultProps = {
    image: "https://images.unsplash.com/photo-1608170825938-a8ea0305d46c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1925&q=80",
    ctaLink: "/auth"
}

export default HomeLayout;