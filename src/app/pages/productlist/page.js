'use client'
import { useEffect,useState } from "react";
import { useRouter} from "next/navigation";
import "./productlist.css";
export default function Productlist(){
    const router = useRouter()
    const [products, updateProducts] = useState([])    
    useEffect(()=>{
        fetchProducts()
},[])
    const searchData = (e)=>{
        console.log(e.target.value);
        fetch('http://localhost:5500/search/'+e.target.value)
        .then((response) => response.json())
        .then((products) =>{
            updateProducts(products)
            console.log(products)
        })
    }
    const fetchProducts = () =>{
        fetch('http://localhost:5500/productlist')
        .then((response) => response.json())
        .then((products) =>{
            updateProducts(products)
            console.log(products)
        })
    }
        const deleteProduct = async(id)=>{
            const deleteProduct = await fetch('http://localhost:5500/deleteproduct/'+id,
            {
                method: 'DELETE',
            }
            )
            const result = await deleteProduct.json()
            fetchProducts()
            console.log(result)
        }
    return(
        <section>
            <div className="products_container"> 
                <div className="products_wrapper">
                    <div className="products_heading">
                        <h1>Product List</h1>
                    </div>
                    <div className="products_list_container">
                        <div style={{textAlign:"center",paddingBottom:"20px"}}>
                            <input type="text" placeholder="Search Product" className="product_search" onChange={searchData} />
                        </div>
                            <ul>
                                <li>S.NO</li>
                                <li>Name</li>
                                <li>Price</li>
                                <li>Category</li>
                                <li>Company</li>
                                <li>Operation</li>
                            </ul>                             
                            {
                                products.map((product,index) =>{                               
                            return(
                                <>
                            <ul key={11+index}>
                                <li>{index+1}</li>
                                <li>{product.name}</li>
                                <li>{product.price}</li>
                                <li>{product.category}</li>
                                <li>{product.company}</li>
                                <li><button onClick={()=>{deleteProduct(product._id)}}>Delete</button>
                                <button onClick={()=>{router.push(`/pages/updateproduct/${product._id}`)}} style={{marginInline:'5px'}}>Update</button></li>
                            </ul> 
                            </> 
                                )                          
                                })
                            }
                    </div>
                </div>
            </div>
        </section>
    )
}