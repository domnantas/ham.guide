const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const options = {
  uri: `http://www.qrz.lt/lhfa/index.php/lt/lhf-list/97-visi-piliakalniai`,
  transform: function(body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(function($) {
    let data = $('.item-page table tbody tr')
      .map((i, el) => {
        return {
          category: $(el)
            .children()
            .eq(0)
            .text()
            .split('-')[0],
          id: $(el)
            .children()
            .eq(0)
            .text()
            .split('-')[1],
          city: $(el)
            .children()
            .eq(1)
            .text(),
          municipality: $(el)
            .children()
            .eq(2)
            .text(),
          coordinates: convertDMStoDD(
            $(el)
              .children()
              .eq(3)
              .text()
              .replace(',', '.')
          ),
          qth: $(el)
            .children()
            .eq(4)
            .text()
            .trim(),
          wal: $(el)
            .children()
            .eq(5)
            .text()
            .trim(),
          lyff: $(el)
            .children()
            .eq(6)
            .text()
            .trim()
        };
      })
      .get();

    fs.writeFileSync('ARManual/.vuepress/data/lhfa.json', JSON.stringify(data, null, 2));
    console.log("Scraped DXCC successfuly");
  })
  .catch(function(err) {
    console.log(err);
  });

// Convert Degrees Minutes Seconds coordinates to Decimal Degrees
// N54* 40' 58.6" E25* 07' 30.0" -> { latitude: 54.682944444444445, longitude: 25.125 }
const convertDMStoDD = DMS => {
  const parsedDMS = DMS.match(/([NSEW])|([.\d])+/g);
  const formattedDMS = {
    latitude: {
      direction: parsedDMS[0],
      degrees: parseFloat(parsedDMS[1]),
      minutes: parseFloat(parsedDMS[2]),
      seconds: parseFloat(parsedDMS[3])
    },
    longitude: {
      direction: parsedDMS[4],
      degrees: parseFloat(parsedDMS[5]),
      minutes: parseFloat(parsedDMS[6]),
      seconds: parseFloat(parsedDMS[7])
    }
  };

  return {
    latitude:
      (formattedDMS.latitude.degrees +
        formattedDMS.latitude.minutes / 60 +
        formattedDMS.latitude.seconds / 3600) *
      (formattedDMS.latitude.direction === 'N' ? 1 : -1),
    longitude:
      (formattedDMS.longitude.degrees +
        formattedDMS.longitude.minutes / 60 +
        formattedDMS.longitude.seconds / 3600) *
      (formattedDMS.longitude.direction === 'E' ? 1 : -1)
  };
};
