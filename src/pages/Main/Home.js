import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrands } from "../../feature/filter/filterSlice";
import { getProducts } from "../../feature/products/productsSlice";


const Home = () => {
  const filter =useSelector(state => state.filter);
  const {products,isLoading} =useSelector(state => state.products);
  const {brands,stock}=filter
const dispatch =useDispatch();

  useEffect(() => {
    // fetch("http://localhost:5001/products")
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data.data));
    dispatch(getProducts())
  }, []);

  const activeClass = "text-white  bg-indigo-500 border-white";
let content;
if(isLoading){
  content = <h1>Loading.....</h1>
}
if(products.length){
  content = products.map(product => (<ProductCard key={product.model} product={product}></ProductCard>))
}
if(products.length && (filter.stock || filter.brands.length)){
  content =products.filter((product)=>{
    if(stock){
      return product.status === true;
    }
    return product;
  })
  .filter((product)=>{
    if(filter.brands.length){
      return filter.brands.includes(product.brand)
    }
    return product;
  })
  .map((product)=> <ProductCard key={product.model} product={product}></ProductCard>)
}
  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${activeClass} `}
          onClick={()=> dispatch(toggle())}
          >
          In Stock
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold`} onClick={()=> dispatch(toggleBrands("amd"))}>
          AMD
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold`} onClick={()=> dispatch(toggleBrands("intel"))}>
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {/* {products.map((product) => (
          <ProductCard key={product.model} product={product} />
        ))} */}
        {content}
      </div>
    </div>
  );
};

export default Home;
