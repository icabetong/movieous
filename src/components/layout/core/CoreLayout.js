import { Flex } from "@chakra-ui/react";
import Header from "../../sections/Header";
import HomeLayout from "../home/HomeLayout";

const CoreLayout = (props) => {
    return (
        <Flex
            direction="column"
            align="center"
            maxW={{xl: "1200px"}}
            m="0 auto"
            {...props}
        >
            <Header/>
            <HomeLayout/>
        </Flex>
    )
}

export default CoreLayout;