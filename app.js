var express 	= require("express")
	app			= express(),
	bodyParser 	= require("body-parser");	

var teacher =[
	{
		name : "Himanish",
		// subject : [
		// {
		// 	subject  : "Graph Theory",
		// 	subCode  : "GP101",
		// 	semester : 4
		// },
		// {
		// 	subject  : "DBMS",
		// 	subCode  : "DM101",
		// 	semester : 5 
		// }

		// ]
		// branch : "cse",
		image  : "/images/default.png"


	},
	{
	name : "Diganta",
	// subject : [
	// {
	// 	subject  : "DSA",
	// 	subCode  : "DB102",
	// 	semester : 4
	// },
	// {
	// 	subject  : "TOC",
	// 	subCode  : "TC101",
	// 	semester : 5 
	// }

	// ]
	// branch : "cse",
	image  : "/images/default.png"
	}
];




app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

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



//start server
app.listen("4000", ()=>{
	console.log("Server Started");
})