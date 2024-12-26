const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const user = await verifyToken(req);
    const { id } = req.params;
    const document = await Model.findOneAndDelete({
      _id: id,
      userId: user._id,
    });

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ message: "Time Capsule deleted successfully" });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { release_date, ...otherFields } = req.body;

    let isReleased = true;
    if (release_date && new Date(release_date) > new Date()) {
      isReleased = false;
    }

    const document = await Model.findByIdAndUpdate(
      req.params.id,
      { ...otherFields, release_date, isReleased },
      { new: true }
    );

    if (!document) {
      return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const user = await verifyToken(req);
    const newDoc = await Model.create({
      userId: user._id,
      title: req.body.title,
      content: req.body.content,
      release_date: req.body.release_date,
      link: "capsule-" + Math.random().toString(36).substr(2, 8).toUpperCase(),
    });
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const user = await verifyToken(req);
    const { id } = req.params;
    const document = await Model.findOne({ _id: id, userId: user._id });
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const user = await verifyToken(req);
    const documents = await Model.find({ userId: user._id });
    if (documents.length === 0) {
      return next(new ApiError(`No documents for this id ${user._id}`, 404));
    }
    res.status(200).json({ results: documents.length, data: documents });
  });

exports.getCapsuleByLink = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findOne({ link: id });
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    } else if (document.release_date > new Date()) {
      return res.status(202).json({
        message:
          "Wait for the release date to finish before you can view the capsule.",
      });
    }
    res.status(200).json({ results: document.length, data: document });
  });
