import PDFDocument from 'pdfkit';
import fs from 'fs';

const doc = new PDFDocument({autoFirstPage: false});

const testTitleText = 'David and Goliath were not friends, ya know?';

doc
  .addPage({
    layout: 'landscape',
    margins: {top: 10, bottom: 10, left: 10, right: 10}
  })
  .image('./coverENGLetter.png', {width: 772})
  .image('./flags/SRB.png', 700, 515, {width: 50})
  .font('./KGPrimaryPenmanship2.ttf');
if (testTitleText.length > 18) {
  doc.fontSize(35).text(testTitleText, 405, 55, {
    width: 285,
    align: 'center'
  });
} else {
  doc.fontSize(40).text(testTitleText, 405, 76, {
    width: 280,
    align: 'center'
  });
}
doc
  .addPage({
    layout: 'landscape',
    margins: {top: 10, bottom: 10, left: 10, right: 10}
  })
  .image('./innerENGLetter.png', {width: 772});

for (let i = 0; i <= 3; i++) {
  const leftPage = i % 2 ? i : Math.abs(i - 7);
  const rightPage = Math.abs(leftPage - 7);

  doc
    .addPage({
      layout: 'landscape',
      margins: {top: 35, bottom: 35, left: 20, right: 20}
    })
    .image('./letterTemplate.png', {width: 750})
    .image(
      '/Users/helenmoineau/una-webapp/src/Book/placeHolderImage.png',
      42,
      48,
      {
        width: 335
      }
    )
    .image(
      '/Users/helenmoineau/una-webapp/src/Book/placeHolderImage.png',
      414,
      48,
      {
        width: 335
      }
    )
    .font('./KGPrimaryPenmanship2.ttf')
    .fontSize(25)
    .text('testesttest', 42, 425, {
      width: 335,
      align: 'justify'
    })
    .text('book[rightPage].page_description', 414, 425, {
      width: 335,
      align: 'justify'
    })
    .font('./beachday.ttf')
    .text(leftPage + 1, 34.5, 538)
    .text(rightPage + 1, 748.5, 538);
}

doc.pipe(
  fs.createWriteStream(
    '/Users/helenmoineau/una-webapp/server/printing/testing.pdf'
  )
);
doc.end();
