const cheerio = require('cheerio');
const request = require('request');

var parseSite = (site: string, saveAlbums: ((arg0: any[]) => void)) => {
  request(site, function(err: any, res: any, body: any) {
    const $ = cheerio.load(body);

    const list = $('ul').text();
    const lines = list.split('\n');
    const withoutEmptyStrings = lines.filter(function (item: any) {
      return item != '';
    });
    const trimmed = withoutEmptyStrings.map((str: string) => str.trim());

    let rating = 0.0;
    let albums: any[] = [];

    trimmed.forEach((line: string) => {
      if (line === '9.5/10' || line === '9/10' || line === '8.5/10' || line === '8/10' || line === '7.5/10' || line === '7/10') {
        rating = parseFloat(line.split('/10')[0]);
      } else {
        const albumInfo = line.split(/(: | \(|\))/g);

        albums.push({
            artist: albumInfo[0] || '',
            album: albumInfo[2] || '',
            rating: rating,
            genre: 'rock',
            year: albumInfo[4] || ''
        });
      }
    });

    saveAlbums(albums.filter(a => (a.rating != '7.5' && a.rating != '7')));
  });
}

export { parseSite };