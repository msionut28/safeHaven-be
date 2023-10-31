export async function authenticateChat (req, res){
    const { username } = req.body;
    try {
        const response = await fetch('https://api.chatengine.io/users/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'PRIVATE-KEY': process.env.CHAT_ENGINE_PRIVATE_KEY
            },
            body: JSON.stringify({
                username: username,
                secret: username,
                first_name: username
            })
        });
        
        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (e) {
        return res.status(e.status || 500).json(e);
    }
}

export async function chatLogin(req, res){
    const { username, secret } = req.body;

    try {
        const response = await fetch("https://api.chatengine.io/users/me/", {
            method: 'GET',
            headers: {
                "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
                "User-Name": username,
                "User-Secret": secret,
            }
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (e) {
        return res.status(e.status || 500).json(e);
    }
}