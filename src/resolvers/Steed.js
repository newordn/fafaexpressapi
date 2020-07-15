async function user(parent,args,context,info){
    const user = context.prisma.steed({id:parent.id}).user()
    return user
   }


module.exports={
    user
    }