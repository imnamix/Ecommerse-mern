import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const sampleUserOrder = {
    _id: "sample_order_id",
    status: "Processing",
    buyer: {
      name: "Sample User",
    },
    createAt: moment().toISOString(), // Current time
    payment: {
      success: true,
    },
    products: [
      {
        _id: "product_id_here",
        name: 'Tunifi WS-01 Mini Home Theater|3D Sound|Splashproof|Water Resistant|Bluetooth Speaker 10 W Bluetooth Speaker  (Black, Stereo Channel)',
        description: 'PORTABLE / POWERFUL This Amplifier Speaker System by is equipped with 8 inch Subwoofer for Full Range Stereo Sound Reproduction and cool Flashing DJ Lights which makes it ideal for patio party / music jam. It also has a retractable handle and wheels for easy transport. FM RADIO / AUDIO RECORDING: The powerful rechargeable battery provides long playtime non-stop (Playtime varies according to volume level and audio content). enabled phones, PCs, and notebooks, available in a variety of colors. ',
        price: 499 // Example product price
      },
    ],
  };

  const getOrders = async (event) => {
    event.preventDefault(); 
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      const fetchData = async () => {
        await getOrders();
      };
      fetchData();
    }
  }, [auth?.token]);

  const handleChange = async (orderId, value, event) => {
    //event.preventDefault(); // Prevent default behavior
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
      
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };

  // Append sample order to orders state
  useEffect(() => {
    
    setOrders(prevOrders => [sampleUserOrder, ...prevOrders]);
  }, []);

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
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
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value, event) => handleChange(o._id, value, event)}
                          defaultValue={undefined} // Set defaultValue to undefined
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
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
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
