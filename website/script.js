document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculateCharges");
  const summaryTable = document.getElementById("summaryTable");
  const totalCharges = document.getElementById("totalCharges");

  calculateButton.addEventListener("click", function () {
    const visitDate = document.getElementById("visitDate").value;
    const timeSlot = document.getElementById("timeSlot").value;
    const ticketForm = document.getElementById("ticketForm");
    const ticketCategories = ticketForm.querySelectorAll('input[name="ticketCategory"]');
    const ticketCounts = ticketForm.querySelectorAll('input[name="ticketCount"]');
    
    let summaryDate = document.getElementById("summaryDate");
    let summaryTime = document.getElementById("summaryTime");
    let summaryDuration = document.getElementById("summaryDuration");
    let SLAdultSummary = document.getElementById("SLAdult");
    let SLChildSummary = document.getElementById("SLChild");
    let FAdultSummary = document.getElementById("FAdult");
    let FChildSummary = document.getElementById("FChild");
    let InfantSummary = document.getElementById("Infant");
    let summaryTotal = document.getElementById("summaryTotal");
    
    let totalCharge = 0;
    let SLAdultCharge = 0;
    let SLChildCharge = 0;
    let FAdultCharge = 0;
    let FChildCharge = 0;
    let InfantCharge = 0;
    
    summaryDate.textContent = visitDate;
    summaryTime.textContent = timeSlot;
    
    for (let i = 0; i < ticketCategories.length; i++) {
      const ticketCategory = ticketCategories[i].value;
      const ticketCount = parseInt(ticketCounts[i].value);
      let normalCharge = 0;
      let peakCharge = 0;
      
      switch (ticketCategory) {
        case "SLAdult":
          normalCharge = 4;
          peakCharge = 6;
          SLAdultCharge = ticketCount * (timeSlot.includes("peak") ? peakCharge : normalCharge);
          SLAdultSummary.textContent = SLAdultCharge;
          break;
          
        case "SLChild":
          normalCharge = 2;
          peakCharge = 3;
          SLChildCharge = ticketCount * (timeSlot.includes("peak") ? peakCharge : normalCharge);
          SLChildSummary.textContent = SLChildCharge;
          break;
          
        case "ForeignerAdult":
          normalCharge = 10;
          peakCharge = 13;
          FAdultCharge = ticketCount * (timeSlot.includes("peak") ? peakCharge : normalCharge);
          FAdultSummary.textContent = FAdultCharge;
          break;
          
        case "ForeignerChild":
          normalCharge = 5;
          peakCharge = 8;
          FChildCharge = ticketCount * (timeSlot.includes("peak") ? peakCharge : normalCharge);
          FChildSummary.textContent = FChildCharge;
          break;
          
        case "Infant":
          InfantCharge = 0;
          InfantSummary.textContent = InfantCharge;
          break;
      }
      
      totalCharge += ticketCount * (timeSlot.includes("peak") ? peakCharge : normalCharge);
    }
    
    summaryDuration.textContent = timeSlot;
    summaryTotal.textContent = totalCharge;
    totalCharges.textContent = "Total Charges: $" + totalCharge;
    
    summaryTable.style.display = "block";

    // Store data in local storage
    const bookingData = {
      date: visitDate,
      time: timeSlot,
      charges: {
        SLAdult: SLAdultCharge,
        SLChild: SLChildCharge,
        FAdult: FAdultCharge,
        FChild: FChildCharge,
        Infant: InfantCharge,
      },
      total: totalCharge,
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
  });
});






