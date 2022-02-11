const pool = require('../../db');
const queries = require('./queries')
const getVehicle = (req, res,) => {
    pool.query(queries.getVehicle, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}
const getVehicleById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getVehicleById, [id], (error, result) => {
        if (error) throw error; {
            res.status(200).json(result.rows);
        }
    })

}
const addVehicle = (req, res) => {
    const { id, type, model, price } = req.body;

    //check if id is exists
    pool.query(queries.checkId, [id], (error, result) => {
        if (result.rows.length != 0) {
            res.send("Id already exists..!!!")
        } else if (result.rows.length == 0) {
            pool.query(queries.addVehicle, [id, type, model, price], (error, result) => {
                if (error) throw error; {
                    res.status(201).send("Vehicle add Successfully!")
                }
            })
        }

    })
}
const deleteVehicle = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getVehicleById, [id], (error, result) => {
        const noVehicleFound = result.rows.length;

        if (noVehicleFound == 0) {
            res.send("Vehicle does not exist...!!,could not delete vehicle")
        } else if (noVehicleFound != 0) {
            pool.query(queries.deleteVehicle, [id], (error, result) => {
                if (error) throw error; {
                    res.status(200).send("Vehicle delete successfully.")
                }
            })
        }


    })
}
const updateVehicle = (req, res) => {
    const id = parseInt(req.params.id);

    let { type, model, price } = req.body

    pool.query(queries.getVehicleById, [id], (error, result) => {

        const noVehicleFound = result.rows.length;
        const oldType = result.rows[0]['type'];
        const oldModel = result.rows[0]['model'];
        const oldPrice = result.rows[0]['price'];
        if (noVehicleFound == 0) {
            res.send("Vehicle does not exist...!!,could not update vehicle")
        } else if (noVehicleFound != 0) {
            if (model != "" && type == "" && price == "") {
              type=oldType
              price=oldPrice


            } else if (model == "" && type != "" && price == "") {
               model=oldModel
               price=oldPrice

            } else if (model == "" && type == "" && price != "") {
              model=oldModel
              type=oldType

            } else if (model != "" && type != "" && price == "") {

                price = oldPrice


            } else if (model != "" && type == "" && price != "") {
                type += oldType
    


            } else if (model == "" && type != "" && price != "") {
                model = oldModel
            }
            pool.query(queries.updateVehicle, [type, model, price, id], (error, result) => {

                if (error) throw error; {

                    res.status(200).send("Vehicle update successfully.")

                }
            })
        }
    })
}
const deleteALL = (req, res) =>{

}
module.exports = {
    getVehicle, getVehicleById, addVehicle, deleteVehicle, updateVehicle,
}