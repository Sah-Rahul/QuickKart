import mongoose, { model, models } from "mongoose";

const productSchema = new mongoose.Schema(
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
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  this.slug = this.title.toLocaleLowerCase().split(" ").join("-");
  next();
});

const productModel = models.Product || model("Product", productSchema);

export default productModel;
