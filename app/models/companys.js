module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define('Company', {
        inn: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        value: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });
   
    return Company
}