class PrintCustom {
  printStyle = `
      body {
     -webkit-print-color-adjust: exact !important;
           }
          @media print {
  
              .no-print,
              .no-print-me,
              .no-print * {
                  display: none !important;
              }
  
              .to-print {
                  display: block !important;
              }
  
              .modal-backdrop {
                display: none !important;
              }
  
  
  
  
          }`;

  constructor() {}

  removeNoPrintClass() {
    for (const elem of document.body.children) {
      elem.classList.remove("no-print-me");
    }
  }

  printElement(elementToPrint) {
    const printDiv = document.getElementById("printDivCustom");
    if (printDiv) printDiv.parentNode.removeChild(printDiv);
    const clnElementToPrint = elementToPrint.cloneNode(true);
    var node = document.createElement("div");
    node.setAttribute("id", "printDivCustom");
    node.setAttribute("class", "to-print");
    node.style.display = "none";

    node.appendChild(clnElementToPrint);
    document.body.prepend(node);

    for (const elem of document.body.children) {
      if (elem === node) continue;
      elem.classList.add("no-print-me");
    }

    var style = document.createElement("style");
    style.innerHTML = this.printStyle;
    document.head.appendChild(style);

    window.removeEventListener("afterprint", this.removeNoPrintClass);
    window.addEventListener("afterprint", this.removeNoPrintClass);

    print();
  }

  printDocAsPdf(el) {
    // to use add html2canvas and jsPDF cdn.
    html2canvas(el).then((canvas) => {
      let imgData = canvas.toDataURL("image/png");
      let print;
      // @ts-ignore

      const pdf = new jsPDF();

      let imgHeight = (canvas.height * 208) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, 208, imgHeight);
      document.body.appendChild(canvas);
      //pdf.save(`CV.pdf`);
      // linkElement.href = canvas.toDataURL('image/png');
      // linkElement.download = 'table.png';
      // linkElement.click();

      if (print === "dpwnloadAsPdf") {
        // pdf.save(`CV.pdf`);
      } else {
        pdf.autoPrint();
        const cvUrl = pdf.output("bloburl");
        const iframe = "<iframe id='printf' width='100%' height='100%' src='" + cvUrl + "'></iframe>";
        const printDiv = document.getElementById("printDiv");
        printDiv.innerHTML = iframe;
        const pdfCV = document.getElementById("iframe");
        // pdfCV.window.print();
      }
    });
  }
}
