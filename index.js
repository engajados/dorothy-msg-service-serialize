const Sequelize = require('sequelize');
const { createStore } = require('./schema');

class SerializeAdapter {
    constructor() {
        this.store = createStore();
    }

    async addMessage(message) {
        await this.store.Message.create(message);  
    }

    async getRoomMessages(room, threshold, limit) {
        const Op = Sequelize.Op;

        const where = {
            room
        };

        if(threshold) {
            where.id = {
                [Op.lt]: threshold
            };
        }

        const messages = await this.store.Message.findAll({
            where,
            limit: limit + 1,
            order: [['createdAt', 'DESC']]
        })
        messages.reverse();

        let hasMore = false;
        let messageRef = null;
        if(messages.length > 10) {
            messages.shift();
            messageRef = messages[0].id;
            hasMore = true;
        }

        return {
            messages,
            hasMore,
            messageRef,
        };
    }
}

module.exports = new SerializeAdapter;