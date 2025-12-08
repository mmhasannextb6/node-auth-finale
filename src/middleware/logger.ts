import { NextFunction, Request, Response } from "express"
import path from 'path'
//logger
export const logger = (req:Request, res:Response, next:NextFunction)=>{
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
}