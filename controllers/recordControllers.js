//import db from database
const RecordsModel = require("../models/RecordSchema");
const createError = require("http-errors");

exports.getRecords = async (req, res, next) => {
  try {
      //get all records from records collection
    let records = await RecordsModel.find({});
    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

exports.getSingleRecord = async (req, res, next) => {
  try {
      const { id } = req.params;
      //get a single record from records collection
      const record = await RecordsModel.findById(id);
      if (record) {
        return res.json({ success: true, data: record });
      } else {
        next(new createError.BadRequest("no such record found in our collection"));
      }
  } catch (err) {
    next(err);
  }
};

exports.postRecord = async (req, res, next) => {
 //add new record into our records collection
    try{
        const record = new RecordsModel(req.body)
        await record.save()
        res.send({success:true, data:record})
    }
    catch(err){
        console.log(err.message)
        next(err)
    }

};

exports.patchRecord = async (req, res, next) => {

    try{
        const {id} =req.params
        //update record in our records collection
        const record = await RecordsModel.findByIdAndUpdate(id, req.body, {new:true})
        res.send({success:true, data:record})

    }
    catch(err){
        next(err)
    }
};

exports.deleteRecord = async (req, res, next) => {
    try{
        const {id}= req.params
        const record = await RecordsModel.findByIdAndDelete(id)
        res.send({success:true, data:record})
    }
    catch(err){
        next(err)
    }
};
