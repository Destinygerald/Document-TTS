import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { PDFDocumentProxy } from "pdfjs-lib";

// pdfjsLib.GlobalWorkerOptions.workerSrc =  '/pdf.worker.mjs'

export function processDocument(file: any) {
  return new Promise((resolve, reject) => {
    if (!file) reject(new Error("No file found"));
    if (file.type != "application/pdf") reject(new Error("PDF file only"));

    const reader = new FileReader();

    // RETURN PAGES OF ARRAY

    reader.onload = function () {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);

      pdfjsLib
        .getDocument({
          data: typedArray,
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

      // resolve()
    };

    reader.onerror = function () {
      reject(new Error("Error reading the file"));
    };

    reader.readAsArrayBuffer(file);
  });
}

async function detectChapters(pdf: PDFDocumentProxy) {
  const outlines = await pdf.getOutline();

  const pages = pdf.numPages;

  if (!outlines) {
    return [{ title: "No Outline detected", startPage: 1, endPage: pages }];
  }

  const chapters: any[] = [];

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

      const text = content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      const pageChunks = text
        .split(/\n+(?<=\.|\?|!)\s+(?=[A-Z])/)
        .map((p) => p.trim())
        .filter(Boolean);

      chapterPages.push(pageChunks);
    }

    allChapters.push(chapterPages);
  }

  return allChapters;
}
