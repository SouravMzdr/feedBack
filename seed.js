var	mongoose	= require("mongoose"),	
	Teacher 	= require("./models/teacher")
	Subject 	= require("./models/subject")


 
// var subjects = [
// 	{
//  	 subject : [
// 		{
// 			subjectName  : "Graph Theory",
// 			subjectCode  : "GP101",
// 			semester : 4
// 		},
// 		{
// 			subjectName  : "DBMS",
// 			subjectCode  : "DM101",
// 			semester : 5 
// 		}

// 	 ]
// 	},
// 	{
// 	 subject : [
// 		{
// 			subjectName  : "DSA",
// 			subjectCode  : "DB102",
// 			semester : 4
// 		},
// 		{
// 			subjectName  : "TOC",
// 			subjectCode  : "TC101",
// 			semester : 5 
// 		}

// 	 ]
// 	}
// ]

var teacher =[
	{
		name : "Himanish",
		branch : "cse",
		image  : "/images/default.png"


	},
	{
	name : "Diganta",
	
	branch : "cse",
	image  : "/images/default.png"
	}
]

var subject = {
	
	subjectName  : "Graph Theory",
	subjectCode  : "GP101",
	semester : 4
}


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}




var i = 0;

function seedDB(){

	Teacher.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}else{
			console.log("removed Teachers");
			
			Subject.deleteMany({}, function(err){
				if(err)
					console.log(err);
				else
				 	console.log("removed Subjects")
			});

			teacher.forEach(function(seed){
			
			Teacher.create(seed, function(err, data){
				if(err){
					console.log(err);
				}else{
					console.log("added a Teacher");

					Subject.create(subject, function(err, insertingSubject){
						if(err){
							Subject.findOne({subjectCode : subject.subjectCode}, function(err, sub){
								if(err){
									console.log(err);
								}else{
									// console.log(sub);
									data.subjects.push(sub);
									data.save();
								}
							});
						}else{
							// console.log(insertingSubject);
							data.subjects.push(insertingSubject);
							data.save();
						}
					});
				}
				});
			});
		}
	});
}



module.exports = seedDB;