import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import {
    Box,
    Button,
    GridItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    SimpleGrid,
} from "@chakra-ui/react";
import { fetch } from "../../../infrastructure/MovieRepository";

const MoviePicker = (props) => {
    const { t } = useTranslation();
    const [response, setResponse] = useState({ movies: [], pages: 0, items: 0 });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch(currentPage)
            .then((data) => setResponse({
                movies: data.results,
                pages: data.total_pages,
                items: data.total_results,
            })
            ).catch((error) => console.log(error));
    }, [currentPage])

    const onPageChange = (page) => {
        setCurrentPage(page.selected + 1);
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} size="xl" scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent as="form">
                <ModalHeader>{t("modal.select-movie")}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <MovieGrid 
                    movies={response.movies} 
                    onItemSelect={props.onItemSelect}/>
                </ModalBody>

            <ModalFooter>
                <Box display="flex" justifyContent="center" width="100%">
                    <ReactPaginate
                        onPageChange={onPageChange}
                        pageCount={response.pages}
                        currentPage={currentPage}
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={3}
                        containerClassName="container"/>
                </Box>
            </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

const MovieGrid = (props) => {
    return (
        <SimpleGrid columns={{base: 1, md: 2}} spacing={2}>
            { props.movies.map((movie) => {
                return (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onItemSelect={props.onItemSelect}/>
                );
            })}
        </SimpleGrid>
    )
}

const MovieCard = (props) => {
    const { t } = useTranslation();

    return (
        <GridItem
            pointer="cursor"
            as="button"
            borderRadius="md"
            onClick={(e) => props.onItemSelect(e, props.movie)}
            _hover={{bg: "gray.600", color: "primary.300"}}>
            <Box p="4">
                <Box
                    fontWeight="medium"
                    isTruncated>
                    {props.movie.original_title}
                </Box>
                <Box
                    color="gray.500"
                    isTruncated>
                    { t("concat.rating-and-votes", { rating: props.movie.vote_average, votes: props.movie.vote_count}) }
                </Box>
            </Box>
        </GridItem>
    )
}

export default MoviePicker;