// 'use strict';
var Users = require('../models/users.js');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
function objectLength(obj) {
  var result = 0;
  for(var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
    // or Object.prototype.hasOwnProperty.call(obj, prop)
      result++;
    }
  }
  return result;
}
var ObjectID = require('mongodb').ObjectID;  
function DbHandler (db) {
        
    	var clicks = db.collection('voting-app-database');
        //console.log("000");
        var sum = 0;
        clicks.count().then((count) => {
            sum = count;
        });
        //console.log("sum :" + totalIndexSize);
        this.getQuestion = function (req, res) {
            //console.log("111");
    		var clickProjection = { '_id': false };
            var c = 0;
            //var sum = objectLength(clicks.find().length);
            
    		clicks.find(function(err, result){
    		    if (err) throw err;
                var jsonRes = [];
                
                if (result) {
                    //res.send(result);
                    
                    result.each(function(err, item) {
                        if (err) throw err;
                        if(item == null) {
                            //db.close();
                        }else{
                          //db.close();
                          //console.log(item.question);
                          c++;
                          console.log(c);
                          //console.log("item :" + item._id);
                                  
                          jsonRes.push(item);
                          if(c == sum) res.json(jsonRes);
    		
                        }
                    });
                }
    		});
        };
        var path = process.cwd();
        this.getId = function(req, res){
            // console.log("url:" + req.url);
            var id = req.url.split("/")[2];
//             console.log("db url:" + req.url);
// 			console.log("id:"  + id);
			
			var clicks = db.collection('voting-app-database');
    		clicks.findOne({_id:new ObjectID(id)}, function(err, result){
    		    if (err) throw err;
    		    
    		    
    		    if(result == null) {
                    //db.close();
                }else{
                  //console.log(result.options);
	              res.render(path + '/public/option.ejs', {result : result});
	              //res.json(result.options);
                }
    		    //res.sendFile(path + '/public/option.html');
    		});
        };
        
        this.addOptionCount = function(req, res){
    //         console.log("add a count");
    //         console.log(req.body.id);
		  //  console.log(req.body.vote);
		    
		    
            clicks.findOne({_id:new ObjectID(req.body.id)}, function(err,data){
				if(err){
					res.redirect('/');
				} else {
					if (data) {
                    //res.send(result);
                    //console.log(data);
                            var result = data.options;
    		                for(var i = 0; i < result.length; i++){
        					    if(result[i].opt == req.body.vote){
        					        result[i].count += 1;
        					       // console.log(result[i].count);
        					       // console.log(data.options[i].count);
        					    }
        					}
        					data.options = result;
        					//console.log("here");
        					clicks.save({_id:new ObjectID(req.body.id), question:data.question, options:data.options});
        					res.redirect('/options/'+req.body.id);
                    
                }
				
				}
				
			});
			
        };
}

module.exports = DbHandler;