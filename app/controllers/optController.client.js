'use strict';

(function () {
    var result = document.querySelector('#result');
   var submitBtn = document.querySelector('#submit');
   var display = document.querySelector('#display');
   var apiUrlOption = '/options/:id';

    
    
    
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
  
  submitBtn.addEventListener('click', function () {
      ajaxRequest('POST', apiUrlOption, function () {
         ajaxRequest('POST', apiUrlOption, updateOptionCount);
      });

  }, false);
  function updateOptionCount (data) {
        var parseData = JSON.parse(data);

        //display.innerHTML = parseData;
        console.log("in optController");
        console.log(parseData);
        //res.render(path + '/public/option.ejs', {result : result.options});
  }
   ready(ajaxRequest('POST', apiUrlOption, updateOptionCount));
   
})();