import Page from "../../components/Page";
import { auth } from "../../index";

const MovieLayout = () => {
    return (
        <Page>
            <div>{auth.currentUser.email}</div>
        </Page>
    )
}

export default MovieLayout;