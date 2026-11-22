import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true
        },
        avatar:{
            type:String,
            required:true
        },
        coverImage:{
            type:String
        },
        role:{
            type:String,
            enum:["admin","user"],
            default:"user"
        },
        isActive:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }
)

export const User = mongoose.model("User",userSchema)