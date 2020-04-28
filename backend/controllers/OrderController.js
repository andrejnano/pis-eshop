/*
|--------------------------------------------------------------------------------
| * Order Model Controller *
|--------------------------------------------------------------------------------
|
|  ~ Order Data management
|
*/
let Order = require('../models/Order')
let User = require('../models/User')
let Product = require('../models/Product')
const { SuccessResponse, ErrorResponse} = require('../utils/response')



module.exports.init =async function(req,res) {

  // await Order.collection.drop();

  let petr_user = await User.findOne({email: 'petr.kral@gmail.com'}, function (err, user) {
    return user;
  })
  let anezka_user = await User.findOne({email: 'anezka.kratka@test.com'}, function (err, user) {
    return user;
  })

  let minecraft_lite = await Product.findOne({name: 'Minecraft lite'}, function (err, product) {
    return product;
  })
  let apache_lite = await Product.findOne({name: 'Apache lite'}, function (err, product) {
    return product;
  })
  let cs_go = await Product.findOne({name: 'CS:GO'}, function (err, product) {
    return product;
  })
  let temaspeak_lq = await Product.findOne({name: 'Basic TeamSpeak server'}, function (err, product) {
    return product;
  })


  await new Order({
      payment: "PaySafeCard",
      price: 70,
      user: petr_user,
      products: [apache_lite],
      date: '2020-03-09',
      state: "active",
  }).save();

  await new Order({
      payment: "GoPay",
      price: 50,
      user: petr_user,
      products: [minecraft_lite, temaspeak_lq, apache_lite],
      date: '2020-03-18',
      state: "cancelled",
  }).save();

  await new Order({
      payment: "PaySafeCard",
      price: 100,
      user: petr_user,
      products: [cs_go],
      date: '2020-04-25',
      state: "created",
  }).save();

  await new Order({
      payment: "GoPay",
      price: 280,
      user: anezka_user,
      products: [temaspeak_lq, minecraft_lite],
      date: '2020-01-14',
      state: "active",
  }).save();

  await new Order({
      payment: "Bitcoin",
      price: 140,
      user: anezka_user,
      products: [cs_go],
      date: '2020-03-29',
      state: "cancelled",
  }).save();

  return SuccessResponse(res, { 'message' : 'DB orders successfully initialized.' }, 200)
}


/*
|--------------------------------------------------------------------------------
| Create a new Order
|
example:
{
  "payment": "PayPal",
  "price": 1414,
  "products": ["5ea08272170714020dccdcf1", "5ea08273170714020dccdcf5", "5ea08272170714020dccdce6"]
}
|--------------------------------------------------------------------------------
*/
module.exports.create = async function(req, res) {
  if (req.user) {
    let user = req.user._id;
    let { payment, price, products } = req.body;
    let prods = records = await Product.find().where('_id').in(products).exec();
    let doc = await new Order({ payment: payment, price: price, user: user, products: prods }).save();
    return SuccessResponse(res, { created_order: doc }, 200)
  } else {
    return ErrorResponse(res, { message: "You don't have permission to edit this type resource." }, 404)
  }
}


/*
|--------------------------------------------------------------------------------
| Return all Orders
|--------------------------------------------------------------------------------
*/
module.exports.getAll = async function(req, res) {
  await req.user.set(req.body);
  if (req.user.isAdmin) { // TODO user can delete own orders
    Order.find({})
      .populate("user", "fullname email")
      .populate({
        path: 'products',
        populate: {
            path: 'configuration',
        }
    }).sort({date: -1})
      .exec(function(err, orders) {
        res.send(orders);
      })
  } else {
    return ErrorResponse(res, { message: "You don't have permission to edit this type resource." }, 404)
  }
}

/*
|--------------------------------------------------------------------------------
| Return my Orders
|--------------------------------------------------------------------------------
*/
module.exports.getMy = async function(req, res) {

  await req.user.set(req.body);
  if (req.user) {
    Order.find({user: req.user._id})
      .populate("user", "fullname email")
      .populate({
        path: 'products',
        populate: {
            path: 'configuration',
        }
    }).sort({date: -1})
      .exec(function(err, orders) {
        console.log(orders);
          if(orders) {res.send(orders);  }
          else {return ErrorResponse(res, { message: "Resource not found." }, 404)}
      })
  } else {
    return ErrorResponse(res, { message: "You don't have permission to edit this type resource." }, 404)
  }
}


/*
|--------------------------------------------------------------------------------
| Return a specific Order (:order_id)
|--------------------------------------------------------------------------------
*/
module.exports.get = function(req, res) {
  Order.findById(req.params.order_id)
  .populate("user", "email")
  .populate("product")
  .exec(function(err, order) {
    if(order) {res.send(order);  }
    else {return ErrorResponse(res, { message: "Resource not found." }, 404)}
  })
}


/*
|--------------------------------------------------------------------------------
| Update a Order (:order_id)
|--------------------------------------------------------------------------------
*/
module.exports.update = async function(req, res) {
  await req.user.set(req.body);
  if (req.user) {
    let user = await User.findById(req.user._id, function (err, user) {
      return user;
    })
    let { payment, price, product } = req.body;
    let prod = await Product.findOne({_id: product}, function (err, prod) {
      return prod;
    })
    let doc = await Order.findOneAndUpdate({_id: req.params.order_id}, { payment: payment, price: price, user: user, product: prod });
    return SuccessResponse(res, { updated_order: doc }, 200)
  } else {
    return ErrorResponse(res, { message: "You don't have permission to edit this type resource." }, 404)
  }
}


/*
|--------------------------------------------------------------------------------
| Delete a Order (:order_id)
|--------------------------------------------------------------------------------
*/
module.exports.delete = async function(req, res) {
  await req.user.set(req.body);
  if (req.user.isAdmin) { // TODO user can delete own orders
    await Order.deleteOne({_id: req.params.order_id})
      .then(() => {
        return SuccessResponse(res, { message: 'Order Deleted' }, 200)
      })
  } else {
    return ErrorResponse(res, { message: "You don't have permission to edit this type resource." }, 404)
  }
}


/*
|--------------------------------------------------------------------------------
| Pay a Order (:order_id)
|--------------------------------------------------------------------------------
*/
module.exports.pay = async function(req, res) {
  await req.user.set(req.body);
  if (req.user) {
    let user = await User.findById(req.user._id, function (err, user) {
      return user;
    })
    let { payment, price, product } = req.body;
    let prod = await Product.findOne({_id: product}, function (err, prod) {
      return prod;
    })
    let doc = await Order.findOneAndUpdate({_id: req.params.order_id}, { state: "active"});
    return SuccessResponse(res, { paid_order: doc }, 200)
  } else {
    return ErrorResponse(res, { message: "You don't have permission to edit this type resource." }, 404)
  }
}

/*
|--------------------------------------------------------------------------------
| Pay a Order (:order_id)
|--------------------------------------------------------------------------------
*/
module.exports.cancel = async function(req, res) {
  await req.user.set(req.body);
  if (req.user) {
    let user = await User.findById(req.user._id, function (err, user) {
      return user;
    })
    let { payment, price, product } = req.body;
    let prod = await Product.findOne({_id: product}, function (err, prod) {
      return prod;
    })
    let doc = await Order.findOneAndUpdate({_id: req.params.order_id}, { state: "cancelled"});
    return SuccessResponse(res, { cancelled: doc }, 200)
  } else {
    return ErrorResponse(res, { message: "You don't have permission to edit this type resource." }, 404)
  }
}

/*
|--------------------------------------------------------------------------------
| reactivate a Order (:order_id)
|--------------------------------------------------------------------------------
*/
module.exports.reset = async function(req, res) {
  await req.user.set(req.body);
  if (req.user) {
    let user = await User.findById(req.user._id, function (err, user) {
      return user;
    })
    let { payment, price, product } = req.body;
    let prod = await Product.findOne({_id: product}, function (err, prod) {
      return prod;
    })
    let doc = await Order.findOneAndUpdate({_id: req.params.order_id}, { state: "created"});
    return SuccessResponse(res, { cancelled: doc }, 200)
  } else {
    return ErrorResponse(res, { message: "You don't have permission to edit this type resource." }, 404)
  }
}
