import axios from "../../utils/axios.config";


export const fetchProducts =async ()=>{
    const data = await axios.get("/products");
    console.log('api',data.data.data)
    return data.data.data
}


export const postProduct = async(productData)=>{
    console.log(productData)
    await axios.post("/product", productData)
}