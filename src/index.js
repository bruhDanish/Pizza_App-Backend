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

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text()); //works same as bodyParser.text()

app.use('/users', userRouter);// routing middleware
app.use('/carts', cartRouter)
app.use('/auth', authRouter)

app.get('/ping', isLoggedIn, (req, res) => {
    console.log(req.user);
    console.log(req.body);
    console.log(req.cookies);

    res.status(200).json({message: 'Pong'});
})

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${serverConfig.PORT}...`);
});