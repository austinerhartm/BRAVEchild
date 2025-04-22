// utilities/pdfGenerator.js
import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';
import fs from 'fs-extra';
import path from 'path';

/**
 * Generate a tax-compliant donation receipt
 * @param {Object} donationDetails - Donation information
 * @returns {Promise<{buffer: Buffer, filename: string}>} The generated PDF
 */
export const generateDonationReceipt = async (donationDetails) => {
  return new Promise((resolve, reject) => {
    try {
      // Create a PDF document
      const doc = new PDFDocument({
        size: 'LETTER',
        margin: 50,
        info: {
          Title: 'Donation Receipt',
          Author: 'BRAVEChild Inc',
          Subject: 'Tax-Deductible Donation Receipt'
        }
      });
      
      // Set up a buffer to capture the PDF
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      
      // When PDF is done being generated
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        const filename = `receipt-${donationDetails.transactionId}.pdf`;
        
        resolve({
          buffer: pdfBuffer,
          filename: filename
        });
      });
      
      // Organization Logo
      const logoPath = path.join(process.cwd(), 'public', 'BRAVEpic.png');
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 50, 45, { width: 100 });
      }
      
      // Organization Name and Info
      doc.fontSize(20).text('BRAVEChild Inc', 170, 50);
      doc.fontSize(10)
         .text('Tax ID: PLACEHOLD', 170, 75)                    // Replace with actual tax ID
         .text('66 Mengle Road Rayville, LA 71269', 170, 90)
         .text('(318) 840-7091', 170, 105)
         .text('BRAVEbfchild@gmail.com', 170, 120);
      
      // Receipt Title
      doc.fontSize(16)
         .text('CHARITABLE DONATION RECEIPT', 50, 160, { align: 'center' });
         
      // Horizontal Line
      doc.moveTo(50, 180).lineTo(550, 180).stroke();
      
      // Receipt Information
      doc.fontSize(12).text('RECEIPT INFORMATION', 50, 200);
      doc.fontSize(10)
         .text(`Receipt Number: ${donationDetails.transactionId}`, 50, 225)
         .text(`Donation Date: ${new Date(donationDetails.date || Date.now()).toLocaleDateString()}`, 50, 240);
         
      // Donor Information
      doc.fontSize(12).text('DONOR INFORMATION', 50, 270);
      doc.fontSize(10)
         .text(`Donor Name: ${donationDetails.donorName}`, 50, 295)
         .text(`Email: ${donationDetails.donorEmail || 'Not provided'}`, 50, 310);
         
      // Donation Details
      doc.fontSize(12).text('DONATION DETAILS', 50, 340);
      doc.fontSize(10)
         .text(`Donation Amount: $${parseFloat(donationDetails.amount).toFixed(2)}`, 50, 365)
         .text(`Payment Method: ${donationDetails.paymentMethod || 'Credit Card'}`, 50, 380);
      
      // Tax Deductible Statement
      doc.fontSize(12).text('TAX INFORMATION', 50, 420);
      doc.fontSize(10)
         .text('B.R.A.V.E. Child, Inc is a (IRC) Section 501(c)(3) organization. This', 50, 445)
         .text('receipt acknowledges that no goods or services were provided in exchange', 50, 460)
         .text('for your generous financial donation. This donation may be tax-deductible.', 50, 475)
         .text('Please consult your tax advisor for details.', 50, 490);
      
      // Thank You Message
      doc.fontSize(12)
         .text('Thank you for your generous support!', 50, 530, { align: 'center' });
         
      // Footer
      const currentYear = new Date().getFullYear();
      doc.fontSize(8)
         .text(`© ${currentYear} BRAVEChild Inc. All rights reserved.`, 50, 700, { align: 'center' });
      
      // Finalize the PDF
      doc.end();
      
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Save PDF to the file system
 * @param {Buffer} pdfBuffer - The PDF buffer
 * @param {string} filename - The filename
 * @returns {Promise<string>} The file path
 */
export const savePdfToFileSystem = async (pdfBuffer, filename) => {
  const uploadsDir = path.join(process.cwd(), 'uploads', 'receipts');
  
  // Ensure directory exists
  await fs.ensureDir(uploadsDir);
  
  const filePath = path.join(uploadsDir, filename);
  await fs.writeFile(filePath, pdfBuffer);
  
  return filePath;
};