-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "reservationDate" TIMESTAMP(3) NOT NULL,
    "reservationTime" TEXT NOT NULL,
    "numberOfPeople" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);
