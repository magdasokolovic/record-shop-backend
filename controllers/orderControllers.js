//import db from database
const OrdersModel = require("../models/OrderSchema");
const createError = require("http-errors");

exports.getOrders = async (req, res, next) => {
  try {
      //get all order from order collection
    let order = await OrdersModel.find({}).populate('records').populate('user');
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

exports.getSingleOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    //get a single order from order collection
    const order = await OrdersModel.findById(id).populate("records", "-__v -_id").populate('user', "-__v -_id");
    if (order) {
      return res.json({ success: true, data: order });
    } else {
      next(new createError.BadRequest("no such order found in our collection"));
    }
  } catch (err) {
    next(err);
  }
};

exports.postOrder = async (req, res, next) => {
 //add new order into our order collection
    try{
        const order = new OrdersModel(req.body)
        await order.save()
        res.send({success:true, data:order})
    }
    catch(err){
        console.log(err.message)
        next(err)
    }

};

exports.patchOrder = async (req, res, next) => {

    try{
        const {id} =req.params
        //update order in our order collection
        const order = await OrdersModel.findByIdAndUpdate(id, req.body, {new:true})
        res.send({success:true, data:order})

    }
    catch(err){
        next(err)
    }
};

exports.deleteOrder = async (req, res, next) => {
    try{
        const {id}= req.params
        const order = await OrdersModel.findByIdAndDelete(id)
        res.send({success:true, data:order})
    }
    catch(err){
        next(err)
    }
};
