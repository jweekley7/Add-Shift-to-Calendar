//This function runs anytime the sheet is edited. It is also the function that is called each day in the trigger.
function runOnEdit () {

  copyAddShifts();
  copyAddShiftsBen();
  copyAddShiftsJessicaP();
  checkDateToMakeTrigger();
  lastDayOfTriggers();
}

//If you need to change the timezone of your spreadsheet, here's how you do it.
function changeZone() {
  
  const spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setSpreadsheetTimeZone('America/Chicago')
}
