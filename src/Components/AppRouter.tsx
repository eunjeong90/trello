import { Route } from "react-router-dom";
import Main from "./Main";

const AppRouter = () => {
  return (
    <Route path="/">
      <Main />
    </Route>
  );
};

export default AppRouter;
