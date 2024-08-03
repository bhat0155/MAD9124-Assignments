const { ObjectId } = require("mongodb");
const Round = require("../models/round");
const { NotFoundError, ForbiddenError } = require("../utils/errors");
const { use } = require("passport");

const debug = require("debug")("app:roundServices");

const create = async (input, id) => {
  debug({ input }, { id });
  const isAutheticated = await Round.find({ user: id });
  if (isAutheticated == 0) {
    throw new ForbiddenError("Forbidden");
  }
  const round = new Round(input);
  await round.save();
  return round;
};

const getAll = async (id) => {
  const rounds = await Round.find({ user: id })
    .populate("course")
    .populate("user");

  debug({ id }, { rounds });

  if (rounds.length < 1) {
    throw new ForbiddenError("Forbidden");
  }
  return rounds;
};
const getOne = async (id, userId) => {
  const ifAuthenticated = await Round.find({ user: userId });

  if (ifAuthenticated.length == 0) {
    throw new ForbiddenError("Forbidden");
  }
  const round = await Round.findById(id).populate("course");

  if (!round) {
    throw new NotFoundError(`Round with id ${id} not found`);
  }

  return round;
};
const updateOne = async (id, input, userId) => {
  debug({input, userId})

  const ifAuthenticated = await Round.find({ user: userId });

  if (ifAuthenticated.length == 0) {
    throw new ForbiddenError("Forbidden");
  }


  const round = await Round.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  }).populate("course");

  if (!round) {
    throw new NotFoundError(`Round with id ${id} not found`);
  }

  return round;
};

const deleteOne = async (id, userId) => {
  const ifAuthenticated = await Round.find({ user: userId });

  if (ifAuthenticated.length == 0) {
    throw new ForbiddenError("Forbidden");
  }

  const round = await Round.findByIdAndDelete(id).populate("course");

  if (!round) {
    throw new NotFoundError(`Round with id ${id} not found`);
  }

  return round;
};

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
