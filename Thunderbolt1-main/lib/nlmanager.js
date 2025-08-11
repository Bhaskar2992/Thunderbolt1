const admin = require("firebase-admin");
const { Prospect } = require("./models/prospect");
const userm = require("./usermanager");

const db = admin.firestore();

class NLManager {
  constructor() {}

  async getData(uid, collection = "namelist") {
    const snapshot = await db
      .collection("users")
      .doc(uid)
      .collection(collection)
      .listDocuments();

    const docArray = [];

    for (let i = 0; i < snapshot.length; i++) {
      const snap = await db
        .collection("users")
        .doc(uid)
        .collection(collection)
        .doc(snapshot[i].id)
        .get();

      const p = new Prospect({
        id: snap.data().id,
        name: snap.data().name,
        week: snap.data().week,
        zone: snap.data().zone,
        city: snap.data().city,
        chatting: snap.data().chatting,
        socialMedia: snap.data().socialMedia,
        stage1: snap.data().stage1,
        stage1Week: snap.data().stage1Week,
        stage2: snap.data().stage2,
        stage2Week: snap.data().stage2Week,
        info: snap.data().info,
        infoWeek: snap.data().infoWeek,
        infoResponse: snap.data().infoResponse,
        reinfo: snap.data().reinfo,
        reinfoWeek: snap.data().reinfoWeek,
        reinfoResponse: snap.data().reinfoResponse,
        meetup: snap.data().meetup,
        invi: snap.data().invi,
        inviWeek: snap.data().inviWeek,
        inviResponse: snap.data().inviResponse,
        plan: snap.data().plan,
        planWeek: snap.data().planWeek,
        planStatus: snap.data().planStatus,
        remarks: snap.data().remarks,
      });

      docArray.push(p);
    }

    // console.log(docArray);
    return docArray;
  }

  async getSingleProspectData(uid, id, collection = "namelist") {
    const snap = await db
      .collection("users")
      .doc(uid)
      .collection(collection)
      .doc(id.toString())
      .get();
    return snap.data();
  }

  async addProspect(uid, prospect, collection = "namelist") {
    await db
      .collection("users")
      .doc(uid)
      .collection(collection)
      .doc(prospect.id.toString())
      .set(prospect);

    const { countNL, countKIV, countLL } = await userm.getCounts(uid);

    if (collection == "namelist") {
      await userm.setCountNL(uid, parseInt(countNL) + 1);
    } else if (collection == "kiv") {
      await userm.setCountKIV(uid, parseInt(countKIV) + 1);
    } else {
      await userm.setCountLL(uid, parseInt(countLL) + 1);
    }
  }

  async removeProspect(uid, id, collection = "namelist") {
    await db
      .collection("users")
      .doc(uid)
      .collection(collection)
      .doc(id.toString())
      .delete();
    const { countNL, countKIV, countLL } = await userm.getCounts(uid);

    if (collection == "namelist") {
      await userm.setCountNL(uid, parseInt(countNL) - 1);
    } else if (collection == "kiv") {
      await userm.setCountKIV(uid, parseInt(countKIV) - 1);
    } else {
      await userm.setCountLL(uid, parseInt(countLL) - 1);
    }
  }

  async updateProspect(
    uid,
    id,
    fieldName,
    value,
    type = "str",
    collection = "namelist"
  ) {
    if (type == "str") {
      var userJson = '{"' + fieldName + '" : "' + value + '"}';
    } else {
      var userJson = '{"' + fieldName + '" : ' + value + "}";
    }

    // console.log(userJson);
    const obj = JSON.parse(userJson);
    await db
      .collection("users")
      .doc(uid)
      .collection(collection)
      .doc(id.toString())
      .update(obj);
  }

  async transfer(uid, id, fromCollection, toCollection) {
    //get data
    const data = await this.getSingleProspectData(uid, id, fromCollection);
    const { countNL, countKIV, countLL } = await userm.getCounts(uid);

    //add data in toCollection

    await db
      .collection("users")
      .doc(uid)
      .collection(toCollection)
      .doc(id.toString())
      .set(data);
    if (fromCollection == "namelist") {
      await userm.setCountNL(uid, parseInt(countNL) - 1);
    } else if (fromCollection == "kiv") {
      await userm.setCountKIV(uid, parseInt(countKIV) - 1);
    } else {
      await userm.setCountLL(uid, parseInt(countLL) - 1);
    }

    //delete data in fromCollection

    await db
      .collection("users")
      .doc(uid)
      .collection(fromCollection)
      .doc(id.toString())
      .delete();
    if (toCollection == "namelist") {
      await userm.setCountNL(uid, parseInt(countNL) + 1);
    } else if (toCollection == "kiv") {
      await userm.setCountKIV(uid, parseInt(countKIV) + 1);
    } else {
      await userm.setCountLL(uid, parseInt(countLL) + 1);
    }
  }
}

const nlm = new NLManager();

module.exports = nlm;
