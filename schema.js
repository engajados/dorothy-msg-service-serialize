const Sequelize = require('sequelize');
const db = require('./database');

module.exports.createStore = () => {

    this.sequelize = db.instance();

    const Message = this.sequelize.define('message', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        room: {
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.JSONB,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
    });

    return { Message };
};