const path = require("path")
const categories = require("../models/categories")
const products = require("../models/products")

module.exports = async (req, res, next) => {
    // console.log(req.body);
    try {
            const file = req.files
            console.log(file);
            const avatars = [file.first, file.second, file.third]
            const body = {...req.body}

            req.img = []
 avatars.forEach(avatar => {
       if(!avatar) throw new Error("Img Not Found !")


    if(avatar.mimetype.split("/")[0] !== "image") throw new Error("unallowed type of file !")

    const filePath = path.join(__dirname, "..", "public", "image", `${avatar.md5}.${avatar.mimetype.split("/")[1]}`)

    avatar.mv(filePath)
    req.img.push(`/public/image/${avatar.md5}.${avatar.mimetype.split("/")[1]}`)
 })
    next()
    // // console.log(req.img);

    //     // res.send("created")
    //     next()
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}