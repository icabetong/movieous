import { Box, Spinner } from "@chakra-ui/react";

const LoadingStateLayout = () => {
    return (
        <Box minH="100vh" minW="100vw" display="flex" alignItems="center" justifyContent="center">
            <Spinner size="xl" colorScheme="primary"/>
        </Box>
    )
}
export default LoadingStateLayout;