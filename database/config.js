const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Base Datos Online');
    } catch(error) {
        console.log(error);
        throw new Error('Error al iniciar Base Datos');
    }
};

module.exports = { dbConnection };