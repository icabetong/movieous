import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { 
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Image,
    Stack,
    Text
} from "@chakra-ui/react";
import Page from "../../components/Page";
import { fetchSingle, buildImageUrl } from "../../infrastructure/MovieRepository";
import history from "../../utils/history";

const MovieLayout = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        fetchSingle(id)
            .then((response) => { setMovie(response.data) })
            .catch(() => history.push("/error") )
    }, [id]);

    return (
        <Page>
            <Flex
                align="center"
                justify={{base: "center", md: "space-around", xl: "space-between"}}
                direction={{base: "column-reverse", md: "row"}}
                wrap="no-wrap"
                minH="70vh"
                px={8}
                mb={16}>
                <Stack
                    spacing={4}
                    w={{base: "80%", md: "40%"}}
                    align={['center', 'center', 'flex-start', 'flex-start']} >
                    <Heading
                        as="h1"
                        size="xl"
                        fontWeight="bold"
                        color="primary.300"
                        textAlign={['center', 'center', "left", 'left']}>
                        {movie.title}
                    </Heading>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2">
                        {t("concat.rating", { rating: movie.vote_average})}
                    </Box>
                    <Heading
                        as="h2"
                        size="md"
                        color="gray.200"
                        opacity="0.8"
                        fontWeight="normal"
                        lineHeight={1.5}
                        textAlign={["center", "center", "left", "left"]}>
                        {movie.overview}
                    </Heading>
                    <Text>{t("concat.release-date", { date: movie.release_date })}</Text>
                    
                    <HStack spacing={4}>
                        <Link to={`/reserve/${id}`}>
                            <Button colorScheme="primary" borderRadius="8px" lineHeight="1" >{t("button.reserve")}</Button>
                        </Link>
                        <Button variant="ghost" onClick={(e) => { e.preventDefault();window.location.href = movie.homepage}}>
                            {t("button.learn-more")}
                        </Button>
                    </HStack>
                </Stack>
                <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                    <Image loading="lazy" src={buildImageUrl(movie.poster_path)} size="100%" rounded="1rem" shadow="2xl" />
                </Box>
            </Flex>
        </Page>
    );
}

export default MovieLayout;