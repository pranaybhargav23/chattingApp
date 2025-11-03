import mongoose, { Schema, Document } from "mongoose";

const UserSchema = new Schema({
    username:{ type: String, required: true, unique: true  },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const userModal = mongoose.model("User", UserSchema);

export default userModal;
