var mongoose=require("mongoose");
module.exports=mongoose.model('User',{
	username:{type:String, default:""},
	password:{type:String, default:""},
	email:{type:String, default:""},
	name:{type:String, default:""},
	mobile:{type:Number, min:10, default:""}
});
