import { useTranslation } from "react-i18next";
import {
    Box,
    GridItem,
    IconButton,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react";
import {
    HiOutlinePencil, HiOutlineTrash
} from "react-icons/hi";

const TheaterList = (props) => {
    return (
        <SimpleGrid
            columns={{ base: 1, md: 4, lg: 5 }}
            mt={4}
            spacing={4}>
            { props.theaters.map(theater => (
                <TheaterItem
                    key={theater.theaterId}
                    theater={theater}
                    onClick={props.onClick}
                    onDelete={props.onDelete}/>
            ))}
        </SimpleGrid>
    )
}

const TheaterItem = (props) => {
    const { t } = useTranslation();

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
                _hover={{ borderColor: "primary.300", bg: "surface.700" }}>
                <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase">
                    {t("concat.number-of-seats", { seats: props.theater.seats })}
                </Box>
                <Box 
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated>
                    {props.theater.movie.title}
                </Box>
                <Box>{t("concat.price-sign-only", { price: props.theater.price })}</Box>
                <Stack direction="row" display="flex" alignItems="center" justifyContent="flex-end" mt={2} w="100%">
                    <IconButton onClick={() => props.onClick(props.theater)} icon={<HiOutlinePencil/>}/>
                    <IconButton onClick={() => props.onDelete(props.theater)} icon={<HiOutlineTrash/>}/>
                </Stack>
            </Box>
        </GridItem>
    )
}


export default TheaterList;