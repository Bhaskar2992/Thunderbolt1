const axios = require("axios");
const admin = require("firebase-admin");
const credentials = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

const firebaseApiKey = "AIzaSyCwJBldj_gqhU6FSIhRmw6FxroorEasgJE"; // Replace with your Firebase Web API Key

class AuthManager {
  constructor() {}

  // Login method using Firebase Authentication REST API
  async login(req) {
    const { email, password } = req.body;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;

    try {
      const response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });

      const { idToken, localId, email: userEmail } = response.data;
      req.session.userId = { idToken, uid: localId, email: userEmail };
      req.session.save();

      return 1; // Success
    } catch (error) {
      console.error("Firebase login error:", error.response?.data || error.message);
      return error.response?.data?.error?.message || "Login failed"; // Error message
    }
  }

  // Signup method using Firebase Admin SDK
  async signup(req) {
    const { name, email, phone } = req.body;
    let result = 0;

    try {
      const userRecord = await admin.auth().createUser({
        email,
        emailVerified: false,
        phoneNumber: `+91${phone}`,
        password: "MAXOUT",
        displayName: name,
        disabled: false,
      });

      await db.collection("users")
        .doc(userRecord.uid)
        .set({ avatarId: 1, countNL: 0, countKIV: 0, countLL: 0 });

      result = 1; // Success
    } catch (error) {
      console.error("Signup error:", error.message);
      result = error.message; // Error message
    }

    return result;
  }

  // Check if the provided password is correct
  async isCorrectPass(req) {
    const { pass } = req.body;
    const email = req.session.userId.email;

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;

    try {
      const response = await axios.post(url, {
        email,
        password: pass,
        returnSecureToken: true,
      });

      return response.data.localId ? true : false; // Return true if login is successful
    } catch (error) {
      console.error("Password verification error:", error.response?.data || error.message);
      return false; // Return false if login fails
    }
  }

  // Update user details
  async updateUser(req) {
    const { name, phone } = req.body;
    const uid = req.session.userId.uid;
    let retCode = "";

    try {
      const userRecord = await admin.auth().updateUser(uid, {
        phoneNumber: phone.toString(),
        displayName: name,
      });

      req.session.userId = userRecord;
      req.session.save();

      retCode = "success";
    } catch (error) {
      console.error("Error updating user:", error);
      retCode = error.message;
    }

    return retCode;
  }

  // Change user password
  async changePass(req) {
    const { pass } = req.body;
    const uid = req.session.userId.uid;
    let retCode = "";

    try {
      const userRecord = await admin.auth().updateUser(uid, {
        password: pass,
      });

      req.session.userId = userRecord;
      req.session.save();

      retCode = "success";
    } catch (error) {
      console.error("Error updating password:", error);
      retCode = error.message;
    }

    return retCode;
  }

  // Delete user (method not implemented)
  deleteUser(req) {
    // Implementation goes here
  }
}

module.exports = new AuthManager();
