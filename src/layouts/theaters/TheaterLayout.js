import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../index";
import { transform } from "../../infrastructure/TheaterRepository";
import Page from "../../components/Page";
import history from "../../utils/history";
import TheaterList from "./Theater";

const TheaterLayout = () => {
    const [theaters, setTheaters] = useState([]);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "theaters"), (snapshot) => {
            setTheaters(transform(snapshot));
        })
        return () => unsubscribe();
    }, []);

    const onTheatherSelected = (movie) => {
        history.push(`/movie/${movie.id}`);
    }

    return (
        <Page title="info.now-showing">
            <TheaterList 
                theaters={theaters}
                onTheaterSelected={onTheatherSelected}/>
        </Page>
    )
}

export default TheaterLayout;