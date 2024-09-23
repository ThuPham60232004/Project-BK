import Hotel from "../../models/hotels/Hotel.js";
import Room from "../../models/hotels/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Khách sạn đã bị xóa.");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotelsByAdminId = async (req, res, next) => {
  const { idAdmin } = req.params;

  try {
    const hotels = await Hotel.find({ idAdmin });
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 99999999999999999999 },
    }).limit(Number(req.query.limit) || 10);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const getHotelsByType = async (req, res, next) => {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ error: "Type query parameter is required" });
  }

  try {
    const hotels = await Hotel.find({ type });
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  if (!req.query.cities) {
    return res.status(400).json({ error: "Cities query parameter is required" });
  }

  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
    const resortCount = await Hotel.countDocuments({ type: "resorts" });
    const villaCount = await Hotel.countDocuments({ type: "villas" });
    const cabinCount = await Hotel.countDocuments({ type: "cabins" });

    res.status(200).json([
      { type: "Hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// Thêm phương thức getAllHotels để lấy tất cả khách sạn
export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find(); 
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const updateCityForAllHotels = async (req, res, next) => {
  const { newCity } = req.body;

  if (!newCity) {
    return res.status(400).json({ error: "New city name is required" });
  }

  try {
    const result = await Hotel.updateMany({}, { $set: { city: newCity } });
    res.status(200).json({ message: `${result.nModified} hotels updated` });
  } catch (err) {
    next(err);
  }
};
