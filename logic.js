    // console.log("Create BY SOHEL SAYYED");
    addSubject();

    // this method add the Row for input subject details
    function addSubject() {
        let tableBody = document.getElementById("table-body");
        let deleteButton = document.getElementsByClassName("delete-button"); //this is get the all delete input row buttons from the table
        let rowInputSubjectDetails = `
        <tr>
        <td ><input type="text" class="subject" aria-label="Subject" placeholder="Subject"/></td>
        <td class=""><input type="number" class="Scored" aria-label="Scored Marks" placeholder="Scored Marks"/></td>
        <td class=""><input type="number" class="total" aria-label="total Marks" placeholder="Total Marks"/></td>
        <td><button class="btn delete-button">Delete</button></td>
      </tr>`;
      tableBody.insertAdjacentHTML("beforeend", rowInputSubjectDetails);
        for (let i = 0; i < deleteButton.length; i++) {
            deleteButton[0].style.display = "none";
            deleteButton[i].onclick = function () {
                let div = this.parentElement;
                div = div.parentElement;
                div.remove(); //remove the selected element from DOM
            };
        }
    }

    //calculate the all marks 
    function calculateAllMarks() {
        const scoredElements = document.getElementsByClassName("Scored");
        const totalElements = document.getElementsByClassName("total");
    
        let totalMarks = 0;
        let scoredMarks = 0;
    
        for (let i = 0; i < scoredElements.length; i++) {
            scoredMarks += parseFloat(scoredElements[i].value) || 0;
        }
    
        for (let i = 0; i < totalElements.length; i++) {
            totalMarks += parseFloat(totalElements[i].value) || 0;
        }
    
        const scoredMarksFixed = scoredMarks.toFixed(2);
        const totalMarksFixed = totalMarks.toFixed(2);
        const percentage = ((scoredMarks / totalMarks) * 100).toFixed(2);
    
        document.getElementById("text-scored").innerHTML = `Scored Marks: <br>${scoredMarksFixed}`;
        document.getElementById("text-total").innerHTML = `Total Marks: <br>${totalMarksFixed}`;
        document.getElementById("txt-percentage").innerHTML = `Percentage: <br>${percentage}%`;
    
        document.getElementById("display-result").style.display = "block";
        document.getElementById("btn-print-pdf").style.display = "block";
    
        displayResult(totalMarksFixed, scoredMarksFixed, percentage);
    }

    function displayResult(totalMarks, scoredMarks, percentage) {
        let tableBody = document.getElementById("table-body-display");
        let Scored = document.getElementsByClassName("Scored");
        let Total = document.getElementsByClassName("total");
        let subject = document.getElementsByClassName("subject");

        let displayRowData = "";

        for (let i = 0; i < Scored.length; i++) {
        displayRowData += `
        <tr>
          <td>${subject[i].value}</td>
          <td>${Scored[i].value}</td>
          <td>${Total[i].value}</td>
        </tr>`;
        }
        tableBody.innerHTML = displayRowData;

        document.getElementById("text-display-percentage").innerHTML =
            "Percentage: <br>" + percentage + "%";
        document.getElementById("text-display-scored").innerHTML = "Scored Marks: <br>" + scoredMarks;
        document.getElementById("text-display-total").innerHTML = "Total Marks: <br>" + totalMarks;
        document.getElementById("text-display-student-name").innerHTML = document.getElementsByClassName("name")[0].value;

        document.getElementById("btn-print-pdf").style.display = "block";
    }

    async function downloadPDF() {
        const { jsPDF } = window.jspdf;

        const content = document.getElementById('display-result');

        // Use html2canvas to capture the div content as a canvas
        const canvas = await html2canvas(content);
        const imgData = canvas.toDataURL('image/png');

        // Create jsPDF instance
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Calculate width and height for the image to fit into a4 paper size
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Add image to PDF
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // While content is larger than one page
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save the generated PDF
        pdf.save('content.pdf');
    }

    function calculateSingleMarks(){
        let scoredMarks = document.getElementById("single-scored-marks");
        let outOfMarks = document.getElementById("single-outOf-marks");

        scoredMarks = parseFloat(scoredMarks.value) || 0;
        outOfMarks = parseFloat(outOfMarks.value) || 0;

        let total = scoredMarks * (100/outOfMarks);

        document.getElementById("calculated-percent").innerText = total.toFixed(2)+"%";
    }
