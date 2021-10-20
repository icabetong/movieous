import { useTranslation } from "react-i18next";
import {
    Box,
    GridItem,
    IconButton,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

const SnackList = (props) => {
    return (
        <SimpleGrid 
            columns={{ base: 1, md: 4, lg: 5 }}
            mt={4} 
            spacing={4}>
            { props.snacks.map(snack => (
                <SnackItem 
                    key={snack.snackId} 
                    snack={snack} 
                    onClick={props.onClick}
                    onDelete={props.onDelete}/>
            ))}
        </SimpleGrid>
    )
}

const SnackItem = (props) => {
    const { t } = useTranslation(); 
    const variants = Object.values(props.snack.variations);
    const lowest = variants.reduce((prev, curr) => prev.price < curr.price ? prev : curr );
    const highest = variants.reduce((prev, curr) => prev.price > curr.price ? prev : curr );
    
    return (
        <GridItem>
            <Box 
                p={6} 
                maxW="xs"
                display="flex"
                flexDirection="column"
                alignItems="baseline" 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden"
                _hover={{ borderColor: "blue.300", bg: "surface.700" }}>
                <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase">
                    {t("concat.variations", { variation: variants.length })}
                </Box>
                <Box 
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated>
                    {props.snack.name}
                </Box>
                <Box>{t("concat.price-ranges", { lowest: lowest.price.toFixed(2), highest: highest.price.toFixed(2) })}</Box>
                <Stack direction="row" display="flex" alignItems="center" justifyContent="flex-end" mt={2} w="100%">
                    <IconButton onClick={() => props.onClick(props.snack)} icon={<HiOutlinePencil/>}/>
                    <IconButton onClick={() => props.onDelete(props.snack)} icon={<HiOutlineTrash/>}/>
                </Stack>
            </Box>
        </GridItem>
    )
}

export default SnackList;