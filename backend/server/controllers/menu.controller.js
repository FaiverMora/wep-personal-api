const Menu = require ("../models/menu.model")

async function createMenu(req,res){
    const menu= new Menu (req.body)

    menu.save((error, menuStored)=>{
        if(error){
            res.status(400).send({msg:"Error al crear el menu"})
        } else{
            res.status(200).send(menuStored)
        }
    })
}
async function getMenus(req,res){
    const { active } = req.query
    
let response = null

if (active === undefined){
    response = await Menu.find()
} else{
    response = await Menu.find({active})
}
if(!response){
    res.status(400).send({msg:"No se ha encpntrado ningun menu"})
}else{
    res.status(200).send(response)
}

}
module.exports = {
 createMenu,
 getMenus,
}