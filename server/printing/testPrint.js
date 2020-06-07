import PDFDocument from 'pdfkit';
import fs from 'fs';

const doc = new PDFDocument({autoFirstPage: false});

for (let i = 0; i <= 3; i++) {
  const leftPage = i % 2 ? i : Math.abs(i - 7);
  const rightPage = Math.abs(leftPage - 7);

  console.log(leftPage, rightPage);

  doc
    .addPage({
      layout: 'landscape',
      margins: {top: 35, bottom: 35, left: 20, right: 20}
    })
    .image(
      '/Users/helenmoineau/una-webapp/server/printing/letterTemplate.png',
      {width: 750}
    )
    .font(
      '/Users/helenmoineau/una-webapp/server/printing/KGPrimaryPenmanship2.ttf'
    )
    .font('/Users/helenmoineau/una-webapp/server/printing/beachday.ttf')
    .fontSize(24)
    .text(leftPage + 1, 34.5, 538)
    .text(rightPage + 1, 748.5, 538);
}

doc.pipe(
  fs.createWriteStream(
    '/Users/helenmoineau/una-webapp/server/printing/output.pdf'
  )
);
doc.end();
