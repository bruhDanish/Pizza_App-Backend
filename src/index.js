const express = require('express');

const serverConfig = require('./config/server.config.js');
const connectDB = require('./config/db.config.js');

const app = express();

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${serverConfig.PORT}...`);
});