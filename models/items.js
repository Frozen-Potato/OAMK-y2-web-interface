const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.sequelize.define(
    'items',
    {
        itemId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        images: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL(10,2)
        },
        postDate: {
            type: Sequelize.DATEONLY
        },
        sellerName: {
            type: Sequelize.STRING
        },
        contactNumber: {
            type: Sequelize.BIGINT
        }
    }, {
        timestamps: false
    }
);