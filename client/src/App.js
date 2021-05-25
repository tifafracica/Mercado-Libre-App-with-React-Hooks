import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchBar from './components/searchBar';
import SearchResults from './components/searchResults';
import ProductDetails from './components/productDetails';
import './App.scss';

function App() {
  return (
    <Router>
      <SearchBar />
      <Route exact path="/items" component={SearchResults} />
      <Route path="/items/:id" component={ProductDetails} />
    </Router>
  );
}

export default App;
