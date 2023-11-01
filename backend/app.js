const express = require("express")
const cors = require("cors")
const router = require("./route/index")
const app = express();

app.use(cors());

app.use(express.json());
app.use('/api', router);


const port = 6003;

app.listen(port, (e) => {
    console.log(`The Server running on the Port ${port}`)
});
