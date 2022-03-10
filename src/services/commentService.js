// ************ Require's ************
const req = require("express/lib/request");
const fs = require('fs');
const path = require('path');

// ************ Service ************

const serviceComentarios = {
    
    // ************ Rutas  ************
    commentFilePath: path.join(__dirname, '../data/commentDataBase.json'),
    
    // ************ Read Files ************
    readFileComments: function(){
		return fs.readFileSync(this.commentFilePath, "utf-8");
	},

 // ************ Wirte Files ************
    writeFileComments: function(array){
        let dataToString = JSON.stringify(array, null, 4)
        fs.writeFileSync(this.commentFilePath, dataToString);
    },

 // ************ Genereated ID ************
    generateId: function(){
		return Math.random().toString(36).substr(2, 18);
	},

 // ************ Find All ************
    findAllComments: function(){
        return JSON.parse(this.readFileComments());
    },

     // ************ Create Comments ************
     createComment: function(req){
        let comments = this.findAllComments();
      
        let commentId = this.generateId();
        let comment = {
            id: commentId,
            ...req.body
        }
        comments.push(comment);
        this.writeFileComments(comments);
     }
}

module.exports = serviceComentarios;

