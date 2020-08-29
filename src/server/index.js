const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const auth = require('./auth');

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/auth', auth);

function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode == 200 ? 500 : res.statusCode);
    res.json({
        message: err.message,
        stack: err.stack
    });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8181;
app.listen(port, () => {
    console.log(`listening at http:/localhost:${port}`);
})