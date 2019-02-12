var express 		= require("express")
	app				= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	seedDB			= require("./seed"),
	Teacher  		= require("./models/teacher"),
	Subject 		= require("./models/subject"),
	async			= require("async")
	methodOverride  = require("method-override");

var Promise = require("mongoose").Promise;


mongoose.connect("mongodb://localhost/feedBack", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));




//seed database
seedDB();









//main route
app.get("/", (req, res) =>{
	res.render("main");
});	

//admin route
app.get("/admin", (req, res) =>{
	res.render("admin")
});

//user route
app.get("/user", (req, res) =>{
	res.send("will be implemented later");
});

 
//index : show all teachers
app.get("/teacher", (req, res) => {
	Teacher.find({}).populate("subjects").exec((err, allTeachers)=>{
	if(err){
		console.log(err);
	}else{
		res.render("teacher",{teacher : allTeachers});
	}		
	})
});

//new : add new teacher form
app.get("/teacher/new",(req, res)=> {
	res.render("new");
});

//add new teacher to database
app.post("/teacher",(req, res)=> {

	var teacher = req.body.teacher;
	var subject = req.body.subject;

	Teacher.create(teacher, function(err, teacher){
		if(err){
			
		}else{

			Object.entries(subject).forEach(([key, value]) =>{
				Subject.create(value, function(err, insertingSubject){
					if(err){
						Subject.findOne({subjectCode : value.subjectCode},function(err, sub){
							if(err){
								console.log(err);
							}else{
								teacher.subjects.push(sub);	
							}
						});
					}
					else{
						teacher.subjects.push(insertingSubject);
					}	
					
				});

			});
			//Solved Parallel document save of the same document
			setTimeout(()=>{
				 	teacher.save();
					res.redirect("/teacher");	
			},1000);
			
		}

	});
});

//delete all teacher
app.delete("/teacher/delete", function(req, res){
	
	Teacher.deleteMany({}, function(err){
		if(err)
			console.log(err);
		else{
			console.log("removed");
			res.redirect("back");
		}
		 
	});

});

//teacher edit route
app.get("/teacher/:teacherId/edit", (req, res)=>{
	Teacher.findOne({_id : req.params.teacherId}).populate("subjects").exec((err, foundTeacher)=>{
		if(err)
			console.log(err);
		else{
			res.render("edit",{teacher : foundTeacher});				
		}
	});
});

//edit teacher
app.put("/teacher/:teacherId/", (req, res)=>{
	var subject = req.body.subject;
	Teacher.findByIdAndUpdate(req.params.teacherId, req.body.teacher, function(err, teacher){
		if(err){
			res.redirect("back");
		}else{

			Object.entries(subject).forEach(([key, value]) =>{
				Subject.create(value, function(err, insertingSubject){
					if(err){
						Subject.findOne({subjectCode : value.subjectCode},function(err, sub){
							if(err){
								console.log(err);
							}else{
								teacher.subjects.push(sub);	
							}
						});
					}
					else{
						teacher.subjects.push(insertingSubject);
					}	
					
				});

			});
			//Solved Parallel document save of the same document
			setTimeout(()=>{
				 	teacher.save();
					res.redirect("/teacher/");	
			},1000);
		}
	});
});


//delete teacher
app.delete("/teacher/:teacherId/",function(req, res){
	Teacher.findByIdAndRemove(req.params.teacherId, function(err){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/teacher/");
		}
	});
});



//start server
app.listen("4000", ()=>{
	console.log("Server Started");
})