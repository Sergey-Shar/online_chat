import { Request, Response } from 'express'
import chatService from '../../services/chatService.js'

class AllChatController {
	public async get(_: Request, res: Response): Promise<void> {
		try {
   const chats = await chatService.getAllChats()
			res.status(200).json({ chats })
		} catch (error) {
			console.error('Getting chats error:', error)
			res.status(500).json({ error: 'Failed to get chats' })
		}
	}
}

export default new AllChatController()
