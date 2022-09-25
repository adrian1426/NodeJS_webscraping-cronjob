const mongoose = require('mongoose');
const axios = require('axios').default;
const cheerio = require('cheerio');
const { MONGO_URI } = require('./config');

mongoose.connect(MONGO_URI, { useNewUrlParser: true });

const loadWebSiteCnn = async () => {
  const htmlCnn = await axios.get('https://cnnespanol.cnn.com/');
  const loadHtml = cheerio.load(htmlCnn.data);
  const titlesCnn = loadHtml('.news__title');

  titlesCnn.each((index, element) => {
    const breakingNew = {
      title: loadHtml(element).text().trim(),
      link: loadHtml(element).children().attr('href')
    };

    console.log(breakingNew)
  });
};

loadWebSiteCnn();