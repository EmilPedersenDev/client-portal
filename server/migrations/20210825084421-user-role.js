module.exports = {
  async up(db, client) {
    await db.collection("users").updateMany({}, { $set: { role: "User" } });
  },

  async down(db, client) {
    await db.collection("users").updateMany({}, { $unset: { role: null } });
  },
};
