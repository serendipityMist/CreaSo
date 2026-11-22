import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        slug:{
            type:String,
            trim:true,
            required:true
        },
        description:{
            type:String,
            required:true,
            trim:true
        },
        categoryId:{
            ref:"Category",
            type:mongoose.Schema.Types.ObjectId
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        thumbnail:{
            type:String,
            required:true
        },
        previewImages:{
            type:[String],
            required:true
        },
        viewCount:{
            type:Number,
            default:0
        }
    },
    {
        timestamps:true
    }
)

export const Asset = mongoose.model("Asset",assetSchema)