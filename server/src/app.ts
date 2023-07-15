import express, { Express } from 'express';
import { createServer } from 'http'
import config from 'config';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { Server, Socket,  } from 'socket.io'
import routes from './routes/index.js'
import chatService, { ChatData } from './services/chatService.js';
dotenv.config()

class ChatApp {
	private port: number
	private app: Express
	private server: any
	private io: Server
	private chatService: typeof chatService

	constructor(port: number) {
		this.port = port
		this.app = express()
		this.server = createServer(this.app)
		this.io = new Server(this.server)
		this.chatService = chatService
	}

	private initializeMiddleware(): void {
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: false }))
	}

	private initializeRoutes(): void {
		this.app.use('/api/v1', routes)
	}

	private initializeSocket(): void {
		this.io.on('connection', (socket:Socket) => {
			console.log('User connected')

			socket.on('join', (userId: string) => {
				this.chatService.userJoin(userId, socket)
			})

			socket.on('sendMessage', (data: ChatData) => {
				const { chatId, message } = data
				this.chatService.sendMessage(chatId, { chatId, message })
			})

      socket.on('disconnect', () => {
        const disconnectedUserId = this.getUserIdBySocket(socket)
        if (disconnectedUserId) {
        this.chatService.userLeave(disconnectedUserId)
        }
      })
		})
	}

	private getUserIdBySocket(socket:Socket): string | undefined {
		const userId = [...this.chatService.getOnlineUsers().entries()].find(
			([_, userSocket]) => userSocket === socket
		)?.[0]
		return userId
	}

	public async start(): Promise<void> {
		try {
			await mongoose.connect(process.env.MONGO_URI as string)
			this.initializeMiddleware()
			this.initializeRoutes()

			this.app.listen(this.port, (): void => {
				console.log(`Server is running on port ${this.port}`)
			})

			// this.initializeSocket()
		} catch (error) {
			console.error(error)
			process.exit(1)
		}
	}
}

const PORT: number = config.get('port') ?? 8080;
const chatApp  = new ChatApp(PORT)
chatApp.start()
