var express 	= require("express")
	app			= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	seedDB		= require("./seed"),
	Teacher  	= require("./models/teacher"),
	Subject 	= require("./models/subject"),
	async		= require("async");






mongoose.connect("mongodb://localhost/feedBack", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));




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
	Teacher.find({}).exec((err, allTeachers)=>{
	if(err){
		console.log(err);
	}else{
		res.render("teacher",{teacher : allTeachers});
	}		
	})
});

//new : add new teacher
app.get("/teacher/new",(req, res)=> {
	res.render("new");
});


 // var cur = new Promise((resolve, reject)=>{

// })


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
				},1000);

		}

	});
	
	res.send("Working");
	// Teacher.create()
});



//start server
app.listen("4000", ()=>{
	console.log("Server Started");
})