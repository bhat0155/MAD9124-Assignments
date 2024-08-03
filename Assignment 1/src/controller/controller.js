const data = require("../models/data");

const getAll = (req, res) => {
  res.json({
    data: data,
  });
};

const getOne = (req, res) => {
  const { id } = req.params;
  let one = data.find((one) => one.id === +id);
  if (!one) {
    res.status(404).json({
      error: {
        message: `
              data with ${id} not found`,
      },
    });
    return;
  }
  res.json({
    data: one,
  });
};

const create = (req, res) => {
  const { course, username, scores } = req.body;

  console.log(course, username, scores);

  if (course && username && scores.length === 18) {
    const newOne = {
      ...req.body,
      id: crypto.randomUUID(),
    };
    data.push(newOne);
    res.json({ data });
  } else
    res.status(400).json({
      error: "invalid response type",
    });
};

const replace = (req, res) => {
  const id = Number(req.params.id);
  const oneIndex = data.findIndex((one) => one.id === id);

  if (oneIndex === -1) {
    res.status(404).json({
      error: {
        message: `data with ${id} not found`,
      },
    });
    return;
  }
  const { course, username, scores } = req.body;

  if (course && username && scores.length === 18) {
    const updatedData = {
      ...req.body,
      id: id,
    };

    data[oneIndex] = updatedData;

    res.json({ data });
  } else
    res.status(400).json({
      error: "invalid response type",
    });
};

const deleted = (req, res) => {
  const id = Number(req.params.id);

  const oneIndex = data.findIndex((one) => one.id === id);

  if (oneIndex === -1) {
    res.status(404).json({
      error: {
        message: `data with ${id} not found`,
      },
    });
    return;
  }

  data.splice(oneIndex, 1);
  res.json({
    updatedData: data,
  });
};

const partial = (req, res) => {
  const id = Number(req.params.id);

  const oneIndex = data.findIndex((one) => one.id === id);

  if (oneIndex === -1) {
    res.status(404).json({
      error: {
        message: `data with ${id} not found`,
      },
    });
    return;
  }

  const { id: _id, ...theRest } = req.body;

  let newObject = {
    ...data[oneIndex],
    ...theRest,
  };
  data[oneIndex] = newObject;
  res.json({ data });
};

module.exports = {
  create,
  getOne,
  getAll,
  replace,
  deleted,
  partial,
};
