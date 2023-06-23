import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {FaDownload} from 'react-icons/fa';

const DownloadButton = () => {
    const handleCaptureScreenshot = () => {
      
      // Get the target HTML element to capture (e.g., a specific div with a ref)
      const targetElement = document.getElementById('render');

          // Use html2canvas to capture the screenshot of the target element
          html2canvas(targetElement).then((canvas) => {

            // Create a new jsPDF instance
            const pdf = new jsPDF();

            // Calculate the aspect ratio to fit the screenshot in the PDF page
            const elemRect = targetElement.getBoundingClientRect();
            const imgWidth = 210; // Width of the PDF page (in mm)
            const imgHeight = (elemRect.height * imgWidth) / canvas.width; // Calculate the height based on the aspect ratio
            console.log(imgHeight);
            console.log(elemRect.height);
            console.log(canvas.width);

            // Convert the captured canvas to an image and add it to the PDF
            const screenshotData = canvas.toDataURL('image/png');
            console.log(screenshotData);
            pdf.addImage(screenshotData, 'PNG', 0, 0, imgWidth, imgHeight);

            // Save the PDF and trigger the download
            pdf.save('dataoutput.pdf');

        });
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