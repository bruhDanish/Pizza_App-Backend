const express= require('express');
const bodyParser = require('body-parser');

const serverConfig = require('./config/server.config.js');
const connectDB = require('./config/db.config.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text()); //works same as bodyParser.text()

app.post('/ping', (req, res) => {
    console.log(req.body);
    return res.json({ message: 'pong' });
})

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${serverConfig.PORT}...`);
});