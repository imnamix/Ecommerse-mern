import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from 'react-toastify'; // Import toast
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart(); // Define cart state

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCart = (p) => {
    const isInCart = cart.find(item => item._id === p._id);
    if (isInCart) {
      const updatedCart = cart.filter(item => item._id !== p._id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item Removed from cart");
    } else {
      setCart([...cart, p]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, p])
      );
      toast.success("Item Added to cart");
    }
  };

  const deliveryDate = () => {
    const today = new Date();
    const delivery = new Date(today);
    delivery.setDate(delivery.getDate() + 5); // Add 5 days to today's date
  
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return delivery.toLocaleDateString('en-US', options);
  };
  

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="500"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6 style={{ fontWeight: 'bold' }}>Name : {product.name}</h6>
          <h6 >Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <h6 style={{display:'flex'}}>Delivery Date: <p style={{fontWeight:'bold', color:'green'}}>&nbsp;{deliveryDate()}</p></h6>

          <button
            className={`btn ${cart.find(item => item._id === product._id) ? 'btn-danger' : 'btn-dark'} ms-1`}
            onClick={() => handleCart(product)}
          >
            {cart.find(item => item._id === product._id) ? 'REMOVE FROM CART' : 'ADD TO CART'}
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products" style={{ marginLeft: '60px' }}>
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body d-flex flex-column">
                <div>
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description?.substring(0, 60)}...
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className={`btn ${cart.find(item => item._id === p._id) ? 'btn-danger' : 'btn-dark'} ms-1`}
                      onClick={() => handleCart(p)}
                    >
                      {cart.find(item => item._id === p._id) ? 'REMOVE FROM CART' : 'ADD TO CART'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
