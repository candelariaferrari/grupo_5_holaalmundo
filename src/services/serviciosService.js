// ************ Require's ************
const req = require("express/lib/request");
const fs = require('fs');
const path = require('path');

// ************ Service ************

const serviceServicios = {
    
    // ************ Rutas  ************
    serviciosFilePath: path.join(__dirname, '../data/serviciosDataBase.json'),
    
    // ************ Read Files ************
    readFileServices: function(){
		return fs.readFileSync(this.serviciosFilePath, "utf-8")
	},

 // ************ Wirte Files ************
    writeFileServices: function(array){
        let dataToString = JSON.stringify(array, null, 4)
        fs.writeFileSync(this.serviciosFilePath, dataToString);
    },

 // ************ Genereated ID ************
    generateId: function(){
		return Math.random().toString(36).substr(2, 18);
	},

 // ************ Find All ************
    findAllServices: function(){
        return JSON.parse(this.readFileServices());
    },

 // ************ Servicios Filtros ****************
    findAllRecomendados: function(){
            
        let services = this.findAllServices();

        let serviceRecomendado = services.filter(function(service){
            return service.visitados != false;
        });

        return serviceRecomendado;
    }, 
    findMasVendidos: function(){
        let services = this.findAllServices();

        let serviceMasVendidos = services.filter(function(service){
            return service.vendido  > 10;
        });

        return serviceMasVendidos;
    }

 // ************ Create Service ***************
   
}

module.exports = serviceServicios;

