import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import Token from '../models/Token.js'
import { Types } from 'mongoose'

class TokenService {
	jwtPrivateKey: string = process.env.JWT_PRIVATE_KEY as string
	jwtPrivateKeyRefresh: string = process.env.JWT_PRIVATE_REFRESH_KEY as string

	public generateNewToken({ _id }: { _id: Types.ObjectId }) {
		const accessToken = jwt.sign({ _id }, this.jwtPrivateKey, { expiresIn: '1h' })
		const refreshToken = jwt.sign({ _id }, this.jwtPrivateKeyRefresh)
		return {
			accessToken,
			refreshToken,
			expiresIn: 3600
		}
	}
	public async saveToken(userId: Types.ObjectId, refreshToken: string) {
		const userToken = await Token.findOne({ userId })
		if (userToken) {
			userToken.refreshToken = refreshToken
			return userToken.save()
		}
		const token = Token.create({ userId, refreshToken })
		return token
	}

	public isValidRefreshToken(refreshToken: string) {
		try {
			const token = jwt.verify(refreshToken, this.jwtPrivateKeyRefresh)
			return token
		} catch (error) {
			console.log(error)
			return null
		}
	}
	public isValidReAccessToken(accessToken: string) {
		try {
			const token = jwt.verify(accessToken, this.jwtPrivateKey)
			return token
		} catch (error) {
			console.log(error)
			return null
		}
	}

	public findRefreshToken(refreshToken: string) {
		try {
			const token = Token.findOne({ refreshToken })
			return token
		} catch (error) {
			console.log(error)
			return null
		}
	}

	public async removeRefreshToken(refreshToken: string) {
			await Token.findOneAndDelete({ refreshToken })
	}
}

export default new TokenService()
