var express = require("express")
	app		= express();	



app.use("view engone", ejs);


//main route
app.get("/", (req, res) =>{
	res.render("main");
});	

//





//start server
app.listen("4000", ()=>{
	console.log("Server Started");
})