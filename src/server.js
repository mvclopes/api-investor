require("dotenv-safe").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/investorcontroller");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors()); 
app.use(helmet());
app.use(morgan("combined"));
app.set("port",8080);
app.use("/", routes);

const urldb = process.env.URLDB;

mongoose.connect(urldb, {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(app.get("port"), () => { 
    console.log(`Server online. Listening at port ${app.get("port")}`); 
});
