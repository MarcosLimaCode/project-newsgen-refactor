import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "./../services/news-service";

import { AlterNewsData, CreateNewsData } from "../repositories/news-repository";
import { SortOrder } from "types/news-types";

export async function getNews(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const titleFilter = (req.query.title as string) || undefined;
  let order: SortOrder = "desc";

  if (req.query.order === "asc") {
    order = req.query.order;
  }

  const news = await service.getNews(page, order, titleFilter);
  return res.send(news);
}

export async function getSpecificNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  }

  const news = await service.getSpecificNews(id);
  return res.send(news);
}

export async function createNews(req: Request, res: Response) {
  const newsData = req.body as CreateNewsData;
  const createdNews = await service.createNews(newsData);

  return res.status(httpStatus.CREATED).send(createdNews);
}

export async function alterNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  }

  const newsData = req.body as AlterNewsData;
  const alteredNews = await service.alterNews(id, newsData);

  return res.send(alteredNews);
}

export async function deleteNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  }

  await service.deleteNews(id);
  return res.sendStatus(httpStatus.NO_CONTENT);
}
