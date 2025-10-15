import { SortOrder } from "types/news-types";
import prisma from "./../database";
import { News } from "@prisma/client";

export type CreateNewsData = Omit<News, "id" | "createAt">;
export type AlterNewsData = CreateNewsData;

export function getNews(page: number, order: SortOrder, titleFilter: string) {
  const limit = 10;
  const skip = (page - 1) * limit;
  console.log("esse é o titulo que esta vindo " + titleFilter);
  return prisma.news.findMany({
    skip: skip,
    take: limit,
    orderBy: {
      publicationDate: order || "desc",
    },
    where: {
      title: {
        contains: titleFilter,
        mode: "insensitive",
      },
    },
  });
}

export function getNewsById(id: number) {
  return prisma.news.findUnique({
    where: { id },
  });
}

export async function createNews(newsData: CreateNewsData) {
  return prisma.news.create({
    data: { ...newsData, publicationDate: new Date(newsData.publicationDate) },
  });
}

export async function updateNews(id: number, news: AlterNewsData) {
  return prisma.news.update({
    where: { id },
    data: { ...news, publicationDate: new Date(news.publicationDate) },
  });
}

export async function removeNews(id: number) {
  return prisma.news.delete({
    where: { id },
  });
}
