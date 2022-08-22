const path = require("path");
const { server } = require("../server");
const io = require("socket.io")(server)
module.exports = async (req, res) => {
    try {
    // const avatar = req.files.productImg;

    // if(!avatar) throw new Error("Img Not Found");

    // if(avatar.mimetype.split("/")[0] !== "image") throw new Error("Un allowed type of file")

    // const filePath = path.join(__dirname, "..", "public", "image", `${avatar.md5}.${avatar.mimetype.split("/")[1]}`);

    // await avatar.mv(filePath);

    // io.emit("new_img", `/public/image/${avatar.md5}.${avatar.mimetype.split("/")[1]}`)
    // pathName = `/public/image/${avatar.md5}.${avatar.mimetype.split("/")[1]}`

    // io.on("connection", socket => {
        
    // })

    
} catch (e) {
    res.status(400).json({
        ok: false,
        message: e + ""
    })
}
}