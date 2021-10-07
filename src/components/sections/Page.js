import { Flex } from "@chakra-ui/react";
import Header from "./Header";

const Page = ({ children }) => {
    return (
        <Flex
        direction="column"
        align="center"
        maxW={{xl: "1200px"}}
        m="0 auto"
        >
            <Header/>
            {children}
        </Flex>
    )
}

export default Page;