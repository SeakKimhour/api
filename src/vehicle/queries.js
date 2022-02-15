const getVehicle = "SELECT * FROM vehicle_record "
const getVehicleById = "SELECT * FROM vehicle_record WHERE id=$1"
const addVehicle = "INSERT INTO vehicle_record (id,type,model,price) VALUES ($1,$2,$3,$4)"
const checkId = "SELECT s FROM vehicle_record s WHERE s.id=$1"
const deleteVehicle="DELETE FROM vehicle_record WHERE id=$1"
const updateVehicle="UPDATe vehicle_record SET type=$1,model=$2,price=$3 WHERE id=$4"
const deleteALL="DELETE FROM vehicle_record WHERE id<=(SELECT MAX(id) FROM  vehicle_record)"
module.exports = {
    getVehicle, getVehicleById, checkId,addVehicle,deleteVehicle,updateVehicle,deleteALL
}