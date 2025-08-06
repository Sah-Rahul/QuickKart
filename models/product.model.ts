import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    descount: {
      type: String,
      default: 0,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.slug = this.title.toLowerCase().split(" ").join("-");
  next();
});

const productModel = models.Product || model("Product", productSchema);

export default productModel;
