import React,{useEffect} from 'react'
import { useDispatch } from "react-redux";
import {getArticles} from "../../../features/articleSlice";
import AfficheAerticleTable from './AfficheAerticleTable';
import Createarticle from './Createarticle';

const ProductsAppAdmin = () => {
const dispatch = useDispatch();
useEffect(() => {
dispatch(getArticles());
},[])

return (
    <div>
    
    <Createarticle/>
<AfficheAerticleTable />
</div>
)
}
export default ProductsAppAdmin