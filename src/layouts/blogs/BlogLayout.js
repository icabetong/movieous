import { useEffect, useState } from "react";
import Page from "../../components/Page";
import BlogEntryList from "./BlogList";
import { transform } from "../../infrastructure/BlogEntryRepository";
import { onSnapshot, collection } from "@firebase/firestore";
import history from "../../utils/history";
import { firestore } from "../..";

const BlogLayout = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "entries"), (snapshot) => {
            setEntries(transform(snapshot))
        })
        return () => unsubscribe();
    }, []);

    const onEntryClicked = (entry) => {
        history.push(`/entry/${entry.entryId}`)
    }

    return (
        <Page title="navigation.blogs">
            <BlogEntryList
                entries={entries}
                onClick={onEntryClicked}/>
        </Page>
    )
}

export default BlogLayout;