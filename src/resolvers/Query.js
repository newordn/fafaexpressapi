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


module.exports={
    info,
    steedsByUser,
    users
}