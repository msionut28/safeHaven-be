import bcrypt from 'bcrypt'

export async function loginFunction(req, res, model) {
    const {username, password} = req.body
    const user = await model.findOne({username: username})
    if (!user) {
        console.log('USER NOT FOUND!');
        return res.status(401).json({ message: 'User not found!' })
    }
    const passwordCheck = await bcrypt.compare(password, user.password)
    if (!passwordCheck) {
        console.log('PASSWORD DOES NOT MATCH!');
        return res.status(401).json({ message: 'Password does not match!' })
    }else{ 
        const userData = {
            id: user._id,
            username: user.username,
            profilePic: user.profilePic,
            memberSince: user.memberSince
        }
        console.log('LOGGED IN');
        return res.status(200).json({
            message: 'LOGGED IN',
            userData: userData
        })
    }
}