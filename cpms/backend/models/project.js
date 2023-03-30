const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  resources: {
    type: String,
    required: true,
    default: ""
  },
  administrator: {
    type:String,
    required: true,
    default: ""
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;