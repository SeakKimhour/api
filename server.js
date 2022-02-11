
const express = require('express')
var cors=require('cors')
const vehicleRoutes = require('./src/vehicle/routes')
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

app.use('/api/v1/vehicle', vehicleRoutes)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
