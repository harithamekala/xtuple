/*jshint indent:2, curly:true eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true
white:true*/
/*global XT:true, XM:true, Backbone:true, _:true, console:true */

(function () {
  "use strict";

  /**
    @class

    @extends XM.Model
  */
  XM.CommentType = XM.Model.extend({
    /** @scope XM.Comment.prototype */

    recordType: 'XM.CommentType',

    defaults: {
      commentsEditable: false,
      order: 0
    },

    requiredAttributes: [
      "name",
      "commentType",
      "commentsEditable",
      "order"
    ]

  });

  /**
    @class

    Base class for use on comment sub classes.

    @extends XM.Model
  */
  XM.Comment = XM.Model.extend({
    /** @scope XM.Comment.prototype */

    // ..........................................................
    // METHODS
    //

    defaults: function () {
      var result = {},
        publicDefault = XT.session.getSettings().get('CommentPublicDefault');
      result.created = new Date();
      result.createdBy = XM.currentUser.get('username');
      result.isPublic = publicDefault || false;
      return result;
    },

    isReadOnly: function () {
      var commentType = this.get('commentType'),
        isNew = this.getStatus() === XM.Model.READY_NEW,
        editable = isNew || (commentType &&
          commentType.get('commentsEditable'));

      return !editable || XM.Model.prototype.isReadOnly.apply(this, arguments);
    }

  });

  // ..........................................................
  // COLLECTIONS
  //

  /**
    @class

    @extends XM.Collection
  */
  XM.CommentTypeCollection = XM.Collection.extend({
    /** @scope XM.CommentTypeCollection.prototype */

    model: XM.CommentType

  });

}());
