const Result = require("../models/result");

const getResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getResult };
