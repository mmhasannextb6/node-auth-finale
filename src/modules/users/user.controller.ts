import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUserController = async(req:Request, res:Response) => {
  const {name, email} = req.body
  try{
  const result = await userServices.createUserIntoDb(req.body.name, req.body.email)
 
//  console.log(result.rows[0])
  return res.status(200).json({
         success:true,
         message:'data inserted',
        data:result.rows[0]
 })
  }catch(err){
  res.status(200).json({
  success:false,
  message:'data not inserted',
  data:err
 })
}
}

const getUserController = async(req:Request, res:Response)=>{
  try{
    const result = await userServices.getUserFromDb()
    res.status(200).json({
      success:true,
      message:"data gets successfully",
      data:result.rows
    })
  }catch(err:any){
    res.status(500).json({
      success:false,
      message:"data not retrive",
      details:err
    })
  }
}

//get single user
const getSengleUserController =async(req:Request, res:Response)=>{
try{
const result =await userServices.getSingleUserFromDb(req.params.id!)
if(result.rows.length===0){
  throw new Error("user not found")
}else{
  res.status(200).send({
  success:true,
  message:'get single user successfully',
  data:result.rows[0]
})
}
}catch(err){
  res.status(500).json({
      success:false,
      message:"Single data not retrive",
      details:err
    })
}
}

// update user
const updateUserContoller =  async(req:Request, res:Response)=>{
  const {name, email} = req.body
try{
const result = await userServices.updateUserSerciveIntoDB(name,email,req.params.id!)

if(result.rows.length===0){
  throw new Error("user not found")
}else{
  res.status(200).send({
  success:true,
  message:'user updated successfully',
  data:result.rows[0]
})
}
}catch(err){
  res.status(500).json({
      success:false,
      message:"user not found",
      details:err
    })
}
}

const deleteUserContoller= async(req:Request, res:Response)=>{
try{
const result =await userServices.deletUserService(req.params.id!)

if(result.rowCount===0){
  throw new Error("user not found")
}else{
  res.status(200).send({
  success:true,
  message:'user deleted successfully',
  data:result.rows
})
}
}catch(err){
  res.status(500).json({
      success:false,
      message:"user not found",
      details:err
    }
  )
}}


export const userControllers = {
    createUserController,
    getUserController,
    getSengleUserController,
    updateUserContoller,
    deleteUserContoller
}