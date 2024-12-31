import { useCallback, useState } from "react";
import { useRouter } from "next/router"
   
export const useMutation = () => {
 const [data, setData] = useState({
  data: null,
  isLoading: true,
  isError: false,
 }); 

const router = useRouter();
const mutate = useCallback(
 async ({ url ="", method ="POST", payload = {} } = {}) => {
//   setData({ 
//     ...data, 
//     isLoading: true 
//   });
  try {
   const response = await fetch(url, { 
    method, 
    headers: {
    "content-type":"application/json", 
    }, 
    body : JSON.stringify(payload),
    });
   const result = await response.json();
   
   setData({
    ...data,
    data: result,
    isLoading: false,
   });

   router.push("/notes");

   return { ...result};
   

  } catch (error) {
   setData({
    ...data,
    isError: true,
    isLoading: false,
   });
   return error;
  }
}, []);

  
   
return { ...data, mutate };
};