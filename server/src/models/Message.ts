import { Schema, model, Document } from 'mongoose'

export interface MessageDocument extends Document {
	chat: Schema.Types.ObjectId
	sender: Schema.Types.ObjectId
	content: string
}

const messageSchema = new Schema<MessageDocument>({
	chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
	sender: { type: Schema.Types.ObjectId, ref: 'User' },
	content: { type: String, required: true }
})

const Message = model<MessageDocument>('Message', messageSchema)

export default Message
