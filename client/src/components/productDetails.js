import { useState, useEffect } from "react";
import Breadcrumb from "./breadcrumb";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../services";
import "../styles/productDetails.scss";
import "../styles/error.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState([]);


  useEffect(() => {
    async function loadProductDetail() {
      const apiResponse = await getProductDetail(id);
      if (apiResponse.status === "success") {
        setSelectedProduct(apiResponse.myProduct);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    loadProductDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col-10 m-auto pt-3">
          <Breadcrumb sendCategories={selectedProduct.categories} />
          <section className="p-4 search-results-box">
            <div className="container height-container">
              <div className="row height-row">
                <div className="col-sm-8">
                  <img src={selectedProduct.item.picture} alt={selectedProduct.item.picture} className="height-row" />
                </div>
                <div className="col-sm-4">
                  <p>{selectedProduct.item.condition === "new" ? "Nuevo" : "Usado"} - {selectedProduct.item.sold} {selectedProduct.item.sold > 1 ? "Vendidos" : "Vendido"}</p>
                  <p className="font-size-product-price">$ {selectedProduct.item.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{selectedProduct.item.price.decimal === "0" ? <sup>00</sup> : <sup>{selectedProduct.item.price.decimals}</sup>}</p>
                  <h1 className="product-title-properties font-size-product-title">{selectedProduct.item.title}</h1>
                  <div className="d-grid gap-2 margin-top">
                    <button type="button" className="btn btn-primary">Comprar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="desp-with">
              <h5 className="title-description-properties">Descripcion del producto</h5>
              <p className="description-properties">{selectedProduct.description}</p>
              <div className="d-grid gap-2">
                <button type="button" className="btn btn-primary buy-button-mobile">Comprar</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails;