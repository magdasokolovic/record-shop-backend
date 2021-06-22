const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserModel = require('./UserSchema')

const OrderSchema = new Schema({
  
  records: [{
    quantity: {
      type: Number,
      required: true
    },
    type: Schema.Types.ObjectId,
    required: true, 
    ref: "records"
  }], 
  
  user: {
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: "users"}
});

OrderSchema.virtual('deliveryAddess').get(async function(){
  let user = await UserModel.findById(this.user)
  return user.address;
})

module.exports = mongoose.model("orders", OrderSchema);