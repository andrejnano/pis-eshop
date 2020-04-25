/*
|--------------------------------------------------------------------------------
| * Product Model Controller *
|--------------------------------------------------------------------------------
|
|  ~ Product Data management
|
*/
const Configuration = require("../models/Configuration");
const Category = require("../models/Category");
const Product = require("../models/Product");
const { SuccessResponse, ErrorResponse} = require('../utils/response')

module.exports.init = async function(req,res) {

  // await Category.collection.drop();
  // await Product.collection.drop();
  // await Configuration.collection.drop();

  const gameCat = await new Category({
    title: 'Gaming servers',
    subtitle: 'Minecraft, CS:GO and more',
    startingPrice: 10,
    description: 'High performance gaming servers that are fit to your needs.',
    icon: "gamepad-alt"
  }).save();

  const contCat = await new Category({
    title: 'Containers',
    subtitle: 'Docker platform integration',
    startingPrice: 5,
    description: 'Container servers that are fit to your needs.',
    icon: "cubes"
  }).save();

  const webCat = await new Category({
    title: 'Web servers',
    subtitle: 'Nginx, Apache, ...',
    startingPrice: 5,
    description: 'Our web servers are all you want.',
    icon: "server"
  }).save();

  const tsCat = await new Category({
    title: 'Teamspeak',
    subtitle: 'Minecraft, CS:GO and more',
    startingPrice: 100,
    description: 'High quality voice calls for affordable price.',
    icon: "server"
  }).save();

  const minecraftConfig1 = await new Configuration({
    os: "Minecraft",
    ram: 8,
    cpu: 2,
    hddType: "HDD",
    ipCount: 2,
  }).save();

  const minecraftConfig2 = await new Configuration({
    os: "Minecraft",
    ram: 32,
    cpu: 2,
    hddType: "SSD",
    ipCount: 6,
  }).save();

  const csGoConfig1 = await new Configuration({
    os: "CS:GO",
    ram: 16,
    cpu: 1,
    hddType: "HDD",
    ipCount: 1,
  }).save();

  const csGoConfig2 = await new Configuration({
    os: "CS:GO",
    ram: 32,
    cpu: 1,
    hddType: "SSD",
    ipCount: 2,
  }).save();

  const csGoConfig3 = await new Configuration({
    os: "CS:GO",
    ram: 64,
    cpu: 2,
    hddType: "SSD",
    ipCount: 4,
  }).save();

  const tsLQConfig = await new Configuration({
    os: "TeamSpeak3",
    ram: 4,
    cpu: 1,
    hddType: "HDD",
    ipCount: 1,
  }).save();

  const tsNQConfig = await new Configuration({
    os: "TeamSpeak3",
    ram: 16,
    cpu: 2,
    hddType: "HDD",
    ipCount: 2,
  }).save();

  const tsHQConfig = await new Configuration({
    os: "TeamSpeak3",
    ram: 32,
    cpu: 4,
    hddType: "HDD",
    ipCount: 4,
  }).save();

  const centOS1Config = await new Configuration({
    os: "CentOS",
    ram: 32,
    cpu: 2,
    hddType: "HDD",
    ipCount: 2,
  }).save();

  const centOS2Config = await new Configuration({
    os: "CentOS",
    ram: 32,
    cpu: 4,
    hddType: "SSD",
    ipCount: 4,
  }).save();

  const rhelConfig = await new Configuration({
      os: "RHEL",
      ram: 32,
      cpu: 4,
      hddType: "SSD",
      ipCount: 2,
  }).save();

  const ubuntu1804Config = await new Configuration({
    os: "Ubuntu 18.04",
    ram: 64,
    cpu: 2,
    hddType: "SSD",
    ipCount: 4,
  }).save();

  const ubuntu1910Config1 = await new Configuration({
    os: "Ubuntu 19.10",
    ram: 128,
    cpu: 4,
    hddType: "SSD",
    ipCount: 3,
  }).save();

  const ubuntu1910Config2 = await new Configuration({
    os: "Ubuntu 19.10",
    ram: 128,
    cpu: 6,
    hddType: "SSD",
    ipCount: 6,
  }).save();

  await new Product({
    //_id: "apache_lite",
    name: "Apache lite",
    configuration: centOS1Config,
    category: webCat,
    price: 70,
    icon: "server",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    //_id: "nginx_lite",
    name: "Nginx lite",
    configuration: centOS1Config,
    category: webCat,
    price: 78,
    icon: "server",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl.",
  }).save();

  await new Product({
    //_id: "ngnix_pro",
    name: "Nginx Pro",
    configuration: centOS2Config,
    category: webCat,
    price: 125,
    icon: "server",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    //_id: "minecraft_lite",
    name: "Minecraft lite",
    configuration: minecraftConfig1,
    category: gameCat,
    price: 50,
    icon: "server",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    //_id: "minecraft_pro",
    name: "Minecraft PRO",
    configuration: minecraftConfig2,
    category: gameCat,
    price: 80,
    icon: "server",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    //_id: "cs_go_lite",
    name: "CS:GO lite",
    configuration: csGoConfig1,
    category: gameCat,
    icon: "server",
    price: 20,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    //_id: "cs_go",
    name: "CS:GO",
    configuration: csGoConfig2,
    category: gameCat,
    icon: "server",
    price: 40,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    //_id: "cs_go_pro",
    name: "CS:GO PRO",
    configuration: csGoConfig3,
    category: gameCat,
    icon: "server",
    price: 60,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    //_id: "temaspeak_lq",
    name: "Basic TeamSpeak server",
    configuration: tsLQConfig,
    category: tsCat,
    icon: "server",
    price: 100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    //_id: "temaspeak_nq",
    name: "TeamSpeak server L",
    configuration: tsNQConfig,
    category: tsCat,
    icon: "server",
    price: 200,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    //_id: "temaspeak_hq",
    name: "TeamSpeak server Ultimate",
    configuration: tsHQConfig,
    category: tsCat,
    icon: "server",
    price: 300,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    //_id: "docker_1",
    name: "Docker 1",
    configuration: ubuntu1804Config,
    category: contCat,
    icon: "server",
    price: 80,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    // _id: "docker_2",
    name: "Docker 2",
    configuration: ubuntu1910Config1,
    category: contCat,
    icon: "server",
    price: 90,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    // _id: "docker_3",
    name: "Docker 3",
    configuration: ubuntu1910Config2,
    category: contCat,
    icon: "server",
    price: 140,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  return SuccessResponse(res, { 'message' : 'DB successfully initialized' }, 200)
}
/*
|--------------------------------------------------------------------------------
| Create a new product
|--------------------------------------------------------------------------------
*/
module.exports.create = async function(req, res) {
  await req.user.set(req.body);
  if (req.user) { // .isAdmin
    let { name, price, icon, description, category, configuration} = req.body;
    let conf = await new Configuration({...configuration}).save();
    let doc = await new Product({ name, price, icon, description, category, configuration: conf._id }).save();
    return SuccessResponse(res, { created: doc }, 200)
  } else {
    return ErrorResponse(res, { message: "You don't have permission to edit this type resource." }, 404)
  }
}


/*
|--------------------------------------------------------------------------------
| Return all products
|--------------------------------------------------------------------------------
*/
module.exports.getAll = function(req, res) {
  Product.find({})
    .populate("configuration")
    .exec(function(err, products) {
      res.send(products);
    })
}


/*
|--------------------------------------------------------------------------------
| Return a specific Product (:product_id)
|--------------------------------------------------------------------------------
*/
module.exports.get = function(req, res) {
  Product.findById(req.params.product_id)
  .populate("configuration")
  .populate("category")
  .exec(function(err, product) {
    if(product) {res.send(product);  }
    else {return ErrorResponse(res, { message: "Resource not found." }, 404)}
  })
}

/*
|--------------------------------------------------------------------------------
| Return categories
|--------------------------------------------------------------------------------
*/
module.exports.getCategories = function(req, res) {
  Category.find({}, function(err, cats) {
    res.send(cats);
  });
}

/*
|--------------------------------------------------------------------------------
| Return category products
|--------------------------------------------------------------------------------
*/
module.exports.getCategory = function(req, res) {
  let desc = '';
  Category.find({_id:  req.params.category_id}, function(err, obj) {
    desc = obj[0].description;
  })
  Product.find({category: req.params.category_id})
  .populate("configuration")
  .exec(function(err, categories) {

    if(categories) {
      categories.push({description:desc});
      res.send(categories);
    }
    else {return ErrorResponse(res, { message: "Resource not found." }, 404)}
  })
}

/*
|--------------------------------------------------------------------------------
| Update a product (:product_id)

example body:

{
    "name": "Apacfasfsafsafhe litffORO",
    "price": 70,
    "icon": "server",
    "description": "LoHAKASAng elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula."
}

|--------------------------------------------------------------------------------
*/
module.exports.update = async function(req, res) {
  await req.user.set(req.body);
  if (req.user.isAdmin) {
    let { name, configuration, price, icon, description } = req.body;
    let { os, memory, cpu, hdd, hddType, ipCount } = configuration;
    await Configuration.findOneAndUpdate({_id: configuration._id}, { os, memory, cpu, hdd, hddType, ipCount });
    let doc = await Product.findOneAndUpdate({_id: req.params.product_id}, { name, price, icon, description });
    return SuccessResponse(res, { updated: doc }, 200)
  } else {
    return ErrorResponse(res, { message: "You don't have permission to edit this type resource." }, 404)
  }
}


/*
|--------------------------------------------------------------------------------
| Delete a product (:product_id)
|--------------------------------------------------------------------------------
*/
module.exports.delete = async function(req, res) {
  await req.user.set(req.body);
  if (req.user.isAdmin) {
    await Product.deleteOne({_id: req.params.product_id})
      .then(() => {
        return SuccessResponse(res, { message: 'Product Deleted' }, 200)
      })
  } else {
    return ErrorResponse(res, { message: "You don't have permission to edit this type resource." }, 404)
  }
}
