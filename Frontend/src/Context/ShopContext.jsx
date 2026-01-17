import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false)
    const[products,setProducts] = useState([])
    const [cartItmes,setCartItems] = useState({});
    const[token,setToken] = useState("")
    const navigate = useNavigate()

    const addToCart = async(itemId,size)=>{
         if(!size){
          toast.error('Please Select The Product Size');
          return;
         }
        let cartData = structuredClone(cartItmes);

        if(cartData[itemId]){
          if(cartData[itemId][size]){
            cartData[itemId][size] += 1;
          }
          else{
            cartData[itemId][size] = 1;
          }
        }else{
          cartData[itemId] = {};
          cartData[itemId][size] = 1;
        }
       setCartItems(cartData);

       if(token){
        try {
          
          await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
          
        } catch (error) {
           console.log(error)
           toast.error(error.message);
        }
       }
    }

      const getCartCount = ()=>{
        let totalCount = 0;
        for (const itemId in cartItmes) {
          const sizes = cartItmes[itemId];
          for (const size in sizes) {
            const qty = sizes[size];
            if (typeof qty === 'number' && qty > 0) {
              totalCount += qty;
            }
          }
        }
        return totalCount;
      }
      const updateQuanTity = async(itemId,size,quantity)=>{
        let cartData = structuredClone(cartItmes);

        cartData[itemId][size]  = quantity;
        setCartItems(cartData);

        if(token){
          try {
            
            axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})

          } catch (error) {
            console.log(error)
            toast.error(error.message)
          }
        }
    }

    const getCarAmount = ()=>{
       let totalAmount = 0;
       for(const items in cartItmes){
          let itemInfo = products.find((product)=>product._id === items);
          for(const item in cartItmes[items]){
            try {
              if(cartItmes[items][item] > 0){
                  totalAmount += itemInfo.price*cartItmes[items][item]
              }
            } catch (error) {
              console.log(error);
            }
          }
       }
       return totalAmount;
    }

    const getProductsData = async()=>{
         try {
          
         const response = await axios.get(backendUrl + '/api/product/list')
         if(response.data.success){
          setProducts(response.data.products)
         }else{
          toast.error(response.data.message)
         }

         } catch (error) {
             console.log(error)
             toast.error(error.message)
         }
    }

    const getUserCart = async(token)=>{
      try {
        const response = await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
        if(response.data.success){
          setCartItems(response.data.cartData)
        }

      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }
    }

    useEffect(()=>{
      getProductsData();
    },[])

    useEffect(()=>{
    
      if(!token && localStorage.getItem('token')){
           setToken(localStorage.getItem('token'))
           getUserCart(localStorage.getItem('token'))
      }

    },[])

    const value = {
      products,
      currency,
      delivery_fee,
      search,setSearch,
      showSearch,setShowSearch,
      cartItmes,addToCart,
      getCartCount,updateQuanTity,getCarAmount,
      navigate,backendUrl,
      setToken,token,setCartItems
    }

    

    return (
       <ShopContext.Provider value={value}>
         {props.children}
       </ShopContext.Provider> 
    )
}

export default ShopContextProvider;

// // 1:09:03
// 3:33:27
// 4:14:27
// 9:51:35