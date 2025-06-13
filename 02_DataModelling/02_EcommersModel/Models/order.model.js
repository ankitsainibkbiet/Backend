import mongoose from "mongoose";

const orderItemsSchema = mongoose.Schema({
    ProductId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        reqiured: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    address: {
        type: String,
        reqiured: true
    },
    status: {
        type: String,
        enum: ["PENDIND", "CANCELLED", "DELIVERED"],
        default: "PENDING"
    },
    orderItems: [orderItemsSchema]
}, {timestamps: true})

export const Order = mongoose.model("Order", orderSchema)