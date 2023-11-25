// pages/api/checkReservation.js

import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const prisma = new PrismaClient();

    try {
      const { id} = req.body;
      const deleteReservation = await prisma.reservation.delete({
        where: {
          id: id,
        },
      });
      

        res.status(201).json({ message: 'Reservation delte successfully', data: deleteReservation });

    } catch (error) {
        res.status(500).json({ error: 'Could not delete reservation', message: error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
