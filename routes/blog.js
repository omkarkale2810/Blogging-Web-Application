const {Router} = require("express");
const { handlepostaddblog , handlegetaddblog , handlegetblogbyid ,handlePOSTcommentonblogid} = require("../controller/blog")
const multer = require("multer");
const path = require("path")

const Blog = require("../models/blogs");
const Comment = require("../models/comment");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null, filename)
    }
})
const upload = multer({ storage: storage })

const router = Router();

router.route("/addblog").get(handlegetaddblog).post(upload.single("coverimage"),handlepostaddblog);

router.get("/:id" , handlegetblogbyid);

router.route("/comment/:blogid").post(handlePOSTcommentonblogid)

module.exports = router;