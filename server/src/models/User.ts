import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
	username: string
	email: string
	password: string
}

const userSchema = new Schema<UserDocument>({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
})

const User = model<UserDocument>('User', userSchema);

export default User;
