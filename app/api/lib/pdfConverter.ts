import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function convertToPdf (summaries: {title: string, summary: string}[]) {
    const pdfDoc = await PDFDocument.create();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const font_bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    const margin = 50;

    let page = pdfDoc.addPage([600, 850]); 
    
    let yPosition = 850 - margin;

    summaries.forEach((chapter) => {
        
        if (yPosition < margin ) {
            // New Page
            yPosition = 800;
            page = pdfDoc.addPage([600, 850]);
        }

        page.drawText(chapter.title, {
            x: margin,
            y: yPosition,
            size: 14,
            font: font_bold,
            color: rgb(0, 0, 0)
        });

        yPosition = yPosition - 30; // move down

        const summaryText = chapter.summary;
    
        const lines = wrapText(summaryText, 80);
        
        lines.forEach((line) => {

            if (yPosition < margin + 16) {
                // New page
                yPosition = 800;
                page = pdfDoc.addPage([600, 850]);
            }

            yPosition -= 20 ;

            page.drawText(line, {
                x: 50,
                y: yPosition,
                size: 12,
                font,
                color: rgb(0, 0, 0)
            })

            yPosition -= 16;
        })
    })

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

function wrapText(text: string, maxLength: number): string[] {

    const lines: string[] = [];
    const words = text.split(' ');

    let currentLine = '';

    // const fontSize = 12;

    // const charWidth = fontSize + 0.6;

    words.forEach(word => {
        if ((currentLine + word).length < maxLength) {
            currentLine +=  word + ' ';
        } else {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        }
    });

    if (currentLine.trim()) {
        lines.push(currentLine.trim());
    }

    return lines;
}