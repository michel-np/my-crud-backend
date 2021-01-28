require("dotenv").config()
const cors = require('cors')
const express = require("express");
const app = express();
const messageRoutes = require("./routes/messageRoutes");

const port = 6005;

const setUpExpress = () => {
    app.use(express.json({ limit: '50mb' }));
    app.use(cors())
    app.use('/message', messageRoutes);

    app.listen(port, () => {
        console.log(`Server running at: http://localhost:${port}`)
    });

}


setUpExpress();


