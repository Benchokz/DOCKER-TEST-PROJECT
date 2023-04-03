import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import MainComponent from "./MainComponent";

function App() {
  return (
    <Router>
      <Fragment>
        <header className="header">
          <div>This is a multicontainer application</div>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other page</Link>
        </header>
        <div className="main">
          <Routes>
          <Route exact path="/" component={MainComponent} />
          <Route path="/otherpage" component={OtherPage} />
          </Routes>
        </div>
       </Fragment>
    </Router>
  );
}

export default App;
