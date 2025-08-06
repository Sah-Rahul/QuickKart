import {Schema, model, models} from 'mongoose';


const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }    
}, { timestamps: true});

const userModel = models.User || model('User', userSchema);



export default userModel