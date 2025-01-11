const express= require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const serverConfig = require('./config/server.config.js');
const connectDB = require('./config/db.config.js');
const userRouter = require('./routes/user.routes.js');
const cartRouter = require('./routes/cart.routes.js');
const authRouter = require('./routes/auth.routes.js');
const { isLoggedIn } = require('./validators/auth.validator.js');
const uploader = require('./middlewares/multer.middleware.js');
const cloudinary = require('./config/cloudinary.config.js');
const fs = require('fs/promises');
const productRouter = require('./routes/product.routes.js');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text()); //works same as bodyParser.text()

app.use('/users', userRouter);// routing middleware
app.use('/carts', cartRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);

app.get('/ping', isLoggedIn, (req, res) => {
    console.log(req.user);
    console.log(req.body);
    console.log(req.cookies);

    res.status(200).json({message: 'Pong'});
})

app.post('/photo', uploader.single('fileUploading'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        console.log(result);
        await fs.unlink(req.file.path);
        return res.json({message: 'OK'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
})

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${serverConfig.PORT}...`);
});