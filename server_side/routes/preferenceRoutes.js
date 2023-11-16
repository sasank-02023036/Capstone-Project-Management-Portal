const express = require('express');
const router = express.Router();
const studentAuthentication = require("../middleware/studentAuthentication");

const preferenceController = require("../controllers/preferrenceController");

router.get('/preference/:courseId', preferenceController.getPreferencesByCourse);

router.put('/preference' , studentAuthentication ,preferenceController.updatePreference);
// Update the route to handle the submission of preferences
router.post('/preference', studentAuthentication, preferenceController.createOrUpdatePreference);

module.exports = router;