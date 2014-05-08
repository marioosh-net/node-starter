var main = require('../controllers/main');
module.exports = [
    {method: 'GET', path: '/', handler: main.home}
]