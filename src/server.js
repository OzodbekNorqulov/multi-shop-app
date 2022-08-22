const express = require("express");
const path = require("path")
const fs = require("fs")
const http = require("http");
const { port } = require("../config");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("./modules/mongoose");
const signupPostController = require("./controllers/signupPostController");
const users = require("./models/users");
const products = require("./models/products");
const { verifyJWT } = require("./modules/jwt");
const cart = require("./models/cart");
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server)

// middleWares
app.use("/public", express.static(path.join(__dirname, "public")))
app.use("/socket", express.static(path.join(__dirname, "..", "node_modules", "socket.io", "client-dist")))
app.use(cookieParser())
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// socket events

io.on("connection", async socket => {
    console.log(socket.id, "connected");
    socket.on("new_img", data => {
        console.log(data);
    })
    socket.on("new_category", data => {
        console.log(data);
    })

    socket.on("token", async ({token}) => {
        const verified = verifyJWT(token)
console.log(verified);
        const cartItemLength = await cart.find({ userId: verified.userId})
        console.log(cartItemLength);
        socket.emit("cart_item_count", cartItemLength.length)
    })

    socket.on("product", (formData) => console.log(formData))
    socket.on("new_comment", async userMessage => {
        const user = await users.findOne({ userName: userMessage.name.toLowerCase()})
        const product = await products.findOne({ title: userMessage.dataTitle.toLowerCase() })

        const newComment = {
            userName: userMessage.name,
            text: userMessage.message,
            email: userMessage.email
        }

        const updatedProduct = await products.findByIdAndUpdate(product._id, {
            $push: {
                comments: newComment
            }
        })

        socket.emit("new_comment", userMessage)
    })

    socket.on("add_product_to_cart", async (data) => {
        const userToken = verifyJWT(data.token)
        const oneProduct = await products.findOne({
            title: data.product.toLowerCase()
        })
        const findedItem = await cart.find({
                    userId: userToken.userId
         })
        const isOwn = [...findedItem.filter(i => i.userId == userToken.userId )]
        const oneFinded = findedItem.find(i => i.productId == oneProduct._id)
        const oneIsOwn = isOwn.find(i => i.productId == oneProduct._id)
        if(!oneIsOwn) {
            const NewCartItem = await cart.create({
                productId: oneProduct._id,
                userId: userToken.userId,
                count: 1
            })
        }else {
            const own = await cart.find({ userId: userToken.userId })
            const findOneInOwn = own.find(i => i.productId == oneProduct._id)
            await cart.findOneAndUpdate({ productId: findOneInOwn.productId }, {
                count: oneIsOwn.count + 1
            })
        }

        const cartItemLength = await cart.find({ userId: userToken.userId })
        console.log("hey: ", cartItemLength);
        socket.emit("cart_item_count", cartItemLength.length)
    })

    socket.on("all_prices", total => {
        socket.emit("all_prices", total)
    })

    socket.on("inrease_quantity", async ({dataId, price, totalPrice}) => {
        const targetedItem = await cart.findById(dataId)
        const cartItem = await cart.findByIdAndUpdate(dataId, {
            count: targetedItem.count + 1
        })
        const calculatedPrice = Number(totalPrice) + Number(price)
        // console.log(price, totalPrice);
        console.log(calculatedPrice);
        socket.emit("total_quantity", calculatedPrice)
    })
    
    socket.on("decrease_quantity", async ({dataId, price, totalPrice}) => {
        const targetedItem = await cart.findById(dataId)
        const cartItem = await cart.findByIdAndUpdate(dataId, {
            count: targetedItem.count - 1
        })
        const calculatedPrice = Number(totalPrice) - Number(price)
        socket.emit("total_quantity", calculatedPrice)
    })
    
})

mongoose()

fs.readdir(path.join(__dirname, "routes"), (err, files) => {
    if(!err) {
        files.forEach(file => {
            const routePath = path.join(__dirname, "routes", file);
            const route = require(routePath);

            if(route.path && route.router) app.use(route.path, route.router)
        })
    }
});



server.listen(port, () => console.log(`server started, port is http://localhost:${port}`))