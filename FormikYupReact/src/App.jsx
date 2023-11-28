import { useFormik } from "formik"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { addProductSchema } from "./validation/addProductVal";




function App() {
  let [categories,setCategories]=useState([])
  axios("https://northwind.vercel.app/api/categories")
  .then(res=>{
    setCategories(res.data)
  })
  const formik = useFormik({
    initialValues:{
      name:"",
      unitPrice:"",
      unitInStock:"",
      categoryId:"",
      quantity:"",
      isDiscount:false
  },
  onSubmit: (values,actions) => {
    axios.post("https://northwind.vercel.app/api/products",values)
    actions.resetForm()
    toast.success('Product added!')
    // console.log(JSON.stringify(values, null, 2));
  },
  validationSchema: addProductSchema,
  })
  return (
    <>
    <div><Toaster/></div>
    <div style={{width:"30%",margin:"100px auto",borderRadius:"5px",padding:"34px",boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
      <h2 style={{textAlign:"center",margin:"20px 0"}}>Product Add Form</h2>
      <div style={{textAlign:"center",margin:"0 0 10px"}}>
        <a style={{color:"black"}} href="https://northwind.vercel.app/api/products" target="blank">API link to check</a>
      </div>
      <form style={{display:"flex",justifyContent:"center",flexDirection:"column"}} onSubmit={formik.handleSubmit}>
        <FormControl sx={{width:"70%",margin:"20px auto"}}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="categoryId"
            value={formik.values.categoryId}
            label="Category"
            onChange={formik.handleChange}
          >
            {categories.map((item,idx)=><MenuItem key={idx} value={item.id}>{item.name}</MenuItem>)}
          </Select>
        </FormControl>
          {/* {formik.errors.categoryId && formik.touched.categoryId && <div style={{color:"red"}}>{formik.errors.categoryId}</div> } */}
        <div style={{display:"flex", justifyContent:"space-between",margin:"20px 0"}}>
          <div style={{width:"45%"}}>
            <TextField onBlur={formik.handleBlur} name="name" id="outlined-basic" onChange={formik.handleChange} value={formik.values.name} label="Name" variant="outlined" />
            {formik.errors.name && formik.touched.name && <div style={{color:"red"}}>{formik.errors.name}</div> }
          </div>
          <div style={{width:"45%"}}>
            <TextField onBlur={formik.handleBlur} name="unitInStock" id="outlined-basic" onChange={formik.handleChange} value={formik.values.unitInStock} type="number" label="Unit in Stock" variant="outlined" />
            {formik.errors.unitInStock && formik.touched.unitInStock && <div style={{color:"red"}}>{formik.errors.unitInStock}</div> }
          </div>
        </div>
        <div style={{display:"flex", justifyContent:"space-between",margin:"20px 0"}}>
          <div style={{width:"45%"}}>
            <TextField onBlur={formik.handleBlur} name="unitPrice" id="outlined-basic" onChange={formik.handleChange} value={formik.values.unitPrice} type="number" label="Unit price" variant="outlined" />  
            {formik.errors.unitPrice && formik.touched.unitPrice && <div style={{color:"red"}}>{formik.errors.unitPrice}</div> }

          </div>
          <FormControlLabel control={<Checkbox name="isDiscount" onChange={formik.handleChange} checked={formik.values.isDiscount?"checked":false} color="success" />} label="Is Discount" />
        </div>
        <div style={{width:"60%",margin:"20px auto"}}>
            <TextField onBlur={formik.handleBlur} name="quantity" id="outlined-basic" onChange={formik.handleChange} value={formik.values.quantity} label="Quantity per Unit" type="number" variant="outlined" />
            {formik.errors.quantity && formik.touched.quantity && <div style={{color:"red"}}>{formik.errors.quantity}</div> }
          </div>
        <Button type="submit" disabled={(Object.keys(formik.errors).length>0 || formik.isSubmitting)?"disables":false}  variant="contained" color="success">Success</Button>
      </form>
    </div>
    </>
  )
}

export default App
