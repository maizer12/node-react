import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	mail: {
		type: String,
		required: true,
		unique: true,
	},
	massive: {
		type: Array,
		default: [{time:'00:00', task:'купить молоко'}],
	},
})

export default mongoose.model('Posts', PostSchema)
