import express, { Response,Request, NextFunction } from 'express'
import { config } from './config'
import { initDB, pool } from './config/db'
import { logger } from './middleware/logger'
import { userRouter } from './modules/users/user.router'
const app = express()



app.use(express.json())
initDB()

//intial api
app.get('/',logger, (req:Request, res:Response) => {
  res.send('Hello World!')
})


app.use('/',userRouter )



// //update
// app.put("/users/:id", async(req:Request, res:Response)=>{
//   const {name, email} = req.body
// try{
// const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3  RETURNING *`,
// [name, email, req.params.id])

// if(result.rows.length===0){
//   throw new Error("user not found")
// }else{
//   res.status(200).send({
//   success:true,
//   message:'user updated successfully',
//   data:result.rows[0]
// })
// }
// }catch(err){
//   res.status(500).json({
//       success:false,
//       message:"user not found",
//       details:err
//     })
// }
// })


//delet
// app.delete("/users/:id", async(req:Request, res:Response)=>{
// try{
// const result = await pool.query(`DELETE FROM users WHERE id=$1`,
// [req.params.id])

// if(result.rowCount===0){
//   throw new Error("user not found")
// }else{
//   res.status(200).send({
//   success:true,
//   message:'user deleted successfully',
//   data:result.rows
// })
// }
// }catch(err){
//   res.status(500).json({
//       success:false,
//       message:"user not found",
//       details:err
//     })
// }
// })

//todos curd
//create
app.post("/todos", async(req:Request, res:Response)=>{
  const {user_id, title} = req.body
  try{
    const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]

    );
      res.status(200).json({
      success:true,
      message:"todo created",
      data:result.rows[0]
    })
  }catch(err){
    res.status(500).json({
      success:false,
      message:"todo not created",
      err_msg: err instanceof Error ? err.message : "Unknown error"
  })
  }
})

//get todos
app.get("/todos", async(req:Request, res:Response)=>{
  try{
    const result = await pool.query(`SELECT * FROM todos`)
    res.status(200).json({
      success:true,
      message:"data gets from successfully",
      data:result.rows
    })
  }catch(err:any){
    res.status(500).json({
      success:false,
      message:"todos not retrive",
      details:err
    })
  }
})

//get single todos
app.get("/todos/:id", async(req:Request, res:Response)=>{
try{
const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [req.params.id])
if(result.rows.length===0){
  throw new Error("user not found")
}else{
  res.status(200).send({
  success:true,
  message:'get single todos successfully',
  data:result.rows[0]
})
}
}catch(err){
  res.status(500).json({
      success:false,
      message:"Single todos not retrive",
      details:err
    })
}
})


// update todos
//update
app.put("/todos/:id", async(req:Request, res:Response)=>{
  const {title} = req.body
try{
const result = await pool.query(`UPDATE todos SET title=$1 WHERE id=$2  RETURNING *`,
[title, req.params.id])

if(result.rows.length===0){
  throw new Error("todos not found")
}else{
  res.status(200).send({
  success:true,
  message:'todos updated successfully',
  data:result.rows[0]
})
}
}catch(err){
  res.status(500).json({
      success:false,
      message:"todos not found",
      details:err
    })
}
})


//delet
app.delete("/todos/:id", async(req:Request, res:Response)=>{
try{
const result = await pool.query(`DELETE FROM todos WHERE id=$1`,
[req.params.id])

if(result.rowCount===0){
  throw new Error("todos not found")
}else{
  res.status(200).send({
  success:true,
  message:'todos deleted successfully',
  data:result.rows
})
}
}catch(err){
  res.status(500).json({
      success:false,
      message:"todos not found",
      details:err
    })
}
})











//not found
app.use((req:Request, res:Response)=>{
  res.status(404).json({
    success:false, 
    message:"Route not found",
    path:req.path
  })
})
app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})
