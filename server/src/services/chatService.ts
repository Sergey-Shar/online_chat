import { Socket } from "socket.io";
import Chat, { ChatDocument } from "../models/Chat.js";

export interface ChatData {
	chatId: string
	message: string
}

class ChatService {
	private users: Map<string, Socket>

	constructor() {
		this.users = new Map()
	}
	public userJoin(userId: string, socket: Socket) {
		this.users.set(userId, socket)
		console.log(`User ${userId} registered`)
	}

	public userLeave(userId: string) {
		this.users.delete(userId)
		console.log(`User ${userId} left`)
	}

	public getOnlineUsers() {
		return this.users
	}

	public sendMessage(chatId: string, message: ChatData) {
		this.users.forEach((socket: Socket, userId: string) => {
			if (chatId === userId) {
				socket.emit('chatMessage', message)
			}
		})
	}

	public async createChat(
		id:string,
		nameChat:string,
		participants = []
	): Promise<ChatDocument> {
		return await Chat.create({ creatorId:id, nameChat, participants })
	}

	public async getAllChats(): Promise<ChatDocument[]> {
		return await Chat.find()
	}

	public async getChatById(id: string): Promise<ChatDocument | null> {
		return await Chat.findById(id)
	}
}

export default new ChatService()