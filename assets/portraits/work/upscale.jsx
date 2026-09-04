#target photoshop
app.bringToFront();
app.displayDialogs = DialogModes.NO;

var root = File($.fileName).parent.parent;
var work = File($.fileName).parent;
var whiteIn = new File(root.fsName + "/mcf-046-white.jpg");
var greyIn = new File(root.fsName + "/mcf-046-source.jpg");

function openJpeg(file) {
  if (!file.exists) {
    throw new Error("Missing " + file.fsName);
  }
  return app.open(file);
}

function upscalePreserveDetails(doc, scale) {
  app.activeDocument = doc;
  var w = UnitValue(doc.width.as("px") * scale, "px");
  var h = UnitValue(doc.height.as("px") * scale, "px");
  doc.resizeImage(w, h, 72, ResampleMethod.PRESERVEDETAILS);
}

function exportWebP(doc, dest) {
  app.activeDocument = doc;
  var opts = new ExportOptionsSaveForWeb();
  opts.format = SaveDocumentType.JPEG;
  opts.quality = 85;
  opts.includeProfile = false;
  doc.exportDocument(dest, ExportType.SAVEFORWEB, opts);
}

function savePsd(doc, dest) {
  app.activeDocument = doc;
  var psd = new PhotoshopSaveOptions();
  psd.embedColorProfile = true;
  psd.layers = true;
  doc.saveAs(dest, psd, true);
}

function trySelectSubject() {
  try {
    var idautoCutout = stringIDToTypeID("autoCutout");
    var desc = new ActionDescriptor();
    desc.putBoolean(stringIDToTypeID("sampleAllLayers"), false);
    executeAction(idautoCutout, desc, DialogModes.NO);
    return true;
  } catch (e1) {
    try {
      var idcannedFunction = stringIDToTypeID("selectSubject");
      executeAction(idcannedFunction, undefined, DialogModes.NO);
      return true;
    } catch (e2) {
      return false;
    }
  }
}

function exportCutoutPng(doc, dest) {
  app.activeDocument = doc;
  if (trySelectSubject()) {
    try {
      doc.selection.invert();
      doc.selection.clear();
      doc.selection.deselect();
    } catch (e) {}
  }
  var png = new PNGSaveOptions();
  png.compression = 6;
  png.interlaced = false;
  doc.saveAs(dest, png, true);
}

var grey = openJpeg(greyIn);
upscalePreserveDetails(grey, 2);
savePsd(grey, new File(work.fsName + "/mcf-046-source.psd"));
exportWebP(grey, new File(root.fsName + "/mcf-046-hero.jpg"));
grey.close(SaveOptions.DONOTSAVECHANGES);

var white = openJpeg(whiteIn);
upscalePreserveDetails(white, 2);
savePsd(white, new File(work.fsName + "/mcf-046-white.psd"));
exportCutoutPng(white, new File(root.fsName + "/mcf-046-cutout.png"));
exportWebP(white, new File(root.fsName + "/mcf-046-white-2x.jpg"));
white.close(SaveOptions.DONOTSAVECHANGES);
