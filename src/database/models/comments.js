module.exports = (sequelize, dataTypes) => {
    let alias = 'Comment'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
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
        },
    };
    let config = {
        tableName: "Comment",
        timestamps: false,
    }

    const Comment = sequelize.define(alias,cols,config);
    return Comment;

};