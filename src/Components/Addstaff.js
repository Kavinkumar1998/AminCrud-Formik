import React from 'react'
import Base from '../Base/Base'
import  { useState }  from 'react'
import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'


export const studentValidationSchema = yup.object({
  Name : yup.string().required("Please fill in your Name..."),
  Age : yup.string().required("please fill in your Age"),
  Gender : yup.string().required("please mention your Gender"),
  Place : yup.string().required("please mention your Place"),
 Qualification : yup.string().required("Please fill in your Qualification"),
})


const Addstaff = ({staff,setStaff}) => {

 const history = useHistory();

 
 const {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
  initialValues : {
    Name : "",
    Age :"",
    Gender:"",
    Place:"",
    Qualification:"",
  },
  validationSchema : studentValidationSchema,
  onSubmit : (newStaffs) => {
    adddata(newStaffs);
  }
})


           //function for adding 
           const adddata = async (newStaffs)=>{
        
                  try{
                
                          const response = await fetch("https://63b1d5505e490925c50f5e91.mockapi.io/Staffs",{
                            method:"POST",
                            body : JSON.stringify(newStaffs),
                            headers: {
                             "Content-Type":"application/json"
                            },
                           });
            
                          const Sdata = await response.json()
                          console.log(Sdata);
                           
                         setStaff([...staff,Sdata])
                      
                           history.push("/Staffdashboard")
                        
                  
                  }
                  catch(error){
                console.log(error);
                  }
            
              };
   


              return (
                <Base title="Add Students Data Here"
                description="You can Add a New Student Data" >
              <div className="input">
                               <form onSubmit={handleSubmit}>
                               <TextField
                           fullWidth label="Enter the Name" 
                           id="fullWidth" onChange={handleChange} 
                           value={values.Name} 
                            name="Name"
                            onBlur= {handleBlur}
                            />
                              {touched.Name && errors.Name ? <p style={{color:"red"}}> {errors.Name} </p>: ""}
              
                          <TextField
                           fullWidth label="Enter the Age"
                            id="fullWidth"
                             onChange={handleChange}
                              value={values.Age}
                               name="Age" 
                               onBlur= {handleBlur}
                               />
                                {touched.Age && errors.Age ? <p style={{color:"red"}}> {errors.Age} </p>: ""}
              
                          <TextField
                           fullWidth label="Enter the Gender"
                            id="fullWidth"
                             onChange={handleChange}
                              value={values.Gender}
                               name="Gender"
                               onBlur= {handleBlur}
                               />
                                {touched.Gender && errors.Gender ? <p style={{color:"red"}}> {errors.Gender} </p>: ""}
              
                          <TextField
                           fullWidth label="Enter the Place"
                            id="fullWidth" 
                            onChange={handleChange}
                             value={values.Place}
                              name="Place"
                              onBlur= {handleBlur}
                               />
                                {touched.Place && errors.Place ? <p style={{color:"red"}}> {errors.Place} </p>: ""}
              
                          <TextField 
                          fullWidth label="Enter the Qualification"
                           id="fullWidth"
                            onChange={handleChange} 
                            value={values.Qualification} 
                            name="Qualification"
                            onBlur= {handleBlur}
                             />
                              {touched.Qualification && errors.Qualification? <p style={{color:"red"}}> {errors.Qualification} </p>: ""}
              
                            <Button className="add-btn" type="submit" variant="contained" color="success">ADD</Button>
                      
                               </form>
                          </div>
                </Base>
                )
}

export default Addstaff
