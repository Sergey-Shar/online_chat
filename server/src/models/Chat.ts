import { Schema, model, Document } from 'mongoose'

export interface ChatDocument extends Document {
	creatorId: Schema.Types.ObjectId
	nameChat: string
	participants: Schema.Types.ObjectId[]
}

const chatSchema = new Schema<ChatDocument>({
	creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	nameChat: { type: String, required: true, unique: true },
	participants: [{ type:Schema.Types.ObjectId, ref: 'User' }],
})

const Chat = model<ChatDocument>('Chat', chatSchema)

export default Chat
