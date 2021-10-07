import { BrowserRouter, Switch, Route } from "react-router-dom";
import CoreLayout from "../core/CoreLayout";

const Main = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <CoreLayout/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Main;