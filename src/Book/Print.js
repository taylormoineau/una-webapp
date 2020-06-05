import PDFDocument from 'pdfkit';
import fs from 'fs';

var doc = new PDFDocument({autoFirstPage: false});

export const printPDF = pageContents => {
  doc.pipe(fs.createWriteStream('output.pdf'));
  for (let i = 0; i <= 3; i++) {
    const leftPage = i % 2 != 0 ? i : Math.abs(i - 9);
    const rightPage = Math.abs(leftPage - 9);

    doc
      .addPage({
        layout: 'landscape',
        margins: {top: 35, bottom: 35, left: 20, right: 20}
      })
      .image('letterTemplate.png', {width: 750})
      .image(pageContents[leftPage].page_image, 42, 48, {
        width: 335
      })
      .image(pageContents[rightPage].page_image, 414, 48, {
        width: 335
      })
      .font('KGPrimaryPenmanship2.ttf')
      .fontSize(22)
      .text(pageContents[leftPage].page_description, 42, 425, {
        width: 335,
        align: 'justify'
      })
      .text(pageContents[rightPage].page_description, 414, 425, {
        width: 335,
        align: 'justify'
      })
      .font('beachday.ttf')
      .fontSize(24)
      .text(leftPage)
      .text(rightPage);
  }

  doc.end();
};

// import PDFDocument from 'pdfkit';
// import fs from 'fs';

// var doc = new PDFDocument({autoFirstPage: false});

// doc.pipe(fs.createWriteStream('output.pdf'));

// for (let i = 1; i <= 4; i++) {
//   doc
//     .addPage({
//       layout: 'landscape',
//       margins: {top: 35, bottom: 35, left: 20, right: 20}
//     })
//     .image('letterTemplate.png', {width: 750})
//     .image('../../testPictures/testPicture.png', 42, 48, {
//       width: 335
//     })
//     .image('../../testPictures/testPicture.png', 414, 48, {
//       width: 335
//     })
//     .font('KGPrimaryPenmanship2.ttf')
//     .fontSize(22)
//     .text(
//       'David was a good man. i i i i i i i i i i i i i i i i i i He had a few small problems, but we wont talk about those so much.',
//       42,
//       425,
//       {width: 335, align: 'justify'}
//     )
//     .text(
//       'David was a good man. i i i i i i i i i i i i i i i i i i He had a few small problems, but we wont talk about those so much.',
//       414,
//       425,
//       {width: 335, align: 'justify'}
//     )
//     .font('beachday.ttf')
//     .fontSize(24)
//     .text(i % 2 == 0 ? i : Math.abs(i - 9), 35.5, 537)
//     .text(i % 2 != 0 ? i : Math.abs(i - 9), 748.5, 537);
// }

// doc.end();
