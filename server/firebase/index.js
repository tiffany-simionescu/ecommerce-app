// Project Overview Gear > Project Settings > Service Accounts > Node.js
// Generate Key and save at '../config/fbServiceAccountKey.json'

var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://ecommerce-84b51.firebaseio.com",
  // databaseURL: "http://localhost:8000",
  databaseURL: process.env.DATABASE,
});

module.exports = admin;