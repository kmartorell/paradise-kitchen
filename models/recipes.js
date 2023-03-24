const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const RecipeSchema = new Schema({
Id: {
  type: Number
},
Name: {
  type: String,
  required: true
},
Minutes: {
  type: Number,
  required: true
},
Submitted: {
  type: Date,
  required: true
},
Tags: {
  type: Array,
  required: true
},
Nutrition: {
  type: Array,
  required: true
},
N_Steps: {
  type: Number,
  required: true
},
Steps: {
  type: Array,
  required: true
},
Description: {
  type: String,
  required: true
},
Ingredients: {
  type: Array,
  required: true
},
N_Ingredients: {
  type: Number,
  required: true
},
CreatedBy: {
  type: Number,
  required: true
},
});
module.exports = Recipe = mongoose.model('Recipe', RecipeSchema);