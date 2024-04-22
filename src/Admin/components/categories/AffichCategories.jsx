import React, { useEffect, useMemo, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { deleteCategorie, fetchCategories } from '../../../services/CategorieService'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { Box } from '@mui/material'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';

const AffichCategories = () => {
const [showModal,setShowModal] = useState(false)
const [categories,setCategories] = useState([])
const [selectedItem,setSelectedItem] = useState(null)
const dispatch = useDispatch()
useEffect(()=>{
  getCategories()
},[])
const getCategories = async () => {
  await fetchCategories().then(res=>setCategories(res.data)).catch(error=>console.log(error))
}
const handleClose= () => {
    setShowModal(false);
    setSelectedItem(null);
    }

const handleDelete = async(catid,nomcat)=>{
    confirmAlert({
      title:'Confirmer...',
      message:"supprimer la categorie "+nomcat,
      buttons:[{
        label:'Oui',
        onClick:async()=>deleteCategorie(catid).then(res => setCategories(categories.filter((categories)=>categories._id !== catid)))
        
        
  
        
      },
    {
      label:'Non',
    }
    ]
    })}
        
    const columns = useMemo(
      () => [
        {
          accessorKey: 'imagecategorie', //access nested data with dot notation
          header: 'Image',
          size: 10,
          Cell:({cell})=>(
          <Box>
            <img src={cell.getValue()} alt="" height={200}width={200} />
          </Box>)
        },
        {
          accessorKey: 'nomcategorie',
          header: 'Nom',
          size: 150,
        },{
          accessorKey: 'nomcategorie',
          header: 'Actions',
          Cell:({cell,row})=>(<div>
            <Button variant="info"><i class='fa-regular fa-eye'></i></Button>
            <Button variant="warning"><i class='fa-regular fa-edit'></i></Button>
            <Button variant="danger" onClick={()=>handleDelete(cell.row.original._id,cell.row.original.nomcategorie,)} ><i class="fa-regular fa-trash-can"></i></Button>
          </div>)
          
        },
       
      ],
      [categories],
    );
    
    const table = useMaterialReactTable({
      columns,
      data:categories, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });
    
    return (
      <div>

        
    <MaterialReactTable table={table} /></div>)
  };


  {/* {showModal && (
  <EditArticle
  show={showModal}
  handleClose={handleClose}
  art={selectedItem}
  />
  )} */}


export default AffichCategories
