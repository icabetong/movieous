import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { Box, Heading, useBreakpointValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Page from "../../components/Page";
import { fetch } from "../../infrastructure/Movie";
import history from "../../utils/history";
import MovieList from "./Movie";

import "./custom.css";

const MovieListLayout = () => {
    const { t } = useTranslation();
    const [response, setResponse] = useState({ movies: [], pages: 0, items: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const range = useBreakpointValue({ base: 2, md: 5 });
    const breakRange = useBreakpointValue({ base: 1, md: 2 });
    
    useEffect(() => {
        fetch(currentPage)
            .then((data) => { 
                setResponse({
                    movies: data.results,
                    pages: data.total_pages,
                    items: data.total_results
                });
            }).catch((error) => { 
                console.log(error)
            })
    }, [currentPage]);

    const onPageChange = (page) => {
        setCurrentPage(page.selected + 1);
    }

    const onMovieSelected = (movie) => {
        history.push(`/movie/${movie.id}`);
    }

    return (
        <Page>
            <Heading as="h2" size="xl">{t("navigation.movies")}</Heading>
            <MovieList movies={response.movies} onMovieSelected={onMovieSelected}/>
            <Box>
                <ReactPaginate
                    previousLabel={<ChevronLeftIcon/>}
                    nextLabel={<ChevronRightIcon/>}
                    onPageChange={onPageChange}
                    pageCount={response.pages}
                    marginPagesDisplayed={breakRange}
                    pageRangeDisplayed={range}
                    containerClassName="container"/>
            </Box>
        </Page>
    )
}

export default MovieListLayout;