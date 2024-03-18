import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    try {
      // Send a request to create an order
      await axios.post("/api/v1/orders", {
        // Provide necessary order details here
        // For example:
        products: [
          {
            productId: "product_id_here",
            quantity: 1
          }
        ],
        // Other order details like user ID, payment details, etc.
      });
      // After creating the order, fetch updated orders
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  useEffect(() => {
    // Simulate a pending order only if orders are empty
    if (orders.length === 0) {
      const pendingOrder = {
        _id: "pending_order_id",
        status: "Pending",
        buyer: {
          name: "John Doe" // Example buyer name
        },
        createdAt: moment().toISOString(), // Current time
        payment: {
          success: false // Payment not successful yet
        },
        products: [
          {
            _id: "product_id_here",
            name: 'Tunifi WS-01 Mini Home Theater|3D Sound|Splashproof|Water Resistant|Bluetooth Speaker 10 W Bluetooth Speaker  (Black, Stereo Channel)',
            description: 'PORTABLE / POWERFUL This Amplifier Speaker System by is equipped with 8 inch Subwoofer for Full Range Stereo Sound Reproduction and cool Flashing DJ Lights which makes it ideal for patio party / music jam. It also has a retractable handle and wheels for easy transport. FM RADIO / AUDIO RECORDING: The powerful rechargeable battery provides long playtime non-stop (Playtime varies according to volume level and audio content). enabled phones, PCs, and notebooks, available in a variety of colors. ',
            price: 499 // Example product price
          }
        ]
      };

      setOrders([pendingOrder]);
    }
  }, [orders]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
           
            {orders?.map((o, i) => {
              return (
                <div className="border shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={'https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/mobile-tablet-speaker/s/3/o/ws-01-mini-home-theater-3d-sound-splashproof-water-resistant-original-imagtggnmbnggrmv.jpeg?q=70'}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"300px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p style={{fontWeight:'bold'}}>{p.name}</p>
                          <p>{p.description}</p>
                          <p>Price : {p.price}/-</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
