async function user(parent,args,context,info){
 const user = context.prisma.usersOnHouses({id:parent.id}).user()
 return user
}

async function house(parent,args,context,info){
    const house = context.prisma.usersOnHouses({id:parent.id}).plat()
    return house
}

module.exports={
user,
house
}