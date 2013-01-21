/*jshint node:true, indent:2, curly:false, eqeqeq:true, immed:true, latedef:true, newcap:true, noarg:true,
regexp:true, undef:true, strict:true, trailing:true, white:true */
/*global X:true */

(function () {
  "use strict";

  var _ = X._;

  // https://localtest.com/file?recordType=XM.File&id=40

  /**
    Used to serve up files to the client. Uses Content-Type to prompt browser to
    save the file
   */


  // XXX can express figure out the mime type automatically?
  var contentTypes = {
    csv: { contentType: "text/csv", encoding: "utf-8" },
    txt: { contentType: "text/plain", encoding: "utf-8" },
    png: { contentType: "image/png", encoding: "binary" },
    jpg: { contentType: "image/jpeg", encoding: "binary" },
    jpeg: { contentType: "image/jpeg", encoding: "binary" },
    gif: { contentType: "image/gif", encoding: "binary" }
  };

  var getContentType = function (extension) {
    if (contentTypes.hasOwnProperty(extension.toLowerCase())) {
      return contentTypes[extension];
    }
    return { contentType: "application/" + extension, encoding: "binary" };
  };

  var handle = function (req, res) {
    var args = req.query,
      recordType = args.recordType,
      recordId = args.id,
      organization,
      queryPayload,
      query;

    if ((recordType !== 'XM.File' && recordType !== 'XM.Image') || !recordId) {
      // XXX this still needs some work
      res.send(500, "Invalid request");
      return;
    }

    // TODO: authentication
    organization = "dev"; // TODO

    queryPayload = '{"requestType":"retrieveRecord","recordType":"%@","id":"%@"}'.f(recordType, recordId);
    query = "select xt.retrieve_record('%@')".f(queryPayload);

    X.database.query(organization, query, function (err, result) {
      var content, data, filename, extension, fileDesc, encoding, buffer;

      if (err) {
        res.send(500, "Error querying database");
      } else if (res.rowCount === 0) {
        res.send(500, "Record not found");
      } else {
        content = JSON.parse(result.rows[0].retrieve_record);

        if (!content || !content.data) {
          res.send(500, "Record content not found");
          return;
        }

        filename = content.description;
        extension = filename ? filename.substring(filename.lastIndexOf('.') + 1) : '';
        fileDesc = getContentType(extension);
        encoding = fileDesc.encoding;

        // pg represents bytea data as hex. For text data (like a csv file)
        // we need to read to a buffer and then convert to utf-8. For binary
        // data we can just send the buffer itself as data.
        //
        // The first two characters of the data from pg is \x and must be ignored
        buffer = new Buffer(content.data.substring(2), "hex");
        data = encoding === 'binary' ? buffer : buffer.toString(encoding);

        //res.writeHead(200, {"Content-Type": fileDesc.contentType, "Content-Disposition": "attachment; filename = %@".f(filename) });
        //res.setHeader('Content-Type', fileDesc.contentType);
        // XXX can express figure out the mime type automatically?
        res.attachment(filename);
        res.send(data);
      }
    });

  };

  exports.file = handle;
}());
