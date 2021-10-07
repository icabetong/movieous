import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

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

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            bg={["primary.500", "primary.500", "transparent", "transparent"]}
            color={["white", "white", "primary.500", "primary.500"]}
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
                flexBasis={{base: "100%", md: "auto"}}
            >
                <Flex
                    align={["center", "center", "center", "center"]}
                    justify={["center", "space-between", "flex-end", "flex-end"]}
                    direction={["column", "row", "row", "row"]}
                    pt={[4, 4, 0, 0]}
                >
                    <MenuItems to="/">Home</MenuItems>
                    <MenuItems to="/movies">Movies</MenuItems>
                    <MenuItems to="/blogs">Blogs</MenuItems>
                    <MenuItems to="/contact">Contact</MenuItems>
                    <MenuItems to="/about">About</MenuItems>
                    <MenuItems to="/auth">
                        <Button
                            size="sm"
                            rounded="md"
                            color={["primary.500", "primary.500", "white", "white"]}
                            bg={["white", "white", "primary.500", "primary.500"]}
                            _hover={{
                                bg: [
                                    "primary.100",
                                    "primary.100",
                                    "primary.600",
                                    "primary.600"
                                ]
                            }}
                            >
                                Sign in
                            </Button>
                    </MenuItems>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Header;