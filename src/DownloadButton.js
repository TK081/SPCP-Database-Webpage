import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {FaDownload} from 'react-icons/fa';

const DownloadButton = () => {
    const handleCaptureScreenshot = () => {

      try {
        // Get the target HTML element to capture (e.g., a specific div with a ref)
        const targetElement = document.getElementById('render');

        // Use html2canvas to capture the screenshot of the target element
        html2canvas(targetElement).then((canvas) => {

        // Create a new jsPDF instance
        const pdf = new jsPDF('p', 'mm', 'a4');
        const mmConversionRate = 0.264583;

        // Calculate the aspect ratio to fit the screenshot in the PDF page
        const elemRect = canvas.getBoundingClientRect();
        const imgWidth = Math.floor(canvas.width * mmConversionRate); // Width of the PDF page (in mm)
        const imgHeight = Math.floor(elemRect.height * mmConversionRate); // Calculate the height based on the aspect ratio
        // console.log(imgHeight);
        // console.log(elemRect.height);
        // console.log(canvas.width);

        // Convert the captured canvas to an image and add it to the PDF
        const screenshotData = canvas.toDataURL('image/png', 1.0);
        if (screenshotData.trim() == 'data:,') return;
        // console.log(screenshotData);
        pdf.deletePage(1);
        pdf.addPage(imgWidth, imgHeight);
        pdf.addImage(screenshotData, 'PNG', 0, 0);

        // Save the PDF and trigger the download
        pdf.save('dataoutput.pdf');
        });
      } 
      catch(error){
        console.log(error);
      }
    };

    return (
        <div>
          {/* Place the target element you want to capture */}
          <div>
            {/* Content you want to capture */}
          </div>
    
          {/* Button to trigger the screenshot and PDF generation */}
          <button className="button" onClick={handleCaptureScreenshot}><FaDownload/></button>
        </div>
      );
};

export default DownloadButton;