const sendResponse = (res, statusCode, success, data, error = null) => {
    res.status(statusCode).json({
        success,
        data,
        error
    });
};

module.exports = sendResponse;
