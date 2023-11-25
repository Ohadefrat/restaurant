// pages/api/checkReservation.js

import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const prisma = new PrismaClient();

    try {
      const { reservationDate, reservationTime, area,tableNumber} = req.body;

      // Check if reservation exists in the database
      const existingReservation = await prisma.reservation.findFirst({
        where: {
          reservationDate: reservationDate,
          reservationTime: reservationTime,
          area: area,
          tableNumber: tableNumber
        },
      });
      
      if (existingReservation) {
        res.status(200).json({ reservationExists: true });
      } else {
        res.status(200).json({ reservationExists: false });
      }
    } catch (error) {
      res.status(500).json({ error: 'Could not check reservation', message: error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
