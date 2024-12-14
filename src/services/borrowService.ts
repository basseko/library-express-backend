import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const borrowBook = async (data: { userId: string; bookId: string }) => {
  const user = await prisma.user.findUnique({
    where: { id: data.userId },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const book = await prisma.book.findUnique({
    where: { id: data.bookId },
  });
  if (!book) {
    throw new Error("Book not found");
  }

  const existingBorrow = await prisma.borrow.findFirst({
    where: { bookId: data.bookId },
  });
  if (existingBorrow) {
    throw new Error("Book is already borrowed");
  }

  const borrow = await prisma.borrow.create({
    data: {
      userId: data.userId,
      bookId: data.bookId,
      borrowedAt: new Date(),
    },
  });

  return borrow;
};

export const returnBook = async (data: { userId: string; bookId: string }) => {
  return prisma.borrow.delete({
    where: {
      userId_bookId: {
        userId: data.userId,
        bookId: data.bookId,
      },
    },
  });
};

export const listBorrowedBooks = async () => {
  return prisma.borrow.findMany({
    include: {
      book: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};
