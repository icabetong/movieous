import { useTranslation } from "react-i18next";
import {
    Box,
    Badge,
    Button,
    Image,
    GridItem,
    SimpleGrid
} from "@chakra-ui/react";
import history from "../../utils/history";
import { buildImageUrl } from "../../infrastructure/MovieRepository";

const TheaterList = (props) => {
    return (
        <SimpleGrid columns={{base: 1, md: 2, lg: 4}} spacing={{base: 2, md: 4}} my={8} mx={2}>
            { props.theaters.map((theater) => { 
                return (
                    <TheaterCard 
                        key={theater.theaterId}
                        theater={theater}
                        onTheaterSelect={props.onTheaterSelected}/>
                )
            })}
        </SimpleGrid>
    )
}

const TheaterCard = (props) => {
    const { t } = useTranslation();

    return (
        <GridItem>
            <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Image src={buildImageUrl(props.theater.movie.backdrop_path)}/>

                <Box p="6">
                    <Box display="flex" alignItems="baseline">
                        <Badge borderRadius="full" px="2" colorScheme="blue">
                            {props.theater.movie.original_language}
                        </Badge>
                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                            isTruncated>
                            { t("concat.available-seats", { 
                                free: props.theater.freeSeats ? props.theater.freeSeats : 0
                            }) 
                            }
                        </Box>
                    </Box>
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h2"
                        lineHeight="tight"
                        isTruncated >
                        {props.theater.movie.title}
                    </Box>
                    <Box noOfLines={3} color="gray.300">
                        {props.theater.movie.overview}
                    </Box>
                    <Button variant="link" size="sm" onClick={() => props.onMovieSelect(props.theater.movie)}>{t("button.read-more")}</Button>

                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            size="sm" mt={8} 
                            borderRadius="md" 
                            colorScheme="blue"
                            disabled={props.theater.freeSeats < 1}
                            onClick={() => history.push(`/reserve/${props.theater.theaterId}`)}>
                            {t("button.reserve")}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </GridItem>
    )
}

export default TheaterList;