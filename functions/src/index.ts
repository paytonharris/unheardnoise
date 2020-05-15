import * as functions from 'firebase-functions';
const axios = require('axios');
const admin = require('firebase-admin');
admin.initializeApp();
import { youtubeApiKey } from './secureKeys';

let db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
  const message = "Let the noise become!";
  response.statusCode = 200;
  //response.setHeader('Content-Type', 'application/json');

  response.send(message);
});

export const createnoise = functions.https.onRequest((request, response) => {
  if (request.method === "POST") {
    try {
      let artist = request.body.artist || 'John Cale';
      let album = request.body.album || 'The Academy in Peril';
      let genre = request.body.genre || 'Rock';
      let rating = request.body.rating || 6;
  
      let data = {
        artist: artist,
        album: album,
        genre: genre,
        rating: rating
      };

      const artistEncoded = artist.replace(/\s/g, '+');
      const albumEncoded = album.replace(/\s/g, '+');

      console.log(`${artistEncoded}&${albumEncoded}`);
      console.log(data);

      db.collection('newalbums').doc(`${artistEncoded}&${albumEncoded}`).set(data);
    
      response.statusCode = 200;
      response.send("got it");
    } catch (e) {
      response.statusCode = 500;

      response.send("Something went wrong.");
    }
  } else {
    let newalbums = db.collection('newalbums');
    newalbums.get()
    .then((snapshot: any) => {

      let myString = '';
      let queryString = '';

      snapshot.forEach((doc: any) => {
        myString += JSON.stringify(doc.data());
        queryString = `${doc.data().artist} ${doc.data().album}`;
      });

      const promiseData = getYoutubeVideoForKeyword(queryString);
      promiseData.then(data => {
        const videoLink = `https://www.youtube.com/watch?v=${data.data.items[0].id.videoId}`;
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

  return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(keyword)}&key=${youtubeApiKey}`);
};