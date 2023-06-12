const gorevModel = require("./gorev-model");

async function checkGorevId(req, res, next) {
  try {
    let id = req.params.id || req.body.GorevId;
    const isExistGorev = await gorevModel.getById(id);
    if (!isExistGorev) {
      res.status(404).json({ message: "görev bulunamadı" });
    } else {
      req.currentGorev = isExistGorev;
      next();
    }
  } catch (error) {
    next(error);
  }
}
async function checkPayload(req, res, next) {
  try {
    let { Adi } = req.body;
    if (!Adi) {
      res.status(400).json({ message: "görev adı boş olamaz" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
module.exports = { checkGorevId, checkPayload };
