const bcrypt = require("bcryptjs");
const { sendMail } = require("../helpers/mail");
const { notify } = require("../helpers/notification");
const APP_NAME = "Fafa Afro Express";
async function signIn(parent, args, context, info) {
  console.log("user signIn mutation");
  let user = await context.prisma.user({ phone: args.phone });
  if (!user) {
    throw new Error("L'utilisateur n'existe pas. Inscrivez-vous");
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Mot de passe incorrect");
  }

  return user;
}
const signUp = async (parent, args, context, info) => {
  console.log("signUp mutation");
  let user = await context.prisma.user({ phone: args.phone });
  const password = await bcrypt.hash(args.password, 10);
  if (user == null) {
    user = await context.prisma.createUser({ ...args, password });
    await sendMail(
      user.email,
      "FafaExpress",
      `Inscription Reussite. Bienvenu dans FafaExpress, faites vous livrez en un laps de temps.`
    );
  }
  return user;
};
const plat = async (parent, args, context, info) => {
  console.log("plat mutation");
  const illustration = await context.storeUpload(args.illustration);
  const plat = await context.prisma.createPlat({
    ...args,
    illustration: illustration.path,
    archived: false,
  });
  notify({
    title: `Nouveau Plat: ${plat.name}`,
    bigText: `${plat.price} Dhs`,
    message: plat.description,
    subText: APP_NAME,
  });
  return plat;
};
const house = async (parent, args, context, info) => {
  console.log("house mutation");
  const illustration = await context.storeUpload(args.illustration);
  const house = await context.prisma.createHouse({
    ...args,
    illustration: illustration.path,
    archived: false,
  });
  notify({
    title: `Du Nouveau: ${house.localisation}`,
    bigText: `${house.price} Dhs`,
    message: house.description,
    subText: APP_NAME,
  });
  return house;
};
const steed = async (parent, args, context, info) => {
  console.log("steed mutation");
  const steed = await context.prisma.createSteed({
    ...args,
    user: { connect: { id: args.user } },
    ordered: true,
  });
  return steed;
};
const product = async (parent, args, context, info) => {
  console.log("product mutation");
  const illustration = await context.storeUpload(args.illustration);
  const product = await context.prisma.createProduct({
    ...args,
    illustration: illustration.path,
    archived: false,
  });
  notify({
    title: `Nouveau Produit: ${product.name}`,
    bigText: `${product.price} Dhs`,
    message: product.description,
    subText: APP_NAME,
  });
  return product;
};
const orderPlates = async (parent, args, context, info) => {
  console.log("order plates mutation");
  let usersOnPlates;
  args.plats.map(async (plat, i) => {
    usersOnPlates = await context.prisma.createUsersOnPlates({
      localisation: args.localisation,
      phone: args.phone,
      ordered: true,
      user: { connect: { id: args.user } },
      plat: { connect: { id: plat } },
      nombre: parseInt(args.nombre[i]),
    });
  });
  return usersOnPlates;
};
const orderHouses = async (parent, args, context, info) => {
  console.log("order houses mutation");
  let usersOnHouses;
  args.houses.map(async (house, i) => {
    usersOnHouses = await context.prisma.createUsersOnHouses({
      phone: args.phone,
      ordered: true,
      user: { connect: { id: args.user } },
      house: { connect: { id: house } },
    });
  });
  return usersOnHouses;
};
const orderProducts = async (parent, args, context, info) => {
  console.log("order products mutation");
  let usersOnProducts;
  args.products.map(async (product, i) => {
    usersOnProducts = await context.prisma.createUsersOnProducts({
      localisation: args.localisation,
      phone: args.phone,
      ordered: true,
      user: { connect: { id: args.user } },
      product: { connect: { id: product } },
      nombre: args.nombre[i],
    });
  });
  return usersOnProducts;
};
const unOrderPlat = async (parent, args, context, info) => {
  console.log("un order a plate mutation");
  const usersOnPlates = await context.prisma.updateUsersOnPlates({
    where: { id: args.usersOnPlates },
    data: { ordered: false },
  });
  return usersOnPlates;
};
const unOrderHouse = async (parent, args, context, info) => {
  console.log("un order a house mutation");
  const usersOnHouses = await context.prisma.updateUsersOnHouses({
    where: { id: args.usersOnHouses },
    data: { ordered: false },
  });
  return usersOnHouses;
};
const unOrderProduct = async (parent, args, context, info) => {
  console.log("un order a product mutation");
  const usersOnProducts = await context.prisma.updateUsersOnProducts({
    where: { id: args.usersOnProducts },
    data: { ordered: false },
  });
  return usersOnProducts;
};
const unOrderSteed = async (parent, args, context, info) => {
  console.log("un order a steed mutation");
  const unOrderSteed = await context.prisma.updateSteed({
    where: { id: args.steed },
    data: { ordered: false },
  });
  return unOrderSteed;
};
const updateItemText = async (parent, args, context, info) => {
  let update;
  let data = {};

  data[args.field] =
    args.field === "price" ? parseFloat(args.value) : args.value;
  update = await context.prisma.plat({ id: args.item });
  if (!update) {
    update = await context.prisma.product({ id: args.item });
    if (!update) {
      console.log("updating house");
      await context.prisma.updateHouse({ where: { id: args.item }, data });
    } else {
      // it's a product
      console.log("updating product");
      await context.prisma.updateProduct({ where: { id: args.item }, data });
    }
  } else {
    // it's a plate
    console.log("updating plate");
    await context.prisma.updatePlat({ where: { id: args.item }, data });
  }

  return args.field;
};

const updateItemIllustration = async (parent, args, context, info) => {
  console.log("updateItemIllustration mutation");
  const illustration = await context.storeUpload(args.illustration);
  const data = { illustration: illustration.path };
  let update = await context.prisma.plat({ id: args.item });
  if (!update) {
    update = await context.prisma.product({ id: args.item });
    if (!update) {
      console.log("updating house");
      await context.prisma.updateHouse({ where: { id: args.item }, data });
    } else {
      // it's a product
      console.log("updating product");
      await context.prisma.updateProduct({ where: { id: args.item }, data });
    }
  } else {
    // it's a plate
    console.log("updating plate");
    await context.prisma.updatePlat({ where: { id: args.item }, data });
  }

  return data.illustration;
};
const archived = async (parent, args, context, info) => {
  console.log("archived mutation");
  let data = { archived: args.archived };
  let update = await context.prisma.plat({ id: args.item });
  if (!update) {
    update = await context.prisma.product({ id: args.item });
    if (!update) {
      console.log("archived house");
      await context.prisma.updateHouse({ where: { id: args.item }, data });
    } else {
      // it's a product
      console.log("archived product");
      await context.prisma.updateProduct({ where: { id: args.item }, data });
    }
  } else {
    // it's a plate
    console.log("archived plate");
    await context.prisma.updatePlat({ where: { id: args.item }, data });
  }

  return args.archived;
};
const notification = async (parent, args, context, info) => {
  console.log("notification mutation");
  const notification = await context.prisma.createNotification({
    ...args,
    subText: APP_NAME,
  });
  notify({ ...args, subText: APP_NAME });
  return notification;
};
const category = async (parent, args, context, info) => {
  console.log("category mutation");
  const illustration = await context.storeUpload(args.illustration);
  const data = { illustration: illustration.path, title: args.title };
  const category = await context.prisma.createCategory(data);
  return category;
};
module.exports = {
  signIn,
  signUp,
  plat,
  house,
  steed,
  product,
  orderPlates,
  orderHouses,
  orderProducts,
  unOrderPlat,
  unOrderHouse,
  unOrderProduct,
  unOrderSteed,
  updateItemText,
  updateItemIllustration,
  archived,
  notification,
  category,
};
