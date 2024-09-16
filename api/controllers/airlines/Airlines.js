import Airlines from "../../models/airlines/Airlines.js";
export const createAirlines = async (req, res) => {
  const {name,country,logoUrl,createdAt,updatedAt,idAdmin} = req.body;
  try {
    const newAirlines = new Airlines({
      name,country,logoUrl,createdAt,updatedAt,idAdmin
    });
    await newAirlines.save();
    res.status(200).json(newAirlines);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deleteAirlines = async (req, res, next) => {
  try {
    await Airlines.findByIdAndDelete(req.params.id);
    res.status(200).json("Hãng hàng không đã bị xóa.");
  } catch (err) {
    next(err);
  }
};
export const updateAirlines = async (req, res, next) => {
  try {
    const updatedAirlines = await Airlines.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAirlines);
  } catch (err) {
    next(err);
  }
};

export const getAirline = async (req, res, next) => {
  try {
    const airline = await Airlines.findById(req.params.id);
    res.status(200).json(airline);
  } catch (err) {
    next(err);
  }
};

export const getAirlines = async (req, res, next) => {
  try {
    const Airlines = await Airlines.find();
    res.status(200).json(Airlines);
  } catch (err) {
    next(err);
  }
};