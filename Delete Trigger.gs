//Because of the limits that Google places, I don't want this running forever so I delete the triggers once the schedule ends.
function deleteTriggers() {
  
//Returns an array of triggers. There is only one trigger for this project. If there were multiple, you'd need to figure out how to delete the correct one.  
  const triggers = ScriptApp.getProjectTriggers();
  ScriptApp.deleteTrigger(triggers[0])
}

//Checks for the last day of the schedule
function lastDayOfTriggers() {

  const spreadsheet = SpreadsheetApp.getActive();
  const spreadsheetFinalSchedule = spreadsheet.getSheetByName("FINAL SCHEDULE (Do NOT Edit)");

  const today = new Date();
  const lastDatePlusOne = new Date(spreadsheetFinalSchedule.getRange('AR2').getValue())

  if (today.getFullYear() === lastDatePlusOne.getFullYear() && today.getMonth() === lastDatePlusOne.getMonth() && today.getDate() === lastDatePlusOne.getDate()+1) {

    deleteTriggers()
  }
}
