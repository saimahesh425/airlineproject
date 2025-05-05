const nodemailer = require('nodemailer');
require('dotenv').config();  // Make sure this is here if not already


const sendTicketEmail = async (passenger, flight, booking) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS // Use App Password for Gmail!
    }
  });

  const mailOptions = {
    from: 'FlyHigh Airlines <ajaymotam02@gmail.com>',
    to: passenger.contact.email,
    subject: `🎫 Ticket Confirmation - ${booking.booking_id}`,
    html: `
      <h2>Thank you for booking with FlyHigh, ${passenger.name}!</h2>
      <p><strong>Flight:</strong> ${flight.flight_number} (${flight.source} ➡ ${flight.destination})</p>
      <p><strong>Seat:</strong> ${booking.seat_number}</p>
      <p><strong>Departure:</strong> ${new Date(flight.departure_time).toLocaleString()}</p>
      <p><strong>Passenger ID:</strong> ${passenger.passenger_id}</p>
      <hr>
      <p>You can view your ticket or boarding pass anytime.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${passenger.contact.email}`);
  } catch (err) {
    console.error(`❌ Failed to send email: ${err.message}`);
  }
  
};

module.exports = { sendTicketEmail };
