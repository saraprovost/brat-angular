'use strict';

// -*- Mode: JavaScript; tab-width: 2; indent-tabs-mode: nil; -*-
// vim:set ft=javascript ts=2 sw=2 sts=2 cindent:

var AnnotationLog = function (window, undefined) {
  var AnnotationLog = function AnnotationLog(dispatcher) {
    var annotationLoggingOn = false;
    var currentCollection = null;
    var currentDocument = null;
    var currentArguments = null;

    var rememberLoggingState = function rememberLoggingState(response) {
      annotationLoggingOn = response.annotation_logging;
    };

    var rememberCurrent = function rememberCurrent(_collection, _document, _arguments) {
      currentCollection = _collection;
      currentDocument = _document;
      currentArguments = _arguments;
    };

    var logAction = function logAction(_action) {
      if (!annotationLoggingOn) {
        // logging not requested for current collection
        return false;
      } else {
        dispatcher.post('ajax', [{
          action: 'logAnnotatorAction',
          collection: currentCollection,
          'document': currentDocument,
          log: _action
        }, null]);
      }
    };

    dispatcher.on('collectionLoaded', rememberLoggingState).on('current', rememberCurrent).on('logAction', logAction);
  };

  return AnnotationLog;
}(window);