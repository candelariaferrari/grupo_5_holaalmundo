module.exports = (sequelize, dataTypes) => {
    let alias = 'Comment'; // esto debería estar en singular
    let cols = {
        idComment: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombres: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: "Comment",
        timestamps: false,
    }

    const Comment = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos
    /*Comment.associate = function(models){
        Comment.belongsTo(models.User, {
            as: "user",
            foreignKey: "idUsuarioFK"
        });
    }*/

    return Comment;

};