import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  // Inline CSS styles
  const productCardStyle = {
    width: "18rem",
    height: "76%", /* Set a fixed height for the card */
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: '10px',
   
  };

  return (
    <Layout style={{ overflowX:'hidden'}}>
      <div className="row dashboard" style={{ marginLeft:'10px'}} >
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap mb-2" >
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
                style={{marginBottom:"-90px"}}
              >
                <div className="card m-3" style={productCardStyle} >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{height:'58%'}}
                  />
                  <div className="card-body">
                    <h5 className="card-title"  style={{height:'20px'}}>{p.name.substring(0, 20)}...</h5>
                    <p className="card-text" style={{height:'40px'}}>{p.description.substring(0, 40)}...</p>
                    <h5 className="card-title card-price">₹{p.price}/-</h5>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
