const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const EcgData = require("../models/ecgData");

const getAllEcgData = async (req, res, next) => {
  let ecgData;
  try {
    ecgData = await EcgData.find();
  } catch (err) {
    const error = new HttpError("Could not find a dataset.", 500);
    return next(error);
  }

  if (!ecgData) {
    const error = new HttpError("Could not find a dataset.", 404);
    return next(error);
  }

  let docArray = ecgData.map((data) => {
    return data.toObject({ getters: true });
  });
  docArray = docArray.map((data) => {
    data.ecg_data = [
      ...data.ecg_data[0],
      ...data.ecg_data[1],
      ...data.ecg_data[2],
      ...data.ecg_data[3],
    ];
    return data;
  });
  res.json({ data: docArray });
};

const getEcgData = async (req, res, next) => {
  const ecgDataId = req.params.eid;

  let ecgData;
  try {
    ecgData = await EcgData.findById(ecgDataId);
  } catch (err) {
    const error = new HttpError(
      "Could not find a dataset for the provided id.",
      500
    );
    return next(error);
  }

  if (!ecgData) {
    const error = new HttpError(
      "Could not find a dataset for the provided id.",
      404
    );
    return next(error);
  }

  const dataObject = ecgData.toObject({ getters: true });
  dataObject.ecg_data = [
    ...dataObject.ecg_data[0],
    ...dataObject.ecg_data[1],
    ...dataObject.ecg_data[2],
    ...dataObject.ecg_data[3],
  ];

  res.json({ data: dataObject });
};

const createEcgData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(
      "Invalid post format, it should be an array with the property 'ecg_data' in a json object.",
      422
    );
  }

  const { sample_no, timestamp, ecg_data } = req.body;
  const createdEcgData = new EcgData({
    sample_no,
    timestamp,
    ecg_data,
  });

  try {
    await createdEcgData.save();
  } catch (err) {
    const error = new HttpError(
      "Posting dataset failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ createdEcgData });
};

const updateEcgData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(
      "Invalid post format, it should be an array with the property 'ecg_data' in a json object.",
      422
    );
  }

  const { ecg_data } = req.body;
  const ecgId = req.params.eid;

  let updatedEcgData;
  try {
    updatedEcgData = await EcgData.findById(ecgId);
  } catch (err) {
    const error = new HttpError("Could not update data.", 500);
    return next(error);
  }

  updatedEcgData.ecg_data = ecg_data;

  try {
    await updatedEcgData.save();
  } catch (err) {
    const error = new HttpError("Could not update data.", 500);
    return next(error);
  }

  res
    .status(200)
    .json({ updated_data: updatedEcgData.toObject({ getters: true }) });
};

const deleteEcgData = async (req, res, next) => {
  const ecgId = req.params.eid;

  let ecgData;
  try {
    ecgData = await EcgData.findById(ecgId);
  } catch (err) {
    const error = new HttpError("Could not delete data.", 500);
    return next(error);
  }

  try {
    await ecgData.remove();
  } catch (err) {
    const error = new HttpError("Could not delete data.", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted Ecg data." });
};

const deleteAllEcgData = async (req, res, next) => {

  let allEcgData;
  try {
    allEcgData = await EcgData.find();
  } catch (err) {
    const error = new HttpError("Could not delete data.", 500);
    return next(error);
  }

  try {
    await allEcgData.deleteMany({});
  } catch (err) {
    const error = new HttpError("Could not delete data.", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted all Ecg data." });
};

exports.getEcgData = getEcgData;
exports.getAllEcgData = getAllEcgData;
exports.createEcgData = createEcgData;
exports.updateEcgData = updateEcgData;
exports.deleteEcgData = deleteEcgData;
exports.deleteAllEcgData = deleteAllEcgData;
