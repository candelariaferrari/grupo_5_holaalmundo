// ************ Require's ************
const req = require("express/lib/request");
const fs = require('fs');
const path = require('path');

// ************ Service ************

const serviceHomeLogged = {
    
    // ************ Rutas  ************
    serviceFilePath: path.join(__dirname, '../data/homeGuest/serviciosDataBase.json'),
    profesoresFilePath: path.join(__dirname, '../data/homeGuest/profesoresDataBase.json'),

    // ************ Read Files ************
    readFileService: function(){
		return fs.readFileSync(this.serviceFilePath, "utf-8");
	},
    readFileProfesores: function(){
		return fs.readFileSync(this.profesoresFilePath, "utf-8")
	},

 // ************ Find All ****************
    findAllService: function(){
        return JSON.parse(this.readFileService());
    },
    findAllProfesores: function(){
        return JSON.parse(this.readFileProfesores());
    },

 // ************ Find All Recomendados ****************  
    findAllRecomendados: function(){
        
        let services = this.findAllService();

        let serviceRecomendado = services.filter(function(service){
            return service.visitados != false;
        });

        return serviceRecomendado;
    }, 
    findMasVendidos: function(){
        let services = this.findAllService();

        let serviceMasVendidos = services.filter(function(service){
            return service.vendido  > 10;
        });

        return serviceMasVendidos;

    }
}

module.exports = serviceHomeLogged;

