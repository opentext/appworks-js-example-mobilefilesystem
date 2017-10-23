var mDirectories = [];
var mMobileFileSystem = null;
var mKeyValuePairCount = 0;

function getMobileFileSystem() {
  if(mMobileFileSystem == null) {
    mMobileFileSystem = new Appworks.MobileFileSystem();
  }
  return mMobileFileSystem;
}

/************************
* File Transfer Methods *
************************/

// Download a file
function download(sourceElementId, filenameElementId, sharedElementId) {
  // Create the MobileFileSystem instance
  var mfs = getMobileFileSystem();

  // Get the web source
  var source = getValue(sourceElementId);

  // Get the filename
  var filename = getValue(filenameElementId);

  // Is it to be placed in shared location?
  var shared = isChecked(sharedElementId);

  // pass in any specific headers
  var headers = {};

  mfs.download(source, filename, headers, shared, function(result) {
    output(result);
  }, function(error) {
    output(error);
  });
}

// Upload a file
function upload(sourceFilenameElId, uploadDestinationElId, fileParameterNameElId, sharedElementId) {
    var mfs = getMobileFileSystem();

    var filepath = getPathPrefix() + getValue(sourceFilenameElId);
    var destination = getValue(uploadDestinationElId);
    var shared = isChecked(sharedElementId);
    var headers = {"someHeaderKey" : "someHeaderValue"};

    var fileParameterName = getValue(fileParameterNameElId);
    var formJson = {};

    for (var i = 0; i < mKeyValuePairCount; i++) {
      formJson[getValue("key-"+(i+1))] = getValue("value-"+(i+1));
    }

    mfs.upload(filepath, destination, fileParameterName, formJson, headers, shared, function(result) {
      output(result);
    }, function(error) {
      output(error);
    });

    closeActions();
}

/***********************
* File Listing Methods *
***********************/

// List all objects in a directory
function list(directory, sharedElementId) {

  if(typeof Appworks == "undefined") {
      showFilesInList(getDummyList());
      return;
  }

  // Create the MobileFileSystem instance
  var mfs = getMobileFileSystem();

  // Is it to be placed in shared location?
  var shared = isChecked(sharedElementId);

  mfs.list(directory, shared, function(result) {
    showFilesInList(result, false);
  }, function(error){
    showFilesInList([], false);
    output(error);
  });
}

/**********************
* File Import Methods *
**********************/

// List all objects in import directory
function listImports() {
  // Create the MobileFileSystem instance
  var mfs = getMobileFileSystem();

  mfs.listImports(function(result) {
    showFilesInList(result, true);
  }, function(error){
    showFilesInList([], true);
    output(error);
  });
}

// Move an import file to shared/non shared directory
function moveImport(sourceFilenameElId, destinationFilenameElId, destinationSharedElId) {
  var mfs = getMobileFileSystem();

  var sourceFilepath = getValue(sourceFilenameElId);
  var destinationFilepath = getValue(destinationFilenameElId);
  var destinationShared = isChecked(destinationSharedElId);

  mfs.moveImport(sourceFilepath, destinationFilepath, destinationShared, function() {
    output("Import " + sourceFilepath + " moved with name " + destinationFilepath);
  }, function() {
    output("Import was not moved");
  });

  closeImportAction();
  listImports();
}

/*******************
* File I/O Methods *
*******************/

// Check if a fie exists
function exists(sourceFilenameElId, sharedElementId) {
  var mfs = getMobileFileSystem();

  var filepath = getPathPrefix() + getValue(sourceFilenameElId);
  var shared = isChecked(sharedElementId);

  mfs.exists(filepath, shared, function() {
    output(filepath + " exists");
  }, function() {
    output(filepath + " does not exist");
  });

  closeActions();
}

// Rename a file
function rename(sourceFilenameElId, destinationFilenameElId, sharedElementId) {
  var mfs = getMobileFileSystem();

  var sourceFilepath = getPathPrefix() + getValue(sourceFilenameElId);
  var destinationFilepath = getPathPrefix() + getValue(destinationFilenameElId);
  var shared = isChecked(sharedElementId);

  mfs.rename(sourceFilepath, destinationFilepath, shared, function() {
    output("File at " + sourceFilepath + " renamed to " + destinationFilepath);
  }, function() {
    output("File was not renamed");
  });

  closeActions();
  list(getPathPrefix(), "list-shared");
}

// Move a file
function move(moveSourceElId, moveSourceSharedElId, moveDestinationElId, moveDestinationSharedElId) {
  var mfs = getMobileFileSystem();

  var sourceFilepath = getValue(moveSourceElId);
  var sourceShared = isChecked(moveSourceSharedElId);
  var destinationFilepath = getValue(moveDestinationElId);
  var destinationShared = isChecked(moveDestinationSharedElId);

  mfs.move(sourceFilepath, sourceShared, destinationFilepath, destinationShared, function() {
    output("File at " + sourceFilepath + " moved to " + destinationFilepath);
  }, function() {
    output("File was not moved");
  });

  closeActions();
  list(getPathPrefix(), "list-shared");
}

// Copy a file
function copy(copySourceElId, copySourceSharedElId, copyDestinationElId, copyDestinationSharedElId) {
  var mfs = getMobileFileSystem();

  var sourceFilepath = getValue(copySourceElId);
  var sourceShared = isChecked(copySourceSharedElId);
  var destinationFilepath = getValue(copyDestinationElId);
  var destinationShared = isChecked(copyDestinationSharedElId);

  mfs.copy(sourceFilepath, sourceShared, destinationFilepath, destinationShared, function() {
    output("File at " + sourceFilepath + " copied to " + destinationFilepath);
  }, function() {
    output("File was not copied");
  });

  closeActions();
  list(getPathPrefix(), "list-shared");
}

// Remove a file
function remove(sourceFilenameElId, sharedElementId) {
    var mfs = getMobileFileSystem();

    var filepath = getPathPrefix() + getValue(sourceFilenameElId);
    var shared = isChecked(sharedElementId);

    mfs.remove(filepath, shared, function() {
      output(filepath + " removed");
    }, function() {
      output(filepath + " was not removed");
    });

    closeActions();
    list(getPathPrefix(), "list-shared");
}

// Open a file
function openFile(sourceFilenameElId, sharedElementId) {
  var mfs = getMobileFileSystem();

  var filepath = getPathPrefix() + getValue(sourceFilenameElId);
  var shared = isChecked(sharedElementId);

  mfs.open(filepath, shared, function() {
    output(filepath + " opened");
  }, function() {
    output(filepath + " open failed");
  });

  closeActions();
}

// Share a file
function share(sourceFilenameElId, sharedElementId) {
  var mfs = getMobileFileSystem();

  var filepath = getPathPrefix() + getValue(sourceFilenameElId);
  var shared = isChecked(sharedElementId);

  mfs.share(filepath, shared, function() {
    output(filepath + " shared");
  }, function() {
    output(filepath + " share failed");
  });

  closeActions();
}

// Open a file using quicklook
function quicklook(sourceFilenameElId, sharedElementId) {
  var mfs = getMobileFileSystem();

  var filepath = getPathPrefix() + getValue(sourceFilenameElId);
  var shared = isChecked(sharedElementId);

  mfs.quicklook(filepath, shared, function() {
    output(filepath + " quicklooked");
  }, function() {
    output(filepath + " quicklook failed");
  });

  closeActions();
}

// If viewing without appworks, at least we have something to see in the list view
function getDummyList() {
  var list = [];

  list[0] = {"filename" : "Mock_Directory", "filesize" : 0, "lastmodified" : 0, "type" : "directory"}
  list[1] = {"filename" : "Mock_Directory_2", "filesize" : 0, "lastmodified" : 0, "type" : "directory"}
  list[2] = {"filename" : "Mock_File", "filesize" : 5000, "lastmodified" : 1503400000, "type" : "file"}
  list[3] = {"filename" : "Mock_File_2", "filesize" : 1500, "lastmodified" : 1503420000, "type" : "file"}
  list[4] = {"filename" : "Mock_File_3", "filesize" : 3358, "lastmodified" : 1503300000, "type" : "file"}
  list[5] = {"filename" : "Mock_File_4 (1).docx", "filesize" : 3358, "lastmodified" : 1503300000, "type" : "file"}

  return list;
}

// Display the file list in a table stucture
function showFilesInList(files, isImport) {
  var table = "<table id='list-table'>";
  table += "<thead><tr>";
  table += "<th class='list-col-1'></th>";
  table += "<th class='list-col-2'>Name</th>";
  table += "<th class='list-col-3'>Size</th>";
  table += "</thead></tr><tbody>";

  // Object is a directory
  if(mDirectories.length > 0) {
    table += "<tr onclick='removeDirectory()'>";
    table += "<td><img class='list-image' src='images/"+ imgForType("directory") +"'/></td>";
    table += "<td>..</td>";
    table += "<td></td>";
    table += "</tr>";
  }

  // Object is a file
  for(var i = 0; i < files.length; i++) {
    table += "<tr onclick=\""+clickValueForRow(files[i], isImport)+"\">";
    table += "<td><img class='list-image' src='images/"+ imgForType(files[i].type) +"'/></td>";
    table += "<td>" + files[i].filename + "</td>";
    table += "<td>" + (files[i].type == "file" ? bytesToSize(files[i].filesize) : "") + "</td>";
    table += "</tr>";
  }

  table += "</tbody></table>";

  // Are we listing for imports or general?
  if(isImport) {
    setInnerHTML("imports-table-wrapper", table);
  } else {
    setInnerHTML("list-table-wrapper", table);
  }
}

// Return the icon for the object type (file or directory)
function imgForType(type) {
  if(type == "file") {
    return "file.png";
  } else {
    return "directory.png";
  }
}

// Display the formatted filesize
function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

// Set the click event for a file list row
function clickValueForRow(file, isImport) {
  var string = "";
  if(isImport) {
    string += "importItemClick('";
  } else {
    string += "listItemClick('";
  }
  string += file.filename;
  string += "','";
  string += file.type;
  string += "')";
  return string
}

// A regular file list row click, show the file actions
function listItemClick(name, type) {
  closeActions();
  closePanel("file-section");
  if(type == "file") {
    setSelectedFilename(name);
    showPanel("file-section");
  }

  if(type == "directory") {
    addDirectory(name);
  }
}

// An import file list row click, show the import actions
function importItemClick(name, type) {
  closeActions();
  closePanel("import-file-section");
  if(type == "file") {
    setSelectedImportFilename(name);

    setImportFields();
    showPanel("import-file-section");
  }
}

// Set the filename in a hidden field so we know which file we are performing actions on
function setSelectedFilename(filename) {
  setValue('selected-filename', filename);
}

// Get the filename from a hidden field so we know which file we are performing actions on
function getSelectedFilename() {
  return getValue('selected-filename');
}

// Push the directory name into the directories array
function addDirectory(directory) {
  mDirectories.push(directory);
  setDirectory();
}

// Pop the last directory name from the directories array
function removeDirectory() {
  mDirectories.pop();
  setDirectory();
}

// Create the directory pathing to list the objects from
function setDirectory() {
  var string = mDirectories.join("/");

  var el = document.getElementById("list-directory");
  el.value = string;
  el.style.display = "block"

  list(string, "list-shared");
}

// Set the import filename in a hidden field so we know which file we are performing actions on
function setSelectedImportFilename(filename) {
  setValue('selected-import-filename', filename);
}

// Get the import filename from a hidden field so we know which file we are performing actions on
function getSelectedImportFilename() {
  return getValue('selected-import-filename');
}

// Join the directories array into a string to prefix the filename. This is our relative filepath.
function getPathPrefix() {
  if(mDirectories.length == 0) {
    return "";
  }
  return mDirectories.join("/") + "/";
}

// Return a boolean on whether the checkbox in question is checked
function isChecked(element) {
  var sharedElement = document.getElementById(element);
  var shared = sharedElement.checked;
  return shared;
}

// Check/uncheck a checkbox
function setChecked(element, checked) {
  var sharedElement = document.getElementById(element);
  sharedElement.checked = checked;
}

// Get the value property from an input element
function getValue(element) {
  var obj = document.getElementById(element);
  var value = obj.value;
  return value;
}

// Set the value property from an input element
function setValue(element, value) {
  var obj = document.getElementById(element);
  obj.value = value;
}

// Set inner HTML of an element
function setInnerHTML(element, value) {
  var sharedElement = document.getElementById(element);
  sharedElement.innerHTML = value;
}

function toggleSection(element) {
  var el = document.getElementById(element);
  if(el.style.display == "none" || el.style.display == "") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}

function closePanel(element) {
  var el = document.getElementById(element);
  el.style.display = "none";
}

function showPanel(element) {
  var el = document.getElementById(element);
  el.style.display = "block";
}

function showAction(element) {
  closeActions();
  closePanel("file-section");
  showPanel("action-section");
  var el = document.getElementById(element);
  el.style.display = "block";
}

function closeActions() {
  var actions = ['rename','move','copy','remove','upload'];
  for(var i = 0; i < actions.length; i++) {
    var el = document.getElementById(actions[i]);
    el.style.display = "none";
  }
  closePanel("action-section");
  clearFormKeyValueInput();
}

function setRenameFields() {
  setValue('rename-source', getSelectedFilename());
  setValue('rename-destination', getSelectedFilename());
}
function setMoveFields() {
  setValue("move-source", getPathPrefix() + getSelectedFilename());
  setValue("move-destination", getPathPrefix() + getSelectedFilename());
  setChecked("move-destination-shared", isChecked("list-shared"));
}
function setCopyFields() {
  setValue("copy-source", getPathPrefix() + getSelectedFilename());
  setValue("copy-destination", getPathPrefix() + getSelectedFilename());
  setChecked("copy-destination-shared", isChecked("list-shared"));
}

function closeImportAction() {
  closePanel("import-file-section");
}

function setImportFields() {
  setValue("import-destination", getSelectedImportFilename());
  setChecked("import-destination-shared", false);
}

function addFormKeyValueInput() {
  mKeyValuePairCount++;
  var el = document.getElementById("form-key-value-wrapper");

  var string = "";
  string += '<input type="text" class="input-text input-text-half-right" name="value-'+mKeyValuePairCount+'" id="value-'+mKeyValuePairCount+'" />';
  string += '<input type="text" class="input-text input-text-half-left" name="key-'+mKeyValuePairCount+'" id="key-'+mKeyValuePairCount+'" />';

  el.innerHTML += string;
}

function clearFormKeyValueInput() {
  mKeyValuePairCount = 0;
  setInnerHTML("form-key-value-wrapper", "");
}

// Display any results in the output element
function output(obj) {
  if(typeof obj === "object") {
    setInnerHTML("result", JSON.stringify(obj));
  } else {
    setInnerHTML("result", obj);
  }
}
