'use strict';

// -*- Mode: JavaScript; tab-width: 2; indent-tabs-mode: nil; -*-
// vim:set ft=javascript ts=2 sw=2 sts=2 cindent:
var Ajax = function ($, window, undefined) {
  var Ajax = function Ajax(dispatcher) {
    var that = this;
    var pending = 0;
    var count = 0;
    var pendingList = {};

    // merge data will get merged into the response data
    // before calling the callback
    var ajaxCall = function ajaxCall(data, callback, merge) {
      merge = merge || {};
      dispatcher.post('spin');
      pending++;
      var id = count++;

      // special value: `merge.keep = true` prevents obsolescence
      pendingList[id] = merge.keep || false;
      delete merge.keep;

      // If no protocol version is explicitly set, set it to current
      if (data['protocol'] === undefined) {
        // TODO: Extract the protocol version somewhere global
        data['protocol'] = 1;
      }

      //var url = "test-json/";
      var url = "test-json-simple/";
      var method = "GET";
      switch (data.action) {
        case "whoami":
          url += "user.json";
          break;
        case "getDocument":
          url += "document.json";
          break;
        case "loadConf":
          url += "config.json";
          break;
        case "getCollectionInformation":
          url += "collection.json";
          break;
        case "login":
          url += "login.json";
          break;
        case "createArc":
          url += "addRelation.json";
          //TODO method = "POST";
          break;
        case "arcOpenDialog":
          url += "addRelation2.json";
          break;
        case "createSpan":
          url += "createToken.json";
          //TODO method = "POST";
          break;
        default:
          url += "empty.json";
      }
      $.ajax({
        //Removed by Renaud on 2016-03-10
        /*url: 'ajax.cgi',
         data: data,
         type: 'POST',*/
        //
        data: data,
        url: url,
        type: method,
        success: function success(response) {
          pending--;
          // If no exception is set, verify the server results
          if (response.exception == undefined && response.action !== data.action) {
            console.error('Action ' + data.action + ' returned the results of action ' + response.action);
            response.exception = true;
            dispatcher.post('messages', [[['Protocol error: Action' + data.action + ' returned the results of action ' + response.action + ' maybe the server is unable to run, please run tools/troubleshooting.sh from your installation to diagnose it', 'error', -1]]]);
          }

          // If the request is obsolete, do nothing; if not...
          if (pendingList.hasOwnProperty(id)) {
            dispatcher.post('messages', [response.messages]);
            if (response.exception == 'configurationError' || response.exception == 'protocolVersionMismatch') {
              // this is a no-rescue critical failure.
              // Stop *everything*.
              pendingList = {};
              dispatcher.post('screamingHalt');
              // If we had a protocol mismatch, prompt the user for a reload
              if (response.exception == 'protocolVersionMismatch') {
                if (confirm('The server is running a different version ' + 'from brat than your client, possibly due to a ' + 'server upgrade. Would you like to reload the ' + 'current page to update your client to the latest ' + 'version?')) {
                  window.location.reload(true);
                } else {
                  dispatcher.post('messages', [[['Fatal Error: Protocol ' + 'version mismatch, please contact the administrator', 'error', -1]]]);
                }
              }
              return;
            }

            delete pendingList[id];

            // if .exception is just Boolean true, do not process
            // the callback; if it is anything else, the
            // callback is responsible for handling it
            if (response.exception == true) {
              $('#waiter').dialog('close');
            } else if (callback) {
              $.extend(response, merge);
              dispatcher.post(0, callback, [response]);
            }
          }
          dispatcher.post('unspin');
        },
        error: function error(response, textStatus, errorThrown) {
          pending--;
          dispatcher.post('unspin');
          $('#waiter').dialog('close');
          dispatcher.post('messages', [[['Error: Action' + data.action + ' failed on error ' + response.statusText, 'error']]]);
          console.error(textStatus + ':', errorThrown, response);
        }
      });
      return id;
    };

    var isReloadOkay = function isReloadOkay() {
      // do not reload while data is pending
      return pending == 0;
    };

    var makeObsolete = function makeObsolete(all) {
      if (all) {
        pendingList = {};
      } else {
        $.each(pendingList, function (id, keep) {
          if (!keep) delete pendingList[id];
        });
      }
    };

    dispatcher.on('isReloadOkay', isReloadOkay).on('makeAjaxObsolete', makeObsolete).on('ajax', ajaxCall);
  };

  return Ajax;
}(jQuery, window);

module.exports = Ajax;