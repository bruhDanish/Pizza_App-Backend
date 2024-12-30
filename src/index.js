const express= require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const serverConfig = require('./config/server.config.js');
const connectDB = require('./config/db.config.js');
const userRouter = require('./routes/user.routes.js');
const cartRouter = require('./routes/cart.routes.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text()); //works same as bodyParser.text()

app.use('/users', userRouter);// routing middleware
app.use('/carts', cartRouter)

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${serverConfig.PORT}...`);
});