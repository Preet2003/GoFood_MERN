const express = require('express');
const router = express.Router();

router.post('/foodData', async (req, res) => {
    try {
        res.send([global.food_items,global.food_cateogary]);
    }
    catch (err) {
        console.error(err.message);
        res.send("Server Error");
    }
});

module.exports = router;