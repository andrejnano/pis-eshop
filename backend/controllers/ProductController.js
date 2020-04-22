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

module.exports.init =async function(req,res) {

  await Category.collection.drop();
  await Product.collection.drop();
  await Configuration.collection.drop();

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
    startingPrice: 5,
    description: 'High quality voice calls for affordable price.',
    icon: "server"
  }).save();

  const savedConfig1 = await new Configuration({
    os: "Minecraft",
    ram: 4,
    cpu: 2,
    hddType: "HDD",
    ipCount: 3,
  }).save();

  const savedConfig2 = await new Configuration({
    os: "CS:GO",
    ram: 16,
    cpu: 4,
    hddType: "SSD",
    ipCount: 1,
  }).save();

  const savedConfig3 = await new Configuration({
    os: "TeamSpeak3",
    ram: 4,
    cpu: 1,
    hddType: "HDD",
    ipCount: 1,
  }).save();

  const savedConfig4 = await new Configuration({
    os: "TeamSpeak3",
    ram: 16,
    cpu: 2,
    hddType: "SSD",
    ipCount: 2,
  }).save();

  await new Product({
    name: "Apache lite",
    configuration: savedConfig1._id,
    category: webCat._id,
    price: 70,
    icon: "server",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    name: "Nginx lite",
    configuration: savedConfig1._id,
    category: webCat._id,
    price: 78,
    icon: "server",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl.",
  }).save();

  await new Product({
    name: "Nginx Pro",
    configuration: savedConfig1._id,
    category: webCat._id,
    price: 125,
    icon: "server",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    name: "Minecraft lite",
    configuration: savedConfig1._id,
    category: gameCat._id,
    price: 125,
    icon: "server",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    name: "CS:GO palba",
    configuration: savedConfig2._id,
    category: gameCat._id,
    icon: "server",
    price: 22,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    name: "CS:GO palba II",
    configuration: savedConfig2._id,
    category: gameCat._id,
    icon: "server",
    price: 150,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    name: "CS:GO palba PRO",
    configuration: savedConfig2._id,
    category: gameCat._id,
    icon: "server",
    price: 225,
    description: "Tento server je kantrstrajk nejlepsi fakt top. Budes strilet na vsechno co se pohne",
  }).save();

  await new Product({
    name: "Basic TeamSpeak server",
    configuration: savedConfig3._id,
    category: tsCat._id,
    icon: "server",
    price: 260,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    name: "TeamSpeak server L",
    configuration: savedConfig3._id,
    category: tsCat._id,
    icon: "server",
    price: 260,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    name: "TeamSpeak server Ultimate",
    configuration: savedConfig4._id,
    category: tsCat._id,
    icon: "server",
    price: 350,
    description: "Pokecejte s kamosema ve vysoke moc moc kvalite a za super cenu nyni.",
  }).save();

  await new Product({
    name: "Docker 1",
    configuration: savedConfig4._id,
    category: contCat._id,
    icon: "server",
    price: 80,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    name: "Docker 2",
    configuration: savedConfig4._id,
    category: contCat._id,
    icon: "server",
    price: 90,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus nisl, sollicitudin ut sapien vitae, tincidunt vulputate ligula.",
  }).save();

  await new Product({
    name: "Docker 3",
    configuration: savedConfig4._id,
    category: contCat._id,
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
  if (req.user.isAdmin) {
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
    let { name, price, icon, description } = req.body;
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
