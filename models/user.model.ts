import bcrypt from "bcrypt"
import mongoose, { model, models } from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true 
});

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password.toString(), 12)
    next()
})
const userModel =  models.User || model("User", userSchema);

export default userModel;
