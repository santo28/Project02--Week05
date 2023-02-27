const express = require('express');
const app = express();

// const express = require('express');
const router = express.Router();


// app.listen(port, () => {
// console.log(`Connected to DB and listening on ${port}`);
// });

router.use('/', require('./swagger'));
router.use('/events', require('./events'));

module.exports = router;
