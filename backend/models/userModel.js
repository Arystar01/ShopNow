import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    isAdmin:{type:Boolean, default:false},
    isBlocked:{type:Boolean, default:false},
    address:{type:Object, default:{}},
    phone:{type:String, default:''},
    wishlist:{type:Array, default:[]},
    orders:{type:Array, default:[]},
    profilePicture:{type:String, default:''},
    cartData:{type:Object, default:{}},
},{minimize:false})

const userModel= mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;