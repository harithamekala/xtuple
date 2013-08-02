/*jshint trailing:true, white:true, indent:2, strict:true, curly:true,
  immed:true, eqeqeq:true, forin:true, latedef:true,
  newcap:true, noarg:true, undef:true */
/*global XT:true, XM:true, XV:true, exports:true, describe:true, it:true, require:true */

(function () {
  "use strict";

  var crud = require("../lib/crud"),
    assert = require("chai").assert;

  var data = exports.data = {
    recordType: "XM.Honorific",
    autoTestAttributes: true,
    createHash: {
      code: "Herr" + Math.random()
    },
    updateHash: {
      code: "Dame" + Math.random()
    }
  };

  describe('Honorific crud test', function () {
    crud.runAllCrud(data);
  });
}());
