const express = require('express');
const router = express.Router();
const preferenceController = require("../controllers/preferrenceController");

router.get('/preference/:name', preferenceController.getPreferencesByCourse);

router.put('/preference' , preferenceController.updatePreference);

module.exports = router;