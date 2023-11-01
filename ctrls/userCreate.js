import bcrypt from 'bcrypt'

export async function userRegister(model, req, res) {
    try{
        const data = req.body
        const user = await model.findOne({username: data.username})
        if(!user) {
            const hashedPassword = await bcrypt.hash(data.password, 10)
            const timeStamp = Date.now()
            const memberSince = new Date(timeStamp)
            const addUser = new model({
                username: data.username,
                password: hashedPassword,
                memberSince: memberSince,
                profilePic: '',
            })
            await addUser.save()
            .then(() => {
                console.log(`New ${data.username} user added!`);
                res.sendStatus(200)
            })
        }
    }catch(error) {
        console.error('COULD NOT CREATE A NEW USER', error)
    }
}