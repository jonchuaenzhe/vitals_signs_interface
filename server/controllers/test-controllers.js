const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const TestData = require("../models/testData");

const createTestData = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(
            "Invalid post format, it should be a string with the property 'value' in a json object.",
            422
        );
    }

    const { timestamp, value } = req.body;
    const createdTestData = new TestData({
        timestamp,
        value,
    });

    try {
        await createdTestData.save();
    } catch (err) {
        const error = new HttpError(
            "Posting dataset failed, please try again.",
            500
        );
        return next(error);
    }

    res.status(201).json({ createdTestData });
};

const getTestData = async (req, res, next) => {
    let testData;
    try {
        testData = await TestData.find();
    } catch (err) {
        const error = new HttpError("Could not find a dataset.", 500);
        return next(error);
    }

    if (!testData) {
        const error = new HttpError("Could not find a dataset.", 404);
        return next(error);
    }

    let docArray = testData.map((data) => {
        return data.toObject({ getters: true });
    });
    res.json({ data: docArray });
};

const deleteTestData = async (req, res, next) => {
    let allTestData;
    try {
        allTestData = await TestData.find();
    } catch (err) {
        const error = new HttpError("Could not delete data.", 500);
        return next(error);
    }

    try {
        await allTestData.deleteMany({});
    } catch (err) {
        const error = new HttpError("Could not delete data.", 500);
        return next(error);
    }

    res.status(200).json({ message: "Deleted all test data." });
};

exports.createTestData = createTestData;
exports.getTestData = getTestData;
exports.deleteTestData = deleteTestData;
