import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import './App.css';
import { InstrumentListPage } from "./InstrumentListPage";
import { InstrumentSinglePage } from "./InstrumentSinglePage";
import { InstrumentCreatePage } from "./InstrumentCreatePage";

function App() {
 return (
  <Router>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to={`/`} className="nav-link">
              <span className="nav-link">Hangszerek</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/uj-hangszer`} className="nav-link">
              <span className="nav-link">Új hangszer</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
    <Routes>
      <Route path="/" element={ <InstrumentListPage /> } />
      <Route path="/hangszer/:hangszerId" element={ <InstrumentSinglePage /> } />
      <Route path="/uj-hangszer" element={ <InstrumentCreatePage /> } />
    </Routes>
  </Router>
 );
}

export default App;
