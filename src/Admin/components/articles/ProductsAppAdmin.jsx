import React,{useEffect} from 'react'
import { useDispatch } from "react-redux";
import {getArticles} from "../../../../src/features/articleSlice";
import AfficheAerticleTable from './AfficheAerticleTable';
import Createarticle from './Createarticle';


const ProductsAppAdmin = () => {
const dispatch = useDispatch();
useEffect(() => {
dispatch(getArticles());
},[])

return (
<div className='App'>
      

    
    <Createarticle/>
    <AfficheAerticleTable />
</div>

)
}
export default ProductsAppAdmin