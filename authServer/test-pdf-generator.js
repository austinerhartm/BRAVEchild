// testPdfGenerator.js
import { generateDonationReceipt, savePdfToFileSystem } from './utilities/pdfGenerator.js';

// Sample donation details
const testDonationDetails = {
  transactionId: 'TEST123456',
  date: new Date().toISOString(),
  donorName: 'Test Donor',
  donorEmail: 'testdonor@example.com',
  amount: '100.00',
  paymentMethod: 'Credit Card'
};

// Test function to generate and save a receipt
async function testPdfGeneration() {
  try {
    console.log('Generating PDF receipt...');
    const { buffer, filename } = await generateDonationReceipt(testDonationDetails);
    
    console.log(`PDF generated successfully! Filename: ${filename}`);
    console.log('PDF size:', buffer.length, 'bytes');
    
    // Optional: Save the PDF to verify it's complete
    const savedPath = await savePdfToFileSystem(buffer, filename);
    console.log(`PDF saved to: ${savedPath}`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}

// Run the test
testPdfGeneration()
  .then(success => {
    if (success) {
      console.log('Test completed successfully!');
    } else {
      console.log('Test failed.');
    }
    process.exit(success ? 0 : 1);
  });