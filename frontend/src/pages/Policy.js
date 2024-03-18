import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="contactus" style={{ marginBottom: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%", marginLeft: "-70px", marginTop: '90px' }}
          />
        </div>
        <div className="col-md-4 " >
          <div style={{ marginTop: '250px', textAlign: 'center',   }}>
            <p style={{ fontWeight: 'bold' }}>Privacy Policy</p>
            <p>This privacy policy outlines how we collect, use, and protect your personal information.</p>
            <PolicyItem title="Cookie Policy" description="Our cookie policy explains how we use cookies and similar tracking technologies." />
            <PolicyItem title="Terms and Conditions" description="Our terms and conditions govern your use of our website and services." />
            <PolicyItem title="Refund Policy" description="This refund policy outlines our procedures for processing refunds." />
            <PolicyItem title="Shipping Policy" description="Our shipping policy explains our shipping methods, costs, and delivery times." />
            {/* <PolicyItem title="Security Policy" description="Our security policy outlines the measures we take to protect your information." /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const PolicyItem = ({ title, description }) => {
  return (
    <>
      <p style={{ fontWeight: 'bold' }}>{title}</p>
      <p>{description}</p>
    </>
  );
};

export default Policy;
