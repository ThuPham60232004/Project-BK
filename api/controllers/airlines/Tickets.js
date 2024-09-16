import Tickets from "../../models/airlines/Tickets.js";

// Tạo mới Tickets
export const createTickets = async (req, res) => {
  const { discountPrice,
    taxPrice,
    img,flightId,idAdmin, seatId, price, status, luggageId } = req.body;
  try {
    const newTickets = new Tickets({
      flightId,
      seatId,
      price,
      status,
      luggageId,
      discountPrice,
      taxPrice,
      img,
      idAdmin
    });
    await newTickets.save();
    res.status(200).json(newTickets);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Cập nhật Tickets
export const updateTickets = async (req, res, next) => {
  try {
    const updatedTicket = await Tickets.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // Trả về tài liệu đã cập nhật
    );
    res.status(200).json(updatedTicket);
  } catch (err) {
    next(err);
  }
};

// Xóa Tickets
export const deleteTickets = async (req, res, next) => {
  try {
    await Tickets.findByIdAndDelete(req.params.id);
    res.status(200).json("Vé đã bị xóa.");
  } catch (err) {
    next(err);
  }
};

// Lấy thông tin một Ticket
export const getTicket = async (req, res, next) => {
  try {
    const ticket = await Tickets.findById(req.params.id)
    .populate({
      path: 'flightId',
      select: 'departureCity arrivalCity departureTime duration status arrivalTime' 
    })
    .populate({
      path: 'seatId',
      select: 'seatNumber seatClass' 
    })
    .populate({
      path: 'luggageId',
      select: 'nameLuggage weightCarryOn type weightChecked' 
    }); 
    res.status(200).json(ticket);
  } catch (err) {
    next(err);
  }
};

// Lấy danh sách Tickets
export const getTickets = async (req, res, next) => {
  try {
    const tickets = await Tickets.find()
      .populate({
        path: 'flightId',
        select: 'departureCity arrivalCity departureTime duration status arrivalTime' 
      })
      .populate({
        path: 'seatId',
        select: 'seatNumber seatClass' 
      })
      .populate({
        path: 'luggageId',
        select: 'nameLuggage weightCarryOn type weightChecked' 
      });

    res.status(200).json(tickets);
  } catch (err) {
    next(err);
  }
};
