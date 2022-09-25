const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://practica:Adrian.1426@cluster0.rdmum.mongodb.net/dbscraping?retryWrites=true&w=majority';

mongoose.connect(connectionString, { useNewUrlParser: true });

const CatModel = mongoose.model("Cat", { name: String });

const kitty = new CatModel({ name: 'Kawakito' });
kitty.save()
  .then(result => console.log("save: ", result))
  .catch(err => console.log(err));