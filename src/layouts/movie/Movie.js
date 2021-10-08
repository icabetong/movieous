import { useTranslation } from "react-i18next";
import {
    Box,
    Badge,
    Button,
    Image,
    GridItem,
    SimpleGrid
} from "@chakra-ui/react";
import { IMAGE_URL } from "../../infrastructure/Movie";

const MovieList = (props) => {
    return (
        <SimpleGrid columns={{base: 1, md: 2, lg: 4}} spacing={{base: 2, md: 4}} my={8} mx={2}>
            { props.movies.map((movie) => { return <MovieItem key={movie.id} onMovieSelect={props.onMovieSelected} movie={movie}/>}) }
        </SimpleGrid>
    )
}

const MovieItem = (props) => {
    const { t } = useTranslation();

    return (
        <GridItem>
            <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Image src={`${IMAGE_URL}${props.movie.backdrop_path}`}/>

                <Box p="6">
                    <Box display="flex" alignItems="baseline">
                        <Badge borderRadius="full" px="2" colorScheme="primary">
                            {props.movie.original_language}
                        </Badge>
                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                            isTruncated>
                            { t("concat.rating-and-votes", { rating: props.movie.vote_average, votes: props.movie.vote_count}) }
                        </Box>
                    </Box>
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h2"
                        lineHeight="tight"
                        isTruncated >
                        {props.movie.title}
                    </Box>
                    <Box noOfLines={3} color="gray.300">
                        {props.movie.overview}
                    </Box>
                    <Button variant="link" size="sm" onClick={() => props.onMovieSelect(props.movie)}>{t("button.read-more")}</Button>

                    <Box display="flex" justifyContent="flex-end">
                        <Button borderRadius="md" size="sm" mt={8}>
                            {t("button.book")}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </GridItem>
    )
}

export default MovieList;