const Blog = require("../models/blogs");
const Comment = require("../models/comment");

async function handlepostaddblog(req,res){
    const { title,body} = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdby: req.user._id,
        coverimageurl: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
}

function handlegetaddblog(req,res){
    return res.render("add_blog" , {
        user: req.user,
    });
}

async function handlegetblogbyid(req,res){
    const blog = await Blog.findById(req.params.id).populate("createdby");
    const comments = await Comment.find( { blogid: req.params.blogid } ).populate("createdby");
    console.log("blog ", blog);
    return res.render("blog" , {
        user:req.user,
        blog,  
        comments,
    })
}

async function handlePOSTcommentonblogid(req,res){
    await Comment.create({
        content:req.body.content,
        blogid:req.params.blogid,
        createdby:req.user.createdby
    })
    return res.redirect(`/blog/${req.params.blogid}`);
}

module.exports = {
    handlepostaddblog,
    handlegetaddblog,
    handlegetblogbyid,
    handlePOSTcommentonblogid,
}