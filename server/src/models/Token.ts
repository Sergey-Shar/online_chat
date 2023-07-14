import { Schema, model, Document } from 'mongoose'

interface TokenDocuments extends Document {
 userId: Schema.Types.ObjectId;
 refreshToken: string;
}

const tokenSchema = new Schema<TokenDocuments>({
 userId: { type: Schema.Types.ObjectId, ref: 'User' },
 refreshToken: { type: String, required: true },
}, {
  timestamps: true
}
)

const Token = model<TokenDocuments>('Token', tokenSchema)

export default Token


