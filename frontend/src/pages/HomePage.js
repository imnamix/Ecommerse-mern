import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState(null); 
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Fetch total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products
  const fetchProducts = async (pageNum) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${pageNum}`);
      setLoading(false);
      setProducts(prevProducts => [...prevProducts, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  // Filter products by category or price
  useEffect(() => {
    if (!checked.length || !radio) {
      fetchProducts(1); // Reset to page 1 if no filters are applied
    } else {
      filterProduct();
    }
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    setChecked(prevChecked => {
      if (value) {
        return [...prevChecked, id];
      } else {
        return prevChecked.filter(c => c !== id);
      }
    });
  };

  const handleRadioChange = (e) => {
    setRadio(e.target.value);
  };

  return (
    <Layout title={"All Products - Best offers"}>
      <div style={{ margin: "10px", marginTop: "70px" }}>
        <Carousel infiniteLoop autoPlay showThumbs={false} style={{ height: '300px' }}>
          <div>
            <img src={'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/282e51d8bab4dc56.png?q=20'} alt="Banner 1" />
          </div>
          <div>
            <img src={'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/eae7bd669ddd2528.jpg?q=20'} alt="Banner 2" />
          </div>
          <div>
            <img src={'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/48d0150e5dd6fd9c.jpg?q=20'} alt="Banner 3" />
          </div>
        </Carousel>
      </div>

      <div className="container-fluid row mt-3  home-page">
        <div className="col-lg-3 col-md-4 filters"> 
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map(c => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={handleRadioChange} value={radio}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.value}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className="btn btn-danger" onClick={() => window.location.reload()} style={{ borderRadius: '5px' }}>
              RESET FILTERS
            </button>
          </div>
        </div>
        
        <div className="col-lg-9 col-md-8"> 
          <h1 className="text-center">All Products</h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 col-md-12 ">
            {products?.map((p, index) => (
              <div className="col mb-4 " key={index}>
                <div className="card" >
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title" style={{ height: '40px' }}>{p.name.substring(0, 30)}...</h5>
                      <h5 className="card-title card-price">₹{p.price}/-</h5>
                    </div>
                    <p className="card-text" style={{ height: '40px' }}>{p.description.substring(0, 40)}...</p>
                    <div className="card-name-price">
                      <button className="btn btn-info ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                      <button className={`btn ${cart.find(item => item._id === p._id) ? 'btn-danger' : 'btn-dark'} ms-1`}
                        onClick={() => {
                          const isInCart = cart.find(item => item._id === p._id);
                          if (isInCart) {
                            const updatedCart = cart.filter(item => item._id !== p._id);
                            setCart(updatedCart);
                            localStorage.setItem("cart", JSON.stringify(updatedCart));
                            toast.success("Item Removed from cart");
                          } else {
                            setCart([...cart, p]);
                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                            toast.success("Item Added to cart");
                          }
                        }} >
                        {cart.find(item => item._id === p._id) ? 'REMOVE FROM CART' : 'ADD TO CART'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="m-2 p-3">
            {products && products.length < total && (
              <button className="btn loadmore" onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
                {loading ? "Loading ..." : <>Loadmore <AiOutlineReload /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
