const admin = require("firebase-admin");
const credentials = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const firebase = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

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
