var express 	= require("express")
	app			= express(),
	bodyParser 	= require("body-parser")
	mongoose 	= require("mongoose")
	seedDB		= require("./seed");






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
app.get("/admin", (req, res) =>{
	res.send("will be implemented later");
});

 
//index : show all teachers
app.get("/teacher", (req, res) => {
	res.render("teacher", {teacher : teacher});
});

//new : add new teacher
app.get("/teacher/new",(req, res)=> {
	res.render("new");
});

//show
app.post("/teacher",(req, res)=> {
	res.send("done");
});



//start server
app.listen("4000", ()=>{
	console.log("Server Started");
})