import { Schema, model } from "mongoose";


const userSchema = new Schema({
    aud: { type: String, require: true },
    azp: { type: String, require: true },
    email: { type: String, require: true, },
    email_verified: Boolean,
    exp: Number,
    family_name: { type: String, require: true },
    given_name: { type: String, require: true },
    iat: Number,
    iss: { type: String, require: true },
    jti: String,
    locale: String,
    name: { type: String, require: true },
    nbf: Number,
    picture: { type: String },
    sub: String
}, { timestamps: true })


export const Users = model('Users', userSchema);