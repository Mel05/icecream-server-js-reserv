import mongoose from 'mongoose'

const IcecreamSchema = new mongoose.Schema(
	{
		id: { type: String },
		title: { type: String },
		price: Number,
		imageUrl: { type: String },
		sizes: [Number],
		types: [Number],
		rating: Number,
		category: Number,
		count: Number,
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Icecream', IcecreamSchema)
