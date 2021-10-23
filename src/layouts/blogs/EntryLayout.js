import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
    Box
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import Page from "../../components/Page";
import LoadingStateLayout from "../state/LoadingStateLayout";
import { download } from "../../infrastructure/BlogEntryRepository";
import { onSnapshot, doc } from "firebase/firestore";
import { firestore } from "../..";

const EntryLayout = () => {
    const { id } = useParams();
    const [entry, setEntry] = useState();
    const [content, setContent] = useState("");

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(firestore, "entries", id), (snapshot) => {
            setEntry(snapshot.data());
        })
        return () => unsubscribe();
    }, [id]);

    useEffect(() => {
        if (id) {
            download(id)
                .then(markdown => setContent(markdown))
                .catch(error => console.log(error))
        }
    }, [id])

    return (
        <>
        { entry 
          ?  <Page title={entry.title}>
                <Box mb={16}>
                    <ReactMarkdown children={content}/>
                </Box>
            </Page>
          : <LoadingStateLayout/>
        }
        </>
    )
}
export default EntryLayout;