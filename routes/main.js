var main = require('../controllers/main');
module.exports = [
    {method: 'GET', path: '/', handler: main.home},
    {method: 'POST', path: '/add', handler: main.add},
    {method: 'GET', path: '/list', handler: main.list},
    {method: 'GET', path: '/del/{id?}', handler: main.del}
]