import dotenv from "dotenv"
dotenv.config()
import { app } from "./app.js";
import connectDB from "./db/db.js";


connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server started at Port ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log("MongoDB connection error",err)
})