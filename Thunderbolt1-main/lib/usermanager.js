const admin = require("firebase-admin");

const db = admin.firestore();

class UserManager {
  constructor() {}

  async getAvatarID(uid) {
    const snap = await db.collection("users").doc(uid.toString()).get();
    return snap.data().avatarId;
  }

  async setAvatarID(uid, avID) {
    await db.collection("users").doc(uid.toString()).update({ avatarId: avID });
  }

  async getCounts(uid) {
    const snap = await db.collection("users").doc(uid.toString()).get();
    const dataCount = {
      countNL: snap.data().countNL,
      countKIV: snap.data().countKIV,
      countLL: snap.data().countLL,
    };
    return dataCount;
  }

  async setCountNL(uid, count) {
    await db.collection("users").doc(uid.toString()).update({ countNL: count });
  }

  async setCountKIV(uid, count) {
    await db
      .collection("users")
      .doc(uid.toString())
      .update({ countKIV: count });
  }

  async setCountLL(uid, count) {
    await db.collection("users").doc(uid.toString()).update({ countLL: count });
  }
}

const userm = new UserManager();

module.exports = userm;
