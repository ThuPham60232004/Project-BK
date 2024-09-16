
import cron from "node-cron";
import Room from "../models/hotels/Room.js"

// Job định kỳ để cập nhật trạng thái phòng
cron.schedule('0 0 * * *', async () => { // Chạy vào lúc 00:00 mỗi ngày
  try {
    const now = new Date();
    const rooms = await Room.find();

    for (const room of rooms) {
      // Giả sử bạn có trường unavailableDates là mảng các ngày không khả dụng
      const isAvailable = room.unavailableDates.every(date => new Date(date) > now);

      if (!isAvailable) {
        room.isBooked = false;
        room.save();
      }
    }

    console.log('Updated room availability');
  } catch (err) {
    console.error('Error updating room availability:', err);
  }
});
