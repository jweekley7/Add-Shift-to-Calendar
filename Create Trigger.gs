//Creates a trigger that runs every hour calling runOnEdit().
function createTriggers() {
  ScriptApp.newTrigger('runOnEdit').timeBased().everyHours(1).create();
}

//We make the schedules in advance. Google has placed limits on the number of events created in a given time frame. I don't want events to be made until the schedule is finalized. If it falls within a date range (first day of new schedule and last day of new schedule), it will begin the process of creating a trigger.
function checkDateToMakeTrigger() {

  const spreadsheet = SpreadsheetApp.getActive();
  const spreadsheetFinalSchedule = spreadsheet.getSheetByName("FINAL SCHEDULE (Do NOT Edit)");

  const today = new Date();
  const lastDatePlusOne = new Date(spreadsheetFinalSchedule.getRange('AR2').getValue())

  if (today.getFullYear() <= lastDatePlusOne.getFullYear() || today.getMonth() <= lastDatePlusOne.getMonth() || today.getDate() <= lastDatePlusOne.getDate()+1) {

    checkForExistingTriggers()
  }
}

//If there is an existing trigger, don't make a new one.
function checkForExistingTriggers() {

  if (ScriptApp.getProjectTriggers().length > 0) {
    
  } else {
    createTriggers();
  }
}
