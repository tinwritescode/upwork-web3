import { TeenResponse } from "./../types/tools";
import { publicProcedure } from "./../trpc";
import puppeteer from "puppeteer";

import { router } from "../trpc";
import { z } from "zod";

const API_URL = `https://api.gaito.cc/escort/products?attributes=%7B%2242%22:%7B%22type%22:%22DobBox%22,%22values%22:%7B%22minDate%22:1999,%22maxDate%22:2004%7D%7D%7D&latitude=10.498968&longitude=106.605684&maxDistance=80&maxPrice=5950&minPrice=250&mode=search&orderBy=byDistance`;

export const toolRouter = router({
  getGaito: publicProcedure
    .input(
      z.object({
        offset: z.number().default(0),
      })
    )
    .query(async ({ input: { offset } }) => {
      const url = `${API_URL}&offset=${offset}`;

      const browser = await puppeteer.launch({
        headless: false,
      });

      const page = await browser.newPage();

      page.on("request", (request) => {
        const headers = request.headers();

        headers.accept = "application/json, text/plain, */*";

        request.continue({ headers });
      });

      await page.goto(url, {
        waitUntil: "networkidle2",
      });

      const data = await page.evaluate(() => {
        return JSON.parse(document.querySelector("pre")?.innerHTML || "[]");
      });

      await browser.close();

      return data as TeenResponse[];
    }),
});
