import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { PDFDocumentProxy } from "pdfjs-lib";
await import("pdfjs-dist/build/pdf.worker.min.mjs");

export function processDocument(file: File) {
  return new Promise(async (resolve, reject) => {
    if (!file) reject(new Error("No file found"));
    if (file.type != "application/pdf") reject(new Error("PDF file only"));

    const buffer = new Uint8Array(Buffer.from(await file.arrayBuffer()));

    pdfjsLib
      .getDocument({
        data: buffer,
        verbosity: 0,
      })
      .promise.then(async (pdf) => {
        const chapterRanges = await detectChapters(
          pdf as unknown as PDFDocumentProxy,
        );

        const documentChunks = await splitPageToChunks(
          pdf as unknown as PDFDocumentProxy,
          chapterRanges,
        );

        resolve(documentChunks);
      });
  });
}

async function detectChapters(pdf: PDFDocumentProxy) {
  const outlines = await pdf.getOutline();

  const pages = pdf.numPages;

  if (!outlines) {
    return [{ title: "No Outline detected", startPage: 1, endPage: pages }];
  }

  const chapters: { title: string; pageIndex: number }[] = [];

  for (const items of outlines) {
    if (!items.dest && !items.url) continue;

    let dest = items.dest;
    let ref;

    if (typeof dest === "string") {
      dest = await pdf.getDestination(dest);
      ref = dest;
    }

    if (Array.isArray(dest)) {
      ref = dest[0];
    }

    const pageIndex = await pdf.getPageIndex(ref);

    chapters.push({
      title: items.title,
      pageIndex,
    });
  }

  chapters.sort((a, b) => a.pageIndex - b.pageIndex);

  const chapterRanges = chapters.map((ch, i) => ({
    title: ch.title,
    startPage: ch.pageIndex + 1,
    endPage: i < chapters.length - 1 ? chapters[i + 1].pageIndex : pdf.numPages,
  }));

  return chapterRanges;
}

async function splitPageToChunks(
  pdf: PDFDocumentProxy,
  chapters: { startPage: number; endPage: number; title: string }[],
) {
  const allChapters = [];

  for (const chapter of chapters) {
    const chapterPages = [];

    for (
      let pageNum = chapter.startPage;
      pageNum <= chapter.endPage;
      pageNum++
    ) {
      const page = await pdf.getPage(pageNum);

      const content = await page.getTextContent();
      //   console.log(`Page ${pageNum}: ${content.items.length} text items found`);

      const text = content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      const pageChunks = text
        .split(/\n{2,}/g)
        .map((chunk) => chunk.trim())
        .filter((chunk) => chunk.length > 0);

      chapterPages.push(pageChunks);
    }

    allChapters.push({
      title:
        chapter.title != "No Outline detected"
          ? chapter.title
          : "All chapters[No Outline detected]",
      chunks: chapterPages,
    });
  }

  return allChapters;
}
