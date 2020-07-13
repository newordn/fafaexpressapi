const bcrypt = require('bcryptjs')
const {sendMail} = require('../helpers/mail')
async function signIn(parent,args,context,info)
{
    console.log('user signIn mutation')
    let user =  await context.prisma.user({phone:args.phone})
    if(!user){
        user =  await context.prisma.user({email:args.phone})
        if(!user){
        throw new Error("L'utilisateur n'existe pas. Inscrivez-vous")
        }
    }
    const valid = await bcrypt.compare(args.password,user.password)
    if(!valid){
        throw new Error('Mot de passe incorrect')
    }
   
    return user

}
const signUp = async (parent,args,context,info)=>{
    console.log('signUp mutation')
    const password = await bcrypt.hash(args.password,10)
    const user = await context.prisma.createUser({...args,password})
    await sendMail(user.email,"FafaExpress",`Inscription Reussite. Bienvenu dans FafaExpress, faites vous livrez en un laps de temps.`)
    return user
}
const plat = async (parent,args,context,info)=>{
    console.log('plat mutation')
    const illustration =  await context.storeUpload(args.illustration)
    const plat = await context.prisma.createPlat({...args,illustration:illustration.path})
    return plat
}
const house = async (parent,args,context,info)=>{
    console.log('house mutation')
    const illustration =  await context.storeUpload(args.illustration)
    const house = await context.prisma.createHouse({...args,illustration:illustration.path})
    return house
}
const steed = async (parent,args,context,info)=>{
    console.log('steed mutation')
    const steed = await context.prisma.createSteed({...args,user:{connect:{id:args.user}},ordered:true})
    return steed
}
const product = async (parent,args,context,info)=>{
    console.log('product mutation')
    const illustration =  await context.storeUpload(args.illustration)
    const product = await context.prisma.createProduct({...args,illustration:illustration.path})
    return product
}
const orderPlate = async (parent,args,context,info)=>{
    console.log('order a plate mutation')
    const usersOnPlates = await context.prisma.createUsersOnPlates({...args,ordered:true,user:{connect:{id:args.user}},plat:{connect:{id:args.plat}}})
    return usersOnPlates
}
const orderHouse = async (parent,args,context,info)=>{
    console.log('order a house mutation')
    const usersOnHouses = await context.prisma.createUsersOnHouses({...args,ordered:true,user:{connect:{id:args.user}},house:{connect:{id:args.house}}})
    return usersOnHouses
}
const orderProduct = async (parent,args,context,info)=>{
    console.log('order a product mutation')
    const usersOnProducts = await context.prisma.createUsersOnProducts({...args,ordered:true,user:{connect:{id:args.user}},product:{connect:{id:args.product}}})
    return usersOnProducts
}
module.exports={
    signIn,
    signUp,
    plat,
    house,
    steed,
    product,
    orderPlate,
    orderHouse,
    orderProduct
}