const {Router}=require('express');
const controller=require('./controller');
const routes =Router();

routes.get('/',controller.getVehicle );
routes.get('/:id',controller.getVehicleById)
routes.post('/',controller.addVehicle)
routes.delete('/:id',controller.deleteVehicle)
routes.put('/:id',controller.updateVehicle)
module.exports=routes;