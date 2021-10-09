const Sequelize = require('sequelize');

const sequelize = new Sequelize('robtix','root','P@$$w0rd',{
    repositoryMode: true,
    dialect:'mysql',
    host:'localhost'

  
 
   
});






module.exports = sequelize;
