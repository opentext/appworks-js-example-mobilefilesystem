# AppWorks Example - MobileFileSystem

## Contents
1. [About appworks.js](#about-appworksjs)
2. [About this example app](#about-this-example)
3. [Usage](#usage)
4. [Installation](#installation)

## About appworks.js

appworks.js is a javascript (TypeScript) library for building feature rich, hybrid enterprise apps. The OpenText AppWorks platform provides mobile and desktop clients that support apps that utilize appworks.js.

In a mobile environment the library provides access to on-device technology, and in the desktop environment some features of the underlying host OS (operating system) are exposed.

For more information, see the appworks.js repository: https://github.com/opentext/appworks-js

## About this example

The purpose of the MobileFileSystem plugin is to provide a set of methods allow apps to access, move, copy, remove, rename, download, upload, open and share files from both the documents directory and file provider storage directory.

This plugin deprecates AWFileTransfer, Finder and SecureStorage but combining the functionality into one plugin and simplifying them.

Each method has a shared boolean parameter, indicating whether the file location you are targeting is in the documents directory (shared) or file provider storage directory (non shared).

Shared (true) means to share the file with other apps in the appworks container

Shared (false) means to store privately in your apps file provider storage location. This can still be accessed via the file provider and open in methods.

## Usage

### File I/O Methods:

#### list

```javascript
list(directory: string, shared: boolean, success: any, error: any)
```

__list__ returns a list of files in a given directory relative to the shared/non shared directory

+ __directory__: the directory relative to the shared/non shared directory
+ __shared__: source relative to shared or non shared
+ __success__: callback called returning a list of file objects
+ __error__: callback called if there is a client side error

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;

mfs.list(directory, shared, function(files) {
  // Iterate through files
  for(var i = 0; i < files.length; i++) {
    // files[i].type: (String) "file"|"directory"
    // files[i].filename: (String) name of the file with extension
    // files[i].extension: (String) the file extension
    // files[i].path (String) the fullpath to the file
    // files[i].filesize (Int) the filesize on disk
    // files[i].lastmodified (Int) the last modified timestamp
  }
}, function(error){
  console.log(error);
});
```

#### exists

```javascript
exists(source: string, shared: boolean, success: any, error: any)
```

__exists__ allows you check check if a file exists at a given directory

+ __source__: the filepath relative to the shared/non shared directory
+ __shared__: source relative to shared or non shared
+ __success__: callback called if the file exists
+ __error__: callback called if the file does not exist

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;
var filepath = "MyFile.pdf"

mfs.exists(filepath, shared, function() {
  console.log(filepath + " exists");
}, function() {
  console.log(filepath + " does not exist");
});
```
#### rename

```javascript
rename(source: string, destination: string, shared: boolean, success: any, error: any)
```

__rename__ allows you rename a file

+ __source__: the source filepath relative to the shared/non shared directory
+ __destination__: the destination filepath relative to the shared/non shared directory
+ __shared__: source relative to shared or non shared
+ __success__: callback called if the file was renamed successfully
+ __error__: callback called if the file was not renamed

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;
var sourceFilepath = "MyFile.pdf"
var destinationFilepath = "MyRenamedFile.pdf"

mfs.rename(sourceFilepath, destinationFilepath, shared, function() {
  console.log("File at " + sourceFilepath + " renamed to " + destinationFilepath);
}, function() {
  console.log("File was not renamed");
});
```
#### copy

```javascript
copy(source: string, sourceShared: boolean, destination: string, destinationShared: boolean, success: any, error: any)
```

__copy__ allows you copy a file

+ __source__: the source filepath relative to the shared/non shared directory
+ __source shared__: source relative to shared or non shared
+ __destination__: the destination filepath relative to the shared/non shared directory
+ __destination shared__: destination relative to shared or non shared
+ __success__: callback called if the file was copied successfully
+ __error__: callback called if the file was not copied

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;

var sourceFilepath = "MyFile.pdf"
var destinationFilepath = "MyDirectory/MyFile.pdf"

mfs.copy(sourceFilepath, shared, destinationFilepath, shared, function() {
  console.log("File at " + sourceFilepath + " copied to " + destinationFilepath);
}, function() {
  console.log("File was not copied");
});
```
#### move

```javascript
move(source: string, sourceShared: boolean, destination: string, destinationShared: boolean, success: any, error: any)
```

__move__ allows you move a file

+ __source__: the source filepath relative to the shared/non shared directory
+ __source shared__: source relative to shared or non shared
+ __destination__: the destination filepath relative to the shared/non shared directory
+ __destination shared__: destination relative to shared or non shared
+ __success__: callback called if the file was moved successfully
+ __error__: callback called if the file was not moved

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;

var sourceFilepath = "MyFile.pdf"
var destinationFilepath = "MyDirectory/MyFile.pdf"

mfs.move(sourceFilepath, shared, destinationFilepath, shared, function() {
  console.log("File at " + sourceFilepath + " moved to " + destinationFilepath);
}, function() {
  console.log("File was not moved");
});
```

#### remove

```javascript
remove(source: string, shared: boolean, success: any, error: any)
```

__remove__ allows you remove/delete a file

+ __source__: the filepath relative to the shared/non shared directory
+ __shared__: source relative to shared or non shared
+ __success__: callback called if the file is removed
+ __error__: callback called if the file is not removed

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;
var filepath = "MyFile.pdf"

mfs.remove(filepath, shared, function() {
  console.log(filepath + " removed");
}, function() {
  console.log(filepath + " was not removed");
});

```

### File Import Methods:

#### listImports

```javascript
listImports(success: any, error: any)
```

__listImports__ returns a list of files in your apps import directory

+ __success__: callback called returning a list of file objects
+ __error__: callback called if there is a client side error

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;

mfs.listImports(function(result) {
  // Iterate through files
  for(var i = 0; i < files.length; i++) {
    // files[i].type: (String) "file"|"directory"
    // files[i].filename: (String) name of the file with extension
    // files[i].extension: (String) the file extension
    // files[i].path (String) the fullpath to the file
    // files[i].filesize (Int) the filesize on disk
    // files[i].lastmodified (Int) the last modified timestamp
  }
}, function(error){
  console.log(error);
});
```

#### moveImport

```javascript
moveImport(source: string, destination: string, desintationShared: boolean, success: any, error: any)
```

__moveImport__ allows you move a file from the imports directory to a directory of your choosing

+ __source__: the source filename in the imports directory
+ __destination__: the destination filepath relative to the shared/non shared directory
+ __destination shared__: destination relative to shared or non shared
+ __success__: callback called if the file was moved successfully
+ __error__: callback called if the file was not moved

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;

var sourceFilepath = "MyFile.pdf"
var destinationFilepath = "MyDirectory/MyFile.pdf"

mfs.moveImport(sourceFilepath, destinationFilepath, shared, function() {
  console.log("Import " + sourceFilepath + " moved with name " + destinationFilepath);
}, function() {
  console.log("Import was not moved");
});
```

### File Open Methods:

#### open

```javascript
open(source: string, shared: boolean, success: any, error: any)
```

__open__ allows you open the file in a third party app

+ __source__: the filepath relative to the shared/non shared directory
+ __shared__: source relative to shared or non shared
+ __success__: callback called if the file opens successfully
+ __error__: callback called if the file was not opened

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;
var filepath = "MyFile.pdf"

mfs.open(filepath, shared, function() {
  console.log(filepath + " opened");
}, function() {
  console.log(filepath + " open failed");
});
```

#### share

```javascript
share(source: string, shared: boolean, success: any, error: any)
```

__share__ allows you open the file in a third party app, much the same as open, but Android handles this slighty different, warranting a second method

+ __source__: the filepath relative to the shared/non shared directory
+ __shared__: source relative to shared or non shared
+ __success__: callback called if the file opens successfully
+ __error__: callback called if the file was not opened

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;
var filepath = "MyFile.pdf"

mfs.share(filepath, shared, function() {
  console.log(filepath + " shared");
}, function() {
  console.log(filepath + " share failed");
});
```

#### quicklook

```javascript
quicklook(source: string, shared: boolean, success: any, error: any)
```

__quicklook__ allows you open the file in iOS using the QuickLook framework with MS office documents and PDFs supported, on Android, you can only use this with PDFs

+ __source__: the filepath relative to the shared/non shared directory
+ __shared__: source relative to shared or non shared
+ __success__: callback called if the file opens successfully
+ __error__: callback called if the file was not opened

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;
var filepath = "MyFile.pdf"

mfs.quicklook(filepath, shared, function() {
  console.log(filepath + " quicklooked");
}, function() {
  console.log(filepath + " quicklook failed");
});
```

### File Transfer Methods:

#### download

```javascript
download(source: string, destination: string, headers: any, shared: boolean, success: any, error: any)
```

__download__ allows you to download a file from a URL to a destination filepath

+ __source__: the URL of the file to be downloaded
+ __destination__: the destination filepath relative to the shared/non shared directory
+ __headers__: any additional headers besides the standard auth tokens automatically injected
+ __shared__: destination relative to shared or non shared
+ __success__: callback called if the file downloaded successfully
+ __error__: callback called if the file was not downloaded

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;
var source = "http://mydomain.com/myapi/myfile";
var destination = "MyFile.pdf";
var headers = {};

mfs.download(source, destination, headers, shared, function(result) {
  console.log(result);
}, function(error) {
  console.log(error);
});
```

#### upload

```javascript
upload(source: string, destination: string, fileParameterName: string, formData: any, headers: any, shared: boolean, success: any, error: any)
```

__upload__ allows you to upload a file to a URL

+ __source__: the source filepath relative to the shared/non shared directory
+ __destination__: the destination URL
+ __fileParameterName__: the file parameter name used to identify the file in the request
+ __formData__: a json object of the form data to be added to the request
+ __headers__: any additional headers besides the standard auth tokens automatically injected
+ __shared__: source relative to shared or non shared
+ __success__: callback called if the file uploaded successfully
+ __error__: callback called if the file was not uploaded

Examples
```javascript
var mfs = new Appworks.MobileFileSystem();
var shared = false;

var source = "MyFile.pdf";
var destination = "http://mydomain.com/myapi/upload";
var fileParameterName = "File";
var formData = {
  "filename":"MyFile.pdf",
  "user":"j.smith"
};
var headers = {
  "token":"abcdefg1234567"
};

mfs.upload(filepath, destination, fileParameterName, formData, headers, shared, function(result) {
  console.log(result);
}, function(error) {
  console.log(error);
});
```

## Installation

This example app contains 3 important objects:
1. app.properties
2. icon.png
3. mobile.zip

#### app.properties
This files defines the app, with the following properties:
+ __displayName__: The display name of the app
+ __description__: A description of the app
+ __version__: The version of the app, e.g. 0.0.1 or 3.4.5 etc
+ __type__: This can be either app or desktop, or both (app,desktop)
+ __awgPlatformVersion__: The target appworks platform, this should be 16
+ __isAvailableOffline__: Allow this app to be used offline, can be true or false

#### icon.png
An icon that represents the app. This will appear in the gateway and on the device. 48x48px is ideal.

#### mobile.zip

This is your web content, such as html, js, css, images and any other assets.
The only essential file in your mobile.zip is index.html, which will be loaded by the appworks webview. Any other files or structure is up to the developer.

##### index.html

When your app is downloaded and installed in an appworks client, the client will place appworks.js, cordova.js and the cordova plugins in the root of your app.

In your html file, please include the following tags before any other javascript tags:

```html
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="appworks.js"></script>
```

#### Zipping and Deploying
1. Zip up the web content into a file named mobile.zip
2. Zip up the following files:
  + app.properties
  + icon.png
  + mobile.zip
3. Name this file in the format:
  + AppName_Version.zip
  + e.g. MyGreatApp_0.0.1.zip
  + __The version number in the filename must match the version number in app.properties__
4. Install the app on the gateway
  + Go to your gateway in a browser
  + sign in
  + go to app installation tab
  + drag and drop MyGreatApp_0.0.1.zip into the box.
  + Once fully deployed, enable the app.
