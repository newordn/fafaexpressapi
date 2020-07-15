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
const houses = async (parent,args,context,info)=>{
    console.log('houses query')
    const houses = await context.prisma.houses({orderBy:'id_DESC'})
    return houses
}
const products = async (parent,args,context,info)=>{
    console.log('products query')
    const products = await context.prisma.products({orderBy:'id_DESC'})
    return products
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

const orderedPlatesByUsers = async (parent,args,context,info)=>{
    console.log('orderedPlatesByUsers query')
    const orderedPlates = await context.prisma.usersOnPlateses({orderBy:'id_DESC'})
    return orderedPlates
}
const orderedHousesByUsers = async (parent,args,context,info)=>{
    console.log('orderedHousesByUsers query')
    const orderedHousesByUser = await context.prisma.usersOnHouseses({orderBy:'id_DESC'})
    return orderedHousesByUser
}
const orderedProductsByUsers = async (parent,args,context,info)=>{
    console.log('orderedProductsByUsers query')
    const orderedProductsByUser = await context.prisma.usersOnProductses({orderBy:'id_DESC'})
    return orderedProductsByUser
}
const steedsByUsers = async (parent,args,context,info)=>{
    console.log('steedsByUsers query')
    const steedsByUsers = await context.prisma.steeds({orderBy:'id_DESC'})
    return steedsByUsers
}


module.exports={
    info,
    steedsByUser,
    users,
    orderedPlatesByUser,
    orderedHousesByUser,
    orderedProductsByUser,
    orderedPlatesByUsers,
    orderedHousesByUsers,
    orderedProductsByUsers,
    plates,
    houses,
    products,
    steedsByUsers
}