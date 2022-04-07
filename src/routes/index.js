const indexRouter = require('./web');

function route(app) {
    app.use('/', indexRouter);      
}

module.exports = route;
