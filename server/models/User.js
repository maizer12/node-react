import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	fullName:{
		type: String,
		require:true
	},
	email:{
		type: String,
		require:true,
		unique: true
	},
	number:{
		type: Number,
		require:true,
	},
	passwordHash:{
		type: String,
		require:true,
	},
	avatarUrl:String
},{
	timestamps:true
})

export default mongoose.model('User', UserSchema)