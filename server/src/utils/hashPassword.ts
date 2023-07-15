import bcrypt from 'bcryptjs'
export async function  createHashPassword(password: string) {
	return bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hash: string) {
	return bcrypt.compare(password, hash)
}


