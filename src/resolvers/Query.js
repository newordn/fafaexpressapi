const info = ()=> `Welcome on Fafa Api`
const steedsByUser = async (parent,args,context,info)=>{
    console.log('steeds by user query')
    const steeds = await context.prisma.user({id:args.user}).steeds({orderBy:'id_DESC'})
    return steeds
}
const users = async (parent,args,context,info)=>{
    console.log('users query')
    const users = await context.prisma.users({orderBy:'id_DESC'})
    return users
}
const plates = async (parent,args,context,info)=>{
    console.log('plates query')
    const plates = await context.prisma.plats({orderBy:'id_DESC'})
    return plates
}
const orderedPlatesByUser = async (parent,args,context,info)=>{
    console.log('orderedPlatesByUser query')
    const orderedPlates = await context.prisma.usersOnPlateses({where:{user:{id:args.user}}})
    return orderedPlates
}
const orderedHousesByUser = async (parent,args,context,info)=>{
    console.log('orderedHousesByUser query')
    const orderedHousesByUser = await context.prisma.usersOnHouseses({where:{user:{id:args.user}}})
    return orderedHousesByUser
}
const orderedProductsByUser = async (parent,args,context,info)=>{
    console.log('orderedProductsByUser query')
    const orderedProductsByUser = await context.prisma.usersOnProductses({where:{user:{id:args.user}}})
    return orderedProductsByUser
}


module.exports={
    info,
    steedsByUser,
    users,
    orderedPlatesByUser,
    orderedHousesByUser,
    orderedProductsByUser,
    plates
}