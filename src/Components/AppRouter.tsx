import { Route, BrowserRouter } from "react-router-dom";
import Main from "./Main";

const AppRouter = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Route path="/">
        <Main />
      </Route>
    </BrowserRouter>
  );
};

export default AppRouter;
