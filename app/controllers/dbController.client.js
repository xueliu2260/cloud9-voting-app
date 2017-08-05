'use strict';

(function () {
//   var addButton = document.querySelector('.btn-add');
//   var deleteButton = document.querySelector('.btn-delete');
   var openOnePoll = document.querySelector('.openPoll');
   var display = document.querySelector('#vertical-list');
   var apiUrl =  '/polls';

   function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   }

   function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
   
   function updatePoll (data) {
        var parseData = JSON.parse(data);
        console.log("in index");
        console.log(parseData.length);
        for(var i = 0; i < parseData.length; i++){
            console.log(parseData[i]);
            //console.log(parseData[i].id);
            //clickNbr.innerHTML = parseData[i];
            var a = document.createElement("a");
            a.id = parseData[i]._id;
            a.href = "/pull/" + a.id;
            a.className = "openPoll";
            a.innerHTML = parseData[i].name;
            display.appendChild(a);
        }
       
   }
   ready(ajaxRequest('GET', apiUrl, updatePoll));
})();