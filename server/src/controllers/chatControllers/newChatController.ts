import { Request, Response } from 'express'
import chatService from '../../services/chatService.js'

class NewChatController {
	public async create(req: Request, res: Response): Promise<void> {
		try {
			const { nameChat } = req.body
			//@ts-ignore
			const userId = req?.userId
   
		 
   const newChat = await chatService.createChat(
				userId,
				nameChat
			)
			res.status(201).json({ message: 'Chat created successfully', chat: newChat })
		} catch (error) {
			console.error('Chat creation error:', error)
			res.status(500).json({ error: 'Failed to create chat' })
		}
	}
}

export default new NewChatController()
