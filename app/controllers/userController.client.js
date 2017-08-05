'use strict';

(function () {

   var pullList = document.querySelector('#displayPullList') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');
      } else {
         updateHtmlElement(userObject, displayName, 'username');
      }

      // if (pullList !== null) {
      //     pullList.href = '/getpull/' + data.id;
      // }


   }));
})();