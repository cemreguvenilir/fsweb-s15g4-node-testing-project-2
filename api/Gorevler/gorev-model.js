const db = require("../../data/db-config");

function getAll() {
  return db("Gorevler");
}
function getById(gorevId) {
  return db("Gorevler").where("GorevId", gorevId).first();
}
async function insert(gorevModel) {
  const [insertedId] = await db("Gorevler").insert(gorevModel);
  return getById(insertedId);
}

module.exports = {
  getAll,
  getById,
  insert,
};
