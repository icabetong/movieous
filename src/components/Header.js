import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
    Box, 
    Button, 
    Flex, 
    Heading,
    Text,
    useBreakpointValue, 
} from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/transition";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuthState } from "../utils/auth";
import { auth } from "../index";

const MenuItems = (props) => {
    const { children, isLast, to = "/", ...rest } = props;

    return (
        <Text
            mb={{base: isLast ? 0 : 8, sm: 0}}
            mr={{base: 0, sm: isLast ? 0 : 8}}
            display="block"
            {...rest}
        >
            <Link to={to}>{children}</Link>
        </Text>
    )
}

const Header = (props) => {
    const [show, setShow] = React.useState(false);
    const toggleMenu = () => setShow(!show);
    const navigation = useBreakpointValue({
        base: <Collapse in={show} animateOpacity><Navigation/></Collapse>,
        md: <Navigation/>
    })

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            bg={["primary.300", "primary.300", "transparent", "transparent"]}
            color={["white", "white", "primary.300", "primary.300"]}
            {...props}
        >
            <Flex align="center">
                <Heading size="md">Movieous</Heading>
            </Flex>

            <Box display={{base: "block", md: "none"}} onClick={toggleMenu}>
                {show ? <CloseIcon/> : <HamburgerIcon/> }
            </Box>

            <Box
                display={{ base: show ? "block" : "none", md: "block"}}
                flexBasis={{base: "100%", md: "auto"}}>
                {navigation}
            </Box>
        </Flex>
    )
}

const Navigation = () => {
    const { t } = useTranslation();
    const { status } = useAuthState();
    const hasUser = Boolean(auth.currentUser);

    return (
        <>
            <Flex
                align={["center", "center", "center", "center"]}
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}>
                <MenuItems to="/">{t("navigation.home")}</MenuItems>
                <MenuItems to="/movies">{t("navigation.movies")}</MenuItems>
                <MenuItems to="/blogs">{t("navigation.blogs")}</MenuItems>
                {/* <MenuItems to="/contact">Contact</MenuItems> */}
                <MenuItems to="/about">{t("navigation.about")}</MenuItems>
                <MenuItems to={hasUser ? "/account" : "/auth"}>
                    <Button
                        isLoading={status === "pending"}
                        size="sm"
                        rounded="md"
                        color={["primary.300", "primary.300", "white", "white"]}
                        bg={["white", "white", "primary.300", "primary.300"]}
                        _hover={{
                            bg: [
                                "primary.100",
                                "primary.100",
                                "primary.600",
                                "primary.600"
                            ]
                        }}>
                        {t(hasUser ? "navigation.account" : "auth.sign-in")}
                    </Button>
                </MenuItems>
            </Flex>
        </>
    )
};

export default Header;