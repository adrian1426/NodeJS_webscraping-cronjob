const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');


mongoose.connect(MONGO_URI, { useNewUrlParser: true });

const CatModel = mongoose.model("Cat", { name: String });

const kitty = new CatModel({ name: 'Kawakito2' });
kitty.save()
  .then(result => console.log("save: ", result))
  .catch(err => console.log(err));