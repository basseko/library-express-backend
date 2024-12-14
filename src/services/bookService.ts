import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addBook = async (data: {
  title: string;
  author: string;
  genre: string;
  year: number;
}) => {
  return prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      genre: data.genre,
      publishedYear: data.year,
    },
  });
};

export const searchBooks = async (query: any) => {
  const { title, author, genre, year } = query;

  return prisma.book.findMany({
    where: {
      AND: [
        title ? { title: { contains: title, mode: "insensitive" } } : {},
        author ? { author: { contains: author, mode: "insensitive" } } : {},
        genre ? { genre: { contains: genre, mode: "insensitive" } } : {},
        year ? { publishedYear: Number(year) } : {},
      ],
    },
  });
};

export const getBookDetails = async (id: string) => {
  return prisma.book.findUnique({
    where: { id },
  });
};

export const updateBook = async (id: string, updatedData: any) => {
  return prisma.book.update({
    where: { id },
    data: updatedData,
  });
};

export const deleteBook = async (id: string) => {
  return prisma.book.delete({
    where: { id },
  });
};
