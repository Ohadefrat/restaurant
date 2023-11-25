// pages/api/createReservation.js

import { PrismaClient } from '@prisma/client';


export default async function handler(req: { method: string; body: { fullName: any; reservationDate: any; reservationTime: any; numberOfPeople: any; area: any; tableNumber: any; }; },
   res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: unknown; data?: { id: string; area: string; tableNumber: string; fullName: string; reservationDate: Date; reservationTime: string; numberOfPeople: number; }; error?: string; }): void; new(): any; }; }; }) {
  if (req.method === 'POST') {
    const prisma = new PrismaClient();


    try {
        
      const { fullName, reservationDate, reservationTime, numberOfPeople,area, tableNumber} = req.body;
      console.log(req.body);
      
      // Create a new reservation using Prisma's create method
      const newReservation = await prisma.reservation.create({
        data: {
          fullName : fullName,
          reservationDate:reservationDate,
          reservationTime:reservationTime,
          numberOfPeople:numberOfPeople,
          area: area,
          tableNumber: tableNumber
        },
      });

      res.status(201).json({ message: 'Reservation created successfully', data: newReservation });
    } catch (error) {
      res.status(500).json({ error: 'Could not create reservation', message: error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
