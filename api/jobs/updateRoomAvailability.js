
import cron from "node-cron";
import Room from "../models/hotels/Room.js"
cron.schedule('0 0 * * *', async () => { 
  try {
    const now = new Date();
    const rooms = await Room.find();

    for (const room of rooms) {
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
