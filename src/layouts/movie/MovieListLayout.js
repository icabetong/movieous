import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useBreakpointValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Page from "../../components/Page";
import { fetch } from "../../infrastructure/MovieRepository";
import history from "../../utils/history";
import MovieList from "./Movie";

import "./custom.css";

const MovieListLayout = () => {
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
                    items: data.total_results,
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
        <Page title="navigation.movies">
            <MovieList movies={response.movies} onMovieSelected={onMovieSelected}/>
            <ReactPaginate
                previousLabel={<ChevronLeftIcon/>}
                nextLabel={<ChevronRightIcon/>}
                onPageChange={onPageChange}
                pageCount={response.pages}
                currentPage={currentPage}
                marginPagesDisplayed={breakRange}
                pageRangeDisplayed={range}
                containerClassName="container"/>
        </Page>
    )
}

export default MovieListLayout;