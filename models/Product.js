import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keyPoints: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;


