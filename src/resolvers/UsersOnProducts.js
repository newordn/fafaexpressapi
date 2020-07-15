async function user(parent,args,context,info){
 const user = context.prisma.usersOnProducts({id:parent.id}).user()
 return user
}

async function product(parent,args,context,info){
    const product = context.prisma.usersOnProducts({id:parent.id}).product()
    return product
}

module.exports={
user,
product
}