import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product", // Assuming your model for products is named "Product"
      },
    ],
    payment: {
      method: {
        type: String,
        default: "COD", // Default to Cash on Delivery
      },
      // Add more payment details as needed
    },
    buyerEmail: {
      type: String,
      ref: "User", // Assuming your model for users is named "User"
    },
    buyerName: {
      type: String,
      ref: "User", // Assuming your model for users is named "User"
    },
    buyerPhone: {
      type: String,
      ref: "User", // Assuming your model for users is named "User"
    },
    buyerAddress: {
      type: String,
      ref: "User", // Assuming your model for users is named "User"
    },
    amount: {
      type: Number,
      required: true,
    },
    deliveryType: {
      type: String,
      enum: ["Normal", "Fast", "Express"],
      default: "Normal",
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ], // Corrected spelling and capitalization
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
