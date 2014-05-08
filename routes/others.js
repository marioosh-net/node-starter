module.exports = [
    {method: 'GET', path: '/static/{path*}', handler: {directory: {path: './static'}}}
]