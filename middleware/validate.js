const validator = require('../helpers/validate');

const saveEvent = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    location: 'required|string',
    date: 'required|date',
    time: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveEvent
};