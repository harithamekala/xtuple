/*jshint trailing:true, white:true, indent:2, strict:true, curly:true,
  immed:true, eqeqeq:true, forin:true, latedef:true,
  newcap:true, noarg:true, undef:true */
/*global XT:true, XM:true, XV:true, exports:true, describe:true, it:true, require:true */

(function () {
  "use strict";

  var crud = require('../lib/crud'),
    data = {
      recordType: "XM.SalesRep",
      autoTestAttributes: true,
      createHash : {
        number: "TESTSALESREP" + Math.random(),
        name: "TestRep"
      },
      updateHash : {
        name: "Updated Test SalesRep"
      },
      beforeDeleteActions: crud.accountBeforeDeleteActions,
      afterDeleteActions: crud.accountAfterDeleteActions
    };

  describe('SalesRep CRUD Test', function () {
    crud.runAllCrud(data);
  });
}());
