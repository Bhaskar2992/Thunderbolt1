const admin = require("firebase-admin");

// Use environment variables for Firebase Admin SDK credentials
const adminCredentials = {
  type: "service_account",
  project_id: "thunderbolt1-ca6a5",
  private_key_id: "ffb613faf754d7a82275a2e1d925c61e0ccea260",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIFb/uQ8JwhMR/\nHrFFONHVmBGCl+PZCP1+ss+x0LrD2tH/CiSxKIGwmy/7XHAwiBLfDHJ23wYLRNR1\n/MkRKEWrJON0DFIx92yAhsbTN5WCw4rzCKsMMQvl+5/TbuIw/09KPiaiiiC2u+64\nV+3eVAHqMhX4/SFx2DVOt+Mg4q0UzELxanzgg4OrM0FOSOgPk+6W+QBP2smNJOHI\nmBvYPmaWZTp/n7owywWZSfIzOry0qevVpwDmgieNAwfF1tyG6hJc0LR6IwqkGDys\ndiJtYxey9bpLai4QCQMZCXrTNAXQLryt3y/eSVdTLu3l10wWdkV9PslWCP0IUqns\nwaDMd1JDAgMBAAECggEACli9lReh7WmgM6alqhu3FiGH/kXWfXmuiie6/8n4bnpZ\nU6P1o8ehdT2BLLFqB8hxmWEuZiFAUcLcbcGFsEJx39jHfk/IzFasILVXgMKmE54D\nCHBRUA8VO25YpHlebwQ02HUAUHVuHaT4QkYhwdZ8Rt0SL87/NMDmeMyfjSrLooCa\nIs5UNybrzy9pHkwnZXUg28QuMtw28PY4qvtaHxxD+NGkPrv/nszWxdhDZIcpyzBj\nXfKqQyVGhjBwkmqHcOIUmqjvQSk8b0WsZcb6EQQhSN/QQN2PHcCzcgNfAGs4FuX5\n0MxNsqKGvaJY7DB2C6NxOmEDaa8DFObNeIaRGbOaqQKBgQDtK3e3HEoVxmsmAwjX\n0N7vZrKPYtD9royYvQyutNLY6XHqs1zneunk2S1p6DewtilIg7y1zZFfJJhaJcaO\n/2BwZEAu1Dh7ouRhnmJY0D0Oc+A7zRQohg9cWYFYv9UjpoQFy4fVsrkGQ66jM0wn\n0xbFW6wB8bdlSSkWSzg4IhZjnwKBgQDX+IYlg1ORijHDFkb16U8STsou06BIuKmJ\nPMtS95QcgzTzKMb9Gk+Y9MJSTHsNoR+Ha784dCaEAqtIHMUnH+9YpIZoB6BCXslf\nD+/+fckGhtaPluZz4I5fKMVRdEUWH9eHw+PkVbKB2KdNmlebTeleTatrj1f0qmXn\nYN95t4tu3QKBgQCdYJqwBzWh/WhccOcNTqygb6VNQGUt8QWa1Nf1lkfTaBUPiLW9\nZPKPyQ05mb5apIYAeGpguWgdmkr+htKbURrNebidWnWglRa3MEJSbNwXGw1QoWUe\n/tZykXIjUig83+H7dnNMeqwMXB0mboO6aXhSveIF6D+qFkINaRyFIxl4QQKBgCMb\nHcspPsNQoGgizeQZSaYjMpBMDCjmA4DwZeiVn/jGhyvje/0WcsvdNV0lW3dKspJT\nvGCT2NLqkCcHrjB+62wQSlzMqItBVyBhudQ3ZB7weh4bHFjHrrzfJrvn13cSM/m4\nqOmr2Hls2z0tEoKHNqECpRO12ElIDYp/37OsVzjtAoGBALblLx5ISAGMJtzZAizS\nyfDM7x0LughOxGDai+qC+pZmaI86oFb+6YdYulwxJDMtMTx4Tln4SwIcujNGIIYT\nv+0msJfAoM5hwbDKmN98Ycw2MHQTt9QqAywZzttpQQ/Fk9GhIwWBS8rjna55CwlJ\nWCbPEho/fvhzqkdDvie18+Cr\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@thunderbolt1-ca6a5.iam.gserviceaccount.com",
  client_id: "116062581017266602926",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40thunderbolt1-ca6a5.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(adminCredentials),
});

const firebase = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

// Firebase Web SDK configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwJBldj_gqhU6FSIhRmw6FxroorEasgJE",
  authDomain: "thunderbolt1-ca6a5.firebaseapp.com",
  projectId: "thunderbolt1-ca6a5",
  storageBucket: "thunderbolt1-ca6a5.firebasestorage.app",
  messagingSenderId: "179073228948",
  appId: "1:179073228948:web:6679c904af018cb62cd481",
  measurementId: "G-3YRV3ESYF1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();

const db = admin.firestore();

class AuthManager {
  constructor() {}

  async login(req) {
    const { email, password } = req.body;
    var result = 0;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        req.session.userId = user; // Set session identifier
        result = 1;
        // res.redirect("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        result = error.message;
        // res.render("login");
      });
    return result;
  }

  async signup(req) {
    const { name, email, phone } = req.body;
    var result = 0;
    await admin
      .auth()
      .createUser({
        email: email,
        emailVerified: false,
        phoneNumber: "+91" + phone.toString(),
        password: "MAXOUT",
        displayName: name,
        disabled: false,
      })
      .then(async (userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        // console.log(userRecord);
        await db.collection("users")
          .doc(userRecord.uid.toString())
          .set({ avatarId: 1 , countNL : 0, countKIV : 0, countLL : 0});
        // req.session.userId = userRecord;
        result = 1;
        // res.redirect("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        result = error.message;
        // res.render("login");
      });

    return result;
  }

  async isCorrectPass(req) {
    const { pass } = req.body;
    const email = req.session.userId.email;

    var result = false;

    await signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        result = true;
      })
      .catch((error) => {
        result = false;
      });
    return result;
  }

  async updateUser(req) {
    const { name, phone } = req.body;
    const uid = req.session.userId.uid;

    var retCode = "";
    await admin
      .auth()
      .updateUser(uid, {
        phoneNumber: phone.toString(),
        displayName: name,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        // console.log("Successfully updated user", userRecord.toJSON());
        req.session.userId = userRecord;
        req.session.save();

        retCode = "success";
        console.log();
      })
      .catch((error) => {
        console.log("Error updating user:", error);
        retCode = error;
      });

    return retCode;
  }

  async changePass(req) {
    const { pass } = req.body;
    const uid = req.session.userId.uid;

    var retCode = "";
    await admin
      .auth()
      .updateUser(uid, {
        password: pass,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        // console.log("Successfully updated user", userRecord.toJSON());
        req.session.userId = userRecord;
        req.session.save();

        retCode = "success";
        console.log();
      })
      .catch((error) => {
        console.log("Error updating user:", error);
        retCode = error;
      });

    return retCode;
  }

  deleteUser(req) {}
}

const authMNGR = new AuthManager();

module.exports = authMNGR;
