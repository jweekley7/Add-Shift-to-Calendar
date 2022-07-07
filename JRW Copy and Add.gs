//This looks for my row in the spreadsheet and copies all of my shifts to a new sheet titled "Justin W". On that sheet, the start/end times of each shift are added so that info can be used to create the calendar event.
async function copyAddShifts() {
  
  const spreadsheet = SpreadsheetApp.getActive();
  
//My personal sheet
  const spreadsheetJustinW = spreadsheet.getSheetByName("Justin W");
  
//Master schedule sheet
  const spreadsheetFinalSchedule = spreadsheet.getSheetByName("FINAL SCHEDULE (Do NOT Edit)");
  
//Formats the date column
  spreadsheetJustinW.getRange('D:D').activate();
  spreadsheetJustinW.getActiveRangeList().setNumberFormat('M/d/yyyy');
  
//Copies the dates from the master schedule to my sheet and transposes them from a row to a column (that's the boolean parameter at the end)
  spreadsheetFinalSchedule.getRange("C2:AR2").copyTo(spreadsheetJustinW.getRange("D1"), SpreadsheetApp.CopyPasteType.PASTE_VALUES, true);
  
  for (i=0; i<spreadsheetFinalSchedule.getLastRow(); i++) {
    
//Looks in the master schedule for the row with my name. Sometimes new rows are added so I couldn't just look for a static row every time.    
    if (spreadsheetFinalSchedule.getRange("B4").offset(i, 0).getValue() == "Justin W") {

//Copies the shift names from the master schedule to my sheet and transposes them from a row to a column (that's the boolean parameter at the end)    
      spreadsheetFinalSchedule.getRange(i+4, 3, 1, 42).copyTo(spreadsheetJustinW.getRange("C1"), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, true);
      
//Enter your calendar ID. For obvious reasons I blotted mine out.      
      const calendarJustinW = CalendarApp.getCalendarById("Your Calendar ID");
            
      for (j=0; j<spreadsheetJustinW.getLastRow(); j++) {
      
//Gets the shift name, start time, and end time for each row        
        const shiftName = spreadsheetJustinW.getRange("C1").offset(j, 0);
        const startTime = shiftName.offset(0, -2);
        const endTime = shiftName.offset(0, -1);
        
//On days that I'm not scheduled the master schedule cells are left blank. This makes sure those days are not blank. Without this, it throws an error        
        if (shiftName.getValue() && startTime.getValue() && endTime.getValue()) {
          
//If no other events are scheduled during the start/end time range, create new event. This works because I have a special calendar that only has my work schedule on it. No other events should be scheduled on it. If you are integrating this with another calendar you use, you would need a better way to check for duplicate events. Try using the event name or event ID.
          if (await calendarJustinW.getEvents(startTime.getValue(), endTime.getValue()).length == 0) {  
            
//My goal was to make this asynchronous. Not sure if it is actually doing anything. Seems to be working fine.            
            await calendarJustinW.createEvent(shiftName.getValue(), startTime.getValue(), endTime.getValue());
          
//If an event already exists during the start/end time range...  
          } else if (await calendarJustinW.getEvents(startTime.getValue(), endTime.getValue()).length > 0) {
          
//...deletes the existing and creates a new event
            await calendarJustinW.getEvents(startTime.getValue(), endTime.getValue())[0].deleteEvent();
            await calendarJustinW.createEvent(shiftName.getValue(), startTime.getValue(), endTime.getValue());
            
          }
        }
      }
    }  
  }

//Hides my personal sheet. This is just to prevent confusion with the rest of the staff.  
  spreadsheetJustinW.hideSheet();
}
