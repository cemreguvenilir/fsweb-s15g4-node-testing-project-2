const router = require("express").Router();
const gorevModel = require("./gorev-model");
const mw = require("./gorev-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allGorev = await gorevModel.getAll();
    res.json(allGorev);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", mw.checkGorevId, (req, res, next) => {
  try {
    res.json(req.currentGorev);
  } catch (error) {
    next(error);
  }
});
router.post("/", mw.checkPayload, async (req, res, next) => {
  try {
    let model = { Adi: req.body.Adi, Aciklama: req.body.Aciklama };
    const inserted = await gorevModel.insert(model);
    res.status(201).json(inserted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
