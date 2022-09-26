const mongoose = require('mongoose');
const axios = require('axios').default;
const cheerio = require('cheerio');
const cron = require('node-cron');
const { MONGO_URI } = require('./config');
const { BreakingNew } = require('./model');

mongoose.connect(MONGO_URI, { useNewUrlParser: true });

const loadWebSiteCnn = async () => {
  console.log("Iniciando cron job - loadWebSiteCnn");
  const htmlCnn = await axios.get('https://cnnespanol.cnn.com/');
  const loadHtml = cheerio.load(htmlCnn.data);
  const titlesCnn = loadHtml('.news__title');

  titlesCnn.each((index, element) => {
    const breakingNew = {
      title: loadHtml(element).text().trim(),
      link: loadHtml(element).children().attr('href')
    };

    BreakingNew.create([breakingNew]);
  });
};

cron.schedule('* * * * *', loadWebSiteCnn);