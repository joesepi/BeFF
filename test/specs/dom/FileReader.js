define([
  'fixtures/dom/FileReader',
  'dom/FileReader'
], function(image, FileReader) {
  'use strict';

  describe('dom/FileReader', function() {
    // FileReader.readAsDataURL generates broken image data when testing.
    // FileReader.readAsText fixes the issue, but can't be used in production
    // since we also want to render the image in production.
    var FileReaderBlob = FileReader.extend({
          _read: function(file) {
            this.reader.readAsText(file);
          }
        });

    beforeEach(function() {
      this.blob = new Blob([image.result], {type: image.mime});
      // Blob constructor doesn't support a name field
      this.blob.name = image.name;
      this.fileReader = new FileReaderBlob();
    });

    describe('load', function() {
      it('resolves with an object describing the image properties of the given blob', function(done) {
        this.fileReader.load(this.blob)
        .then(function(imageData) {
          expect(imageData.name).toBe(image.name);
          expect(imageData.mode).toBe(image.mode);
          expect(imageData.source).toBe(image.source);
          expect(imageData.result).toBe(image.result);
          done();
        });
      });
    });

    describe('promise', function() {
      it('resolves with an object describing the image properties of the given blob', function(done) {
        FileReaderBlob.promise(this.blob)
        .then(function(imageData) {
          expect(imageData.name).toBe(image.name);
          expect(imageData.mode).toBe(image.mode);
          expect(imageData.source).toBe(image.source);
          expect(imageData.result).toBe(image.result);
          done();
        });
      });
    });
  });
});
