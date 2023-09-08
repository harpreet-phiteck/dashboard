"use client";
import { useState } from "react";
import "../signup/signup.css";
export default function AddProduct() {
  const [userData, setData] = useState({userid:JSON.parse(localStorage.getItem('user'))._id});
  const getData = (data) => {
    setData({
      ...userData,
      [data.target.name]: data.target.value,
    });
  };
  const collectData = async (e) => {
    const isObjectEmpty = (obj) => {
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            return true;
          }
        }
        return false;
      };
    if(isObjectEmpty(userData)){
      
    e.preventDefault();
    let result = await fetch("http://localhost:5500/addproducts", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    const response = await result.json();
    console.log(response);
}
  };
  return (
    <section className="signup_section">
      <div className="signup-container">
        <h2>Add Product</h2>
        <form>
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Product Name"
              required
              onChange={getData}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Price:</label>
            <input
              type="text"
              id="name"
              name="price"
              placeholder="Price"
              required
              onChange={getData}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Category:</label>
            <input
              type="text"
              id="name"
              name="category"
              placeholder="Category"
              required
              onChange={getData}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Company:</label>
            <input
              type="text"
              id="name"
              name="company"
              placeholder="Company"
              required
              onChange={getData}
            />
          </div>

          <button type="submit" onClick={collectData} className="btn-signup">
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
}
