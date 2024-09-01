const {Schema,model} = require("mongoose");

const blogschema = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverimageurl:{
        type:String,
        required:false,
    },
    createdby:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true, 
    },
},
    {timestamps:true}
)

const Blog = model("blog" , blogschema);

module.exports = Blog;
