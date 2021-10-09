import { useTranslation } from "react-i18next";
import {
    Box,
    GridItem,
    SimpleGrid,
} from "@chakra-ui/react";

const SnackList = (props) => {
    return (
        <SimpleGrid mt={4} spacing={4}>
            { props.snacks.map(snack => <SnackItem key={snack.snackId} snack={snack} onClick={props.onClick}/>) }
        </SimpleGrid>
    )
}

const SnackItem = (props) => {
    const { t } = useTranslation(); 
    
    return (
        <GridItem cursor="pointer" onClick={() => props.onClick(props.snack)}>
            <Box 
                p={6} 
                maxW="xs"
                display="flex"
                flexDirection="column"
                alignItems="baseline" 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden">
                <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2">
                    {t("concat.variations", { variation: new Map(Object.entries(props.snack.variations)).size })}
                </Box>
                <Box 
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated>
                    {props.snack.name}
                </Box>
            </Box>
        </GridItem>
    )
}

export default SnackList;