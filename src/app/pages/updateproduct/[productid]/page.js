"use client";
import { useState, useEffect } from "react";
import { useParams} from "next/navigation";
import "../../signup/signup.css";
export default function AddProduct() {
  const [userData, setData] = useState({});
  const [product,setproduct]= useState({
    name:'',
    price:'',
    category:'',
    company:''
  })
  const params = useParams()
  useEffect(()=>{   
    fetch("http://localhost:5500/product/"+params.productid)
    .then((response)=> response.json())
    .then((response)=>{
        console.log(response)
        setproduct(response)
    })
},[])
  const getData = (data) => {
    setData({
      ...userData,
      [data.target.name]: data.target.value,
    });
    setproduct({
        ...product,
        [data.target.name]: data.target.value,
    })
  };
 
  const updateData = async (e) => {
    e.preventDefault();
    console.log(product);
    let result = await fetch("http://localhost:5500/updateproduct/"+params.productid, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    console.log(response);
}
  return (  
    <section className="signup_section">
      <div className="signup-container">
        <h2>Update Product</h2>
        <form>
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Product Name"
              value={product.name}
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
              value={product.price}
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
              value={product.category}
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
              value={product.company}
              placeholder="Company"
              required
              onChange={getData}
            />
          </div>

          <button  onClick={updateData} className="btn-signup">
            Update
          </button>
        </form>
      </div>
    </section>
   
);
}
