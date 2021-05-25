import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Alert from "./alert";
import LogoMeli from "../assets/MercadoLibre_logo.png";
import SearchIcon from "../assets/Icono_Search.png";
import "../styles/searchBar.scss";

const SearchBar = () => {
  let history = useHistory();
  // let match = useRouteMatch("/");

  const [searchInput, setInput] = useState("");
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput == null || searchInput === "") {
      setAlert(true);
    } else {
      setAlert(false);
      searchInput.trim();
      history.push(`/items?search=${searchInput}`);
    }
    setInput("");
  }

  const handleSearching = (e) => {
    var search = e.target.value;
    setInput(search);
  }

  const handleKeyPress = () => {
    if (searchInput == null || searchInput === "") {
      setAlert(true);
    } else {
      setAlert(false);
      searchInput.trim();
      history.push(`/items?search=${searchInput}`);
      // match.isExact ? history.push(`/items?search=${searchInput}`) : history.push(`/?search=${searchInput}`);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light yellow-meli-bg">
        <div className="container-fluid justify-content-center search-bar-width p-2">
          <div className="meli-logo-box">
            <Link to='/'><img className="logo-height" src={LogoMeli} alt="Logo Mecado Libre" /></Link>
          </div>
          <div className="w-75">
            <form onSubmit={handleSubmit} className="w-100 d-flex">
              <div className="w-100 input-and-button-box">
                <input
                  className="w-100 seach-input-styles"
                  type="text"
                  value={searchInput}
                  onChange={handleSearching}
                  placeholder="Nunca dejes de buscar"
                  onKeyPress={(e) => e.key === "Enter" && handleKeyPress()}
                />
                <button type="submit" className="submit-button-properties"><img src={SearchIcon} alt="Buscar" /></button>
              </div>
            </form>
          </div>
        </div>
      </nav>
      {alert && <Alert />}
    </div>
  );

}

export default SearchBar;
