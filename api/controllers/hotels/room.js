import Room from "../../models/hotels/Room.js";
import Hotel from "../../models/hotels/Hotel.js";
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};




export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const updateRoomStatus = async (req, res, next) => {
  const { roomId, date, isBooked } = req.body;

  try {
    const room = await Room.findOneAndUpdate(
      { _id: roomId, "availability.date": date },
      {
        $set: {
          "availability.$.isBooked": isBooked,
        },
      },
      { new: true }
    );

    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// Tìm kiếm phòng theo nhiều tiêu chí
export const searchRooms = async (req, res, next) => {
  const { hotelId, category, priceMin, priceMax, date, isBooked } = req.query;

  try {
    const query = {};

    if (hotelId) query.hotelId = hotelId;
    if (category) query.category = category; // Loại phòng
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = priceMin;
      if (priceMax) query.price.$lte = priceMax;
    }
    if (date) {
      // Tìm kiếm phòng không có ngày đặt chồng chéo
      const unavailableDate = new Date(date);
      query["availability.date"] = { $ne: unavailableDate };
    }
    if (isBooked !== undefined) {
      query["availability.isBooked"] = isBooked === "true";
    }

    const rooms = await Room.find(query).populate('hotelId');
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const getRoomsByHotelId = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const rooms = await Room.find({ hotelId });
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

// Phương thức lấy phòng theo ID của khách sạn
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Không tìm thấy khách sạn" });
    }

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
export const getRoomsByAdminId = async (req, res, next) => {
  const idAdmin= req.params.idAdmin;
  try {
    const rooms = await Room.find({ idAdmin });
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};