import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { Box, Heading } from "@chakra-ui/react";
import Page from "../../components/Page";
import { fetch } from "../../infrastructure/Movie";
import MovieList from "./Movie";

import "./custom.css";

const MovieLayout = () => {
    const { t } = useTranslation();
    const [response, setResponse] = useState({ movies: [], pages: 0, items: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    
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
        setCurrentPage(page.selected);
    }

    return (
        <Page>
            <Heading as="h2" size="xl">{t("navigation.movies")}</Heading>
            <MovieList movies={response.movies}/>
            <Box>
                <ReactPaginate
                    onPageChange={onPageChange}
                    pageCount={response.pages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={10}
                    containerClassName="container"
                    nextClassName="next-button"/>
            </Box>
        </Page>
    )
}

export default MovieLayout;