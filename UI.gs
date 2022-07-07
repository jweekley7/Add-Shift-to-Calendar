//Installs a custom menu on the spreadsheet. Also calls the function that changes the timezone.
function onOpen(e) {
  
  const menu = SpreadsheetApp.getUi().createMenu('Custom Menu');
  
  if (e && e.authMode == ScriptApp.AuthMode.NONE) {
    
    menu.addItem('Add Shifts to Personal Calendar', 'runOnEdit');
    changeZone()

  } else {
   
    const properties = PropertiesService.getDocumentProperties();
    const workflowStarted = properties.getProperty('workflowStarted');

    if (workflowStarted) {
      menu.addItem('Check workflow status', 'checkWorkflow');
    } else {

      //This runs the menu without authorization.
      menu.addItem('Add Shifts to Personal Calendar', 'runOnEdit');
      changeZone()
    }
  }
  menu.addToUi();
}

