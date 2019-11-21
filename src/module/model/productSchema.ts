import { model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productId: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true },
    industry: { type: String, required: true, index: true, unique: true },
    price: { type: String, required: true },
    date_added: { type: Date, default: Date.now },
    date_update: { type: Date, default: Date.now },
  },
  {
    strict: true,
    collection: "products"
  }
);

ProductSchema.pre("save", next => {
  const now = new Date();
  if (!this.date_added) {
    this.date_added = now;
  }
  this.date_update = now;
  next();
});

export const productModel = model("products", ProductSchema, "products");
