const mongoose = require("mongoose")
const AddressSchema = require("./AddessSchema")
const Schema = mongoose.Schema ;
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,lowercase:true, unique:true },
    password:{type:String,required:true},
    address: {type: AddressSchema}
}, {
    toJSON: {virtuals:true}
}, {toObject: {virtuals:true}})

// user.fullname = "Magda Sokolovic"
UserSchema.virtual('fullname').get(function(){
    return (this.firstname + ' ' + this.lastname)
}).set(function(name){
    let names = name.split(' ')
    this.firstname=names[0]
    this.lastname=names[1]
})

UserSchema.pre('save', function(){
    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)

})
const UsersModel = mongoose.model("users",UserSchema)


module.exports= UsersModel;



