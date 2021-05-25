import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { getProductList } from "../services/index";
import Breadcrumb from "./breadcrumb";
import FreeShippingIcon from "../assets/Icono_Envio.png";
import "../styles/searchResults.scss";
import "../styles/error.scss";

function free_shipping(item) {
  if (item) {
    return (
      <img src={FreeShippingIcon} alt="Envio gratis" className="w-100" />
    )
  }
}

const SearchResults = () => {
  // use useLocation in order to wrap the queryString;
  const paramsString = useLocation().search;
  // The URLSearchParams interface defines utility methods to work with params string of a URL.
  const searchParam = new URLSearchParams(paramsString);
  // Returns the first value associated with the given search parameter.
  const paramItem = searchParam.get('search');


  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);


  useEffect(() => {
    async function loadProducts() {
      const apiResponse = await getProductList(paramItem);
      if (apiResponse.status === "success") {
        setHasError(false);
        setCategories(apiResponse.categories);
        setProducts(apiResponse.items);
        setLoading(false);
      } else {
        setLoading(false);
        setHasError(true);
      }
    }
    loadProducts();
    //put the variable who will affect the re-render of this function, in my case "when the URL change".
  }, [paramItem]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="d-flex justify-content-center mt-5 no-product-found">
        <p>Lo sentimos no podemos encontrar lo que estas buscando...</p>
      </div>
    )

  }


  const results = products.map(
    item => (
      <div className="product-item-box" key={item.id}>
        <Link className="product-link container" to={`/items/${item.id}`}>
          <div className="row">
            <div className="col-sm-4">
              <div className="image-box m-auto">
                <img src={item.picture} alt={item.title} />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="d-flex">
                <p className="price-properties">$ {item.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{item.price.decimals === "0" ? <sup>00</sup> : <sup>{item.price.decimals}</sup>}</p>
                <div className="free-shipping-box">{free_shipping(item.free_shipping)}</div>
              </div>
              <p className="title-properties">{item.title}</p>
            </div>
            <div className="col-sm-2">
              <p className="location-properties">{item.location}</p>
            </div>
          </div>
        </Link>
      </div >
    )
  )

  return (
    <main className="container">
      <div className="row">
        <div className="col-10 m-auto pt-3">
          <Breadcrumb sendCategories={categories} />
          <section className="p-4 search-results-box">
            {results}
          </section>
        </div>
      </div>
    </main>
  )
}

export default SearchResults;