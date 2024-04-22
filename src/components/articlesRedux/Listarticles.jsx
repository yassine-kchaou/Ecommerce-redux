import React, { useEffect,useCallback } from "react";
import { useDispatch } from "react-redux";
import {getArticles} from "../../features/articleSlice";
import AfficheArticles from "./AfficheArticles";
import Menus from "../../Admin/Menu";
import NavScroll from "../NavScrolls";
const Listarticles = () => {

const dispatch = useDispatch();
const initFetch = useCallback(() => {
dispatch(getArticles());
}, [dispatch])
useEffect(() => {
initFetch()
}, [initFetch])

return (
<div>
<NavScroll/>
<AfficheArticles/>

</div>
)

}
export default Listarticles