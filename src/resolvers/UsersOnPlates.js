async function user(parent,args,context,info){
 const user = context.prisma.usersOnPlates({id:parent.id}).user()
 return user
}

async function plat(parent,args,context,info){
    const plat = context.prisma.usersOnPlates({id:parent.id}).plat()
    return plat
}

module.exports={
user,
plat
}