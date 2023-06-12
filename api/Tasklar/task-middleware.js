const taskModel = require("./task-model");

async function checkTaskId(req, res, next) {
  try {
    const isExistTask = await taskModel.getById(req.params.id);
    if (!isExistTask) {
      res.status(404).json({ message: "task bulunamadı" });
    } else {
      req.currentTask = isExistTask;
      next();
    }
  } catch (error) {
    next(error);
  }
}
async function checkPayload(req, res, next) {
  try {
    let { Adi, GorevId } = req.body;
    if ((!Adi, GorevId === undefined)) {
      res.status(404).json({ message: "Eksik alan var" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkTaskId,
  checkPayload,
};
