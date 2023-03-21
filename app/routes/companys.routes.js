const controller = require("../controllers/companys");

//Там что то было про исключения еще, тут мы можем валидировать запросы/заголовки/навешивать какие нибудь мидлварены
module.exports = function (app) {
    app.post('/companys', controller.get);
   
}