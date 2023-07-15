import User, { UserDocument } from "../models/User.js"

class UserService {
	public async createNewUser(
		username: string,
		login: string,
		email: string,
		password: string
	): Promise<UserDocument> {
		const user = await User.create({ username, login, email, password })
		return user
	}

	public async isExistUser(key: string, value: string): Promise<UserDocument | null> {
		const user = await User.findOne({ [key]: value })
		return user
	}

	public async getUserById(id: string): Promise<UserDocument | null> {
		const user = await User.findById(id)
		return user
	}

	public async deleteUser(id: string): Promise<void> {
		await User.findByIdAndDelete(id)
	}
}

export default new UserService()