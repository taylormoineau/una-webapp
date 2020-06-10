import PDFDocument from 'pdfkit';
import fs from 'fs';
import {query} from '../query.js';

export const printPDF = async (req, res) => {
  console.log(req.body.bookId);

  const book = await query(
    'SELECT * FROM "pages_data" WHERE book_id=$1 ORDER BY page_number ASC',
    [req.body.bookId]
  );

  const doc = new PDFDocument({autoFirstPage: false});

  doc
    .addPage({
      layout: 'landscape',
      margins: {top: 10, bottom: 10, left: 10, right: 10}
    })
    .image(
      '/Users/helenmoineau/una-webapp/server/printing/coverENGLetter.png',
      {width: 772}
    )
    .addPage({
      layout: 'landscape',
      margins: {top: 10, bottom: 10, left: 10, right: 10}
    })
    .image(
      '/Users/helenmoineau/una-webapp/server/printing/innerENGLetter.png',
      {width: 772}
    );

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
      .image(book[leftPage].page_image, 42, 48, {
        width: 335
      })
      .image(book[rightPage].page_image, 414, 48, {
        width: 335
      })
      .font(
        '/Users/helenmoineau/una-webapp/server/printing/KGPrimaryPenmanship2.ttf'
      )
      .fontSize(25)
      .text(book[leftPage].page_description, 42, 425, {
        width: 335,
        align: 'justify'
      })
      .text(book[rightPage].page_description, 414, 425, {
        width: 335,
        align: 'justify'
      })
      .font('/Users/helenmoineau/una-webapp/server/printing/beachday.ttf')
      .text(leftPage + 1, 34.5, 538)
      .text(rightPage + 1, 748.5, 538);
  }

  doc.pipe(
    fs.createWriteStream(
      '/Users/helenmoineau/una-webapp/server/printing/output.pdf'
    )
  );
  doc.end();
  res.json('step 1: print');
  // res.download('/Users/helenmoineau/una-webapp/server/printing/output.pdf');

  // var file = fs.createReadStream(
  //   '/Users/helenmoineau/una-webapp/server/printing/output.pdf'
  // );
  // var stat = fs.statSync(
  //   '/Users/helenmoineau/una-webapp/server/printing/output.pdf'
  // );
  // res.setHeader('Content-Length', stat.size);
  // res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
  // file.pipe(res);

  // res.download('newPDF.pdf');
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
