import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        slug:{
            type:String
        },
        description:{
            type:String,
            required:true
        },
        image:{
            type:String //we will pass the url after uploading to cloudinary
        }
    },
    {
        timestamps:true
    }
)

export const Category = mongoose.model(categorySchema,"Category")