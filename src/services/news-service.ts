import prisma from "../database";
import * as newsRepository from "../repositories/news-repository";
import { AlterNewsData, CreateNewsData } from "../repositories/news-repository";

export async function getNews() {
  return newsRepository.getNews();
}

export async function getSpecificNews(id: number) {
  const news = await newsRepository.getNewsById(id);
  if (!news) {
    throw {
      name: "NotFound",
      message: `News with id ${id} not found.`,
    };
  }

  return news;
}

export async function createNews(newsData: CreateNewsData) {
  await isNewsValid(newsData);
  return newsRepository.createNews(newsData);
}

export async function alterNews(id: number, newsData: AlterNewsData) {
  const news = await getSpecificNews(id);
  const isTitleDifferent = news.title !== newsData.title;
  await isNewsValid(newsData, isTitleDifferent);

  return newsRepository.updateNews(id, newsData);
}

export async function deleteNews(id: number) {
  await getSpecificNews(id);
  return newsRepository.removeNews(id);
}

async function isNewsValid(newsData: CreateNewsData, isNew = true) {
  await checkTitleConflict(newsData, isNew);
  validateTextLength(newsData);
  validatePublicationDate(newsData);
}

async function checkTitleConflict(newsData: CreateNewsData, isNew = true) {
  const newsWithTitle = await findTitle(newsData, isNew);

  if (newsWithTitle) {
    throw {
      name: "Conflict",
      message: `News with title ${newsData.title} already exist`,
    };
  }
}

async function findTitle(newsData: CreateNewsData, isNew = true) {
  if (isNew) {
    const title = await prisma.news.findFirst({
      where: { title: newsData.title },
    });
    return title;
  }
}

function validateTextLength(newsData: CreateNewsData) {
  const minTextLength = 500;

  if (newsData.text.length < minTextLength) {
    throw {
      name: "BadRequest",
      message: "The news text must be at least 500 characters long.",
    };
  }
}

function validatePublicationDate(newsData: CreateNewsData) {
  const currentDate = new Date();
  const publicationDate = new Date(newsData.publicationDate);
  const isPublicationDateValid =
    publicationDate.getTime() > currentDate.getTime();

  if (!isPublicationDateValid) {
    throw {
      name: "BadRequest",
      message: "The publication date cannot be in the past.",
    };
  }
}
