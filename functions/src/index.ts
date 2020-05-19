import * as functions from 'firebase-functions';
const axios = require('axios');
const admin = require('firebase-admin');
admin.initializeApp();
import { youtubeApiKey } from './secureKeys';
import { parseSite } from './siteParser';

const db = admin.firestore();

export const parseMusicPage = functions.https.onRequest((request, response) => {
  try {
    if (request.method === "POST") {
      parseSite(request.body.site, (albums) => {
        albums.forEach((alb: any) => {
          saveAnObject(alb);
        });
      });
    }
  
    response.statusCode = 200;
    response.send("Received request");
  } catch (e) {
    console.log(e);

    response.statusCode = 500;
    response.send("Something went wrong");
  }
});

export const createnoise = functions.https.onRequest((request, response) => {
  if (request.method === "POST") {
    if (Array.isArray(request.body)) {
      request.body.forEach((obj: any) => saveAnObject(obj));
    } else {
      saveAnObject(request.body);
    }

    response.statusCode = 200;
    response.send("got it");
  } else {
    response.set('Access-Control-Allow-Origin', '*');

    const newalbums = db.collection('newalbums');
    newalbums.where('randomNumber', '<=', getRandomInt(50000)).orderBy('randomNumber', 'desc').limit(1).get()
    .then((snapshot: any) => {

      let queryString = '';

      snapshot.forEach((doc: any) => {
        queryString = `${doc.data().artist} ${doc.data().album}`;
      });

      console.log(queryString);

      const promiseData = getYoutubeVideoForKeyword(queryString);
      promiseData.then(data => {
        console.log(JSON.stringify(data.data.items, undefined, 2));

        const videoLink = `${data.data.items[0].id.videoId}`;
        response.statusCode = 200;
        response.send(videoLink);
      })
      .catch(e => {
        console.log(e);
        response.statusCode = 500;
        response.send("Something went wrong");
      });
    });
  }
});

const getYoutubeVideoForKeyword = async (keyword: string) => {
  console.log(encodeURIComponent(keyword));

  return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(keyword)}&key=${youtubeApiKey}&type=video&maxResults=1`);
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const saveAnObject = (obj: any) => {
  try {
    const artist = obj.artist || 'John Cale';
    const album = obj.album || 'The Academy in Peril';
    const genre = obj.genre || 'Rock';
    const rating = obj.rating || 6;
    const randomNumber = getRandomInt(50000);

    const data = {
      artist: artist,
      album: album,
      genre: genre,
      rating: rating,
      randomNumber: randomNumber
    };

    const artistEncoded = artist.replace(/\s/g, '+');
    const albumEncoded = album.replace(/\s/g, '+');

    console.log(`${artistEncoded}&${albumEncoded}`);
    console.log(data);

    db.collection('newalbums').doc(`${artistEncoded}&${albumEncoded}`).set(data);

    return true;
  } catch (e) {
    return false;
  }
};