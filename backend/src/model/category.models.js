import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        slug:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
            trim:true
        },
        image:{
            type:String //we will pass the url after uploading to cloudinary
        }
    },
    {
        timestamps:true
    }
)

export const Category = mongoose.model("Category",categorySchema)