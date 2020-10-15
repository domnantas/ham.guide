const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const options = {
  uri: `http://ut7ut.com/index.php/dxcc-countries-list/`,
  transform: function(body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(function($) {
    let data = $('#tablepress-DXCC tbody tr')
      .map((i, el) => ({
        prefix: $(el)
          .children('.column-1')
          .text(),
        name: $(el)
          .children('.column-2')
          .text(),
        continent: $(el)
          .children('.column-3')
          .text(),
        ituZone: $(el)
          .children('.column-4')
          .text(),
        cqZone: $(el)
          .children('.column-5')
          .text(),
        note: $(el)
          .children('.column-6')
          .text()
      }))
      .get();

    fs.writeFileSync('ARManual/.vuepress/data/dxcc.json', JSON.stringify(data, null, 2));
    console.log("Scraped DXCC successfuly");
  })
  .catch(function(err) {
    console.log(err);
  });
