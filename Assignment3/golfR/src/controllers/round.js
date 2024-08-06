const roundService = require("../services/round");
const requestHandler = require("../utils/requestHandler");
const debug = require("debug")("app:roundController");

const getAll = requestHandler(async (req, res) => {
  const rounds = await roundService.getAll(req.user._id);
  res.json({ data: rounds });
});

const getOne = requestHandler(async (req, res) => {
  debug({ reqID: req.user._id });

  const round = await roundService.getOne(req.params.id, req.user._id);
  res.json({ data: round });
});

const create = requestHandler(async (req, res) => {
  const round = await roundService.create(req.body, req.user._id);
  res.status(201).json({ data: round });
});

const updateOne = requestHandler(async (req, res) => {
  debug("in controller",req.user._id)

  const round = await roundService.updateOne(req.params.id, req.sanitizedBody, req.user._id);
  res.json({ data: round });
});

const deleteOne = requestHandler(async (req, res) => {
  const round = await roundService.deleteOne(req.params.id, req.user._id);
  res.json({ data: round });
});

module.exports = { getAll, getOne, create, updateOne, deleteOne };
