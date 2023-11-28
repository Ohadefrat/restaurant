import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: { method: string },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: {
          Reservations?: {
            id: string;
            area: string;
            tableNumber: string;
            fullName: string;
            reservationDate: Date;
            reservationTime: string;
            numberOfPeople: number;
          }[];
          error?: string;
          message?: unknown;
        }): void;
        new (): any;
      };
    };
  },
) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();

    try {
      const Reservations = await prisma.reservation.findMany({});

      res.status(200).json({ Reservations });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Could not check reservation", message: error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
