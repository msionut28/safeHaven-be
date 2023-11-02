export async function individualUser(model, req, res){
    const id = req.params.id
    const user = await model.findById(id)
    res.json(user)
}