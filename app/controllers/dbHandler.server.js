// 'use strict';
var Users = require('../models/users.js');
var pullList = require('../models/pull.js');
var path = process.cwd();
//var mongodb = require('mongodb');
//var MongoClient = mongodb.MongoClient;
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
function DbHandler () {
        
    // 	var clicks = db.collection('voting-app-database');
    //     //console.log("000");
    //     var sum = 0;
    //     clicks.count().then((count) => {
    //         sum = count;
    //     });
        //console.log("sum :" + totalIndexSize);
        this.getQuestion = function (req, res) {
            //console.log("111");
            pullList.find({}).sort({_id:-1}).limit(6).exec(function(err,data){
				if(err){
					res.redirect('/');
				} else {
					//console.log(data);
					res.json(data);
				// 	res.render('index.ejs',{
				// 		recent: data
				// 	});
				}
			});
        };
        
        this.getUserInfo = function(req, res){
            console.log(req.url);
            var userId = req.user.fb.id;
            pullList.find({createdBy: userId}).exec(function(err, result){
               if(err){
                   res.redirect('/');
               }else{
                //   console.log(result);
                //   console.log("send get pull");
                   res.render(path + '/public/profile.ejs', {
                    userName: req.user.fb.displayName,
                    pullList: result
                });
               } 
               
            });
            
        };
        this.getOptions = function(req, res){
             var id = req.url.split("/")[2];
             console.log("db url:" + req.url);
 			 console.log("id:"  + id);
 			 pullList.findOne({_id: id}, function(err, result){
 			     if(err){
 			         return err;
 			     }else{
 			         console.log(result);
 			         res.render(path + '/public/option.ejs', {
 			            optionsResult: result
 			         });
 			     }
 			 });
        };
        
        this.addNewPull = function(req, res){
          
        //   console.log(req.body.title);
        //   console.log(req.user.fb.displayName);
        //   console.log(req.body.options);
        
            var newPullList = new pullList();
            newPullList.name = req.body.title;
            newPullList.createdBy = req.user.fb.id;
            var newOptionList = [];
            var optionList = req.body.options.split('\r\n');
              optionList.forEach(function(option){
                  if(option != ''){
                      var optDic = {
                          opt : option,
                          count: 0
                      };
                      newOptionList.push(optDic);
                  }
              });
            newPullList.optionListAndResult = newOptionList;
             newPullList.save(function(err){
              if(err){
                  return err;
              }else{
                  console.log("pull save succeed");
                  res.redirect('/profile');
              }
          });

         
        };
        
        this.addOptionCount = function(req, res){
    //         console.log("id" + req.body.id);
		  //  console.log("vote" + req.body.vote);
		    
		    
            pullList.findOne({_id:new ObjectID(req.body.id)}, function(err,data){
				if(err){
					res.redirect('/');
				} else {
					if (data) {
                    //res.send(result);
                    //console.log(data);
                    var result = data.optionListAndResult;
	                for(var i = 0; i < result.length; i++){
					    if(result[i].opt == req.body.vote){
					        result[i].count += 1;
					       // console.log(result[i].count);
					       // console.log(data.options[i].count);
					    }
					}
					data.optionListAndResult = result;
					//console.log("here");
					data.save(function(err){
                      if(err){
                          return err;
                      }else{
                          console.log("pull update succeed");
                          res.redirect('/pull/'+req.body.id);
                      }
                  });
					
                }
				
				}
				
			});
			
        };
}

module.exports = DbHandler;