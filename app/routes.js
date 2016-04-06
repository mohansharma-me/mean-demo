var valid=require("validator");
var User=require("./models/User");
module.exports=function(app) {

	app.all("/api/*", function(req,res,next) {
		setTimeout(function() {
			var validReq=false;
			if(req.headers["x-session-token"] && req.session.authtoken) {
				if(req.headers["x-session-token"]==req.session.authtoken) {
					validReq=true;
				}
			} else {
				if(req.path==="/api/auth") {
					if(req.body.logout) {
						console.log("Session cleared");
						delete req.session.authtoken;
					}
					validReq=true;
				}
			}

			if(validReq) {
				next();
			} else {
				res.setHeader("x-clear-token",true);
				res.json({success:false,message:"Unauthorized access"});
			}
		},500);
	});

	app.post("/api/auth", function(req,res) {
		var result={success:false, message:""};
		var disableSend=false;

		if(req.body.logout) {
			result.success=true;
			result.message="You're logged out successfully.";
			res.json(result).end();
			console.log("Logged out");
			return;
		}

		if(req.session.authtoken && req.body.profile_request) {
			User.findOne({_id:req.session.authtoken}, function(err,u) {
				if(err) {
					result.message=err;
				} else if(u) {
					u.password="";
					result.data=u;
					result.message="Profile fetched successfully";
					result.success=true;
				} else {
					result.message="Username and Password doesn't matched.";
				}
				res.json(result).end();
			});
			return;
		}

		if(!req.body.username) {
			result.message="Invalid username.";
		} else if(!req.body.password) {
			result.message="Invalid password.";
		} else {
			disableSend=true;
			User.findOne({username:req.body.username, password:req.body.password}, function(err,u) {
				if(err) {
					result.message=err;
				} else if(u) {
					u.password="";
					result.token=u._id;
					result.data=u;
					result.message="Authentication succeed.";
					result.success=true;
					req.session.authtoken=result.token;
				} else {
					result.message="Username and Password doesn't matched.";
				}
				res.json(result).end();
			});
		}

		if(!disableSend)
			res.json(result).end();
	});

	app.get("/api/users", function(req,res) {
		User.find(function(err,users) {
			if(err) {
				res.send(err);
			}
			res.json(users);
			//res.writeHead(200, {'Content-Type':'application/json'});
			//res.write(JSON.stringify(users));
			//res.end();
		});
	});

	app.post("/api/users/:_id", function(req,res) {
		var result={success:false, message:""};
		var user=req.params;
		var disableSend=false;

		if(user._id) {
			disableSend=true;
			User.remove({_id:user._id}, function(err, cc) {
				if(err) {
					result.message=err;
				} else {
					if(cc.result.n==1) {
						result.success=true;
						result.message="Deleted";
					} else {
						result.message="System error.";
					}
				}
				res.json(result).end();
			});
		} else {
			result.message="User isn't valid.";
		}

		if(!disableSend)
			res.json(result).end();
		
	});

	app.put("/api/users", function(req,res) {
		var result={success:false, message:""};

		if(!(req.body._id && req.body.username && req.body.password && req.body.email && req.body.name && req.body.mobile)) {
			result.message="Invalid Request, please try again.";
			res.json(result);
			return;
		}

		var user=req.body;
		
		var username=valid.trim(user.username);
		var password=user.password;
		var email=valid.trim(user.email);
		var name=valid.trim(user.name);
		var mobile=valid.trim(user.mobile.toString());

		var disableSend=false;

		if(!valid.isEmail(email)) {
			result.message="Invalid email address.";
		} else if(!valid.isNumeric(mobile)) {
			result.message="Invalid mobile number.";
		} else if(mobile.length!=10) {
			result.message="Mobile number must be of 10 digit.";
		} else if(password.length==0) {
			result.message="Invalid password.";
		} else if(name.length==0) {
			result.message="Invalid name.";
		} else if(!(username.length>=5)) {
			result.message="Invalid username, username must be of 5 charactors.";
		} else {
			disableSend=true;

			User.findOne({
				$and:[
					{
						$or:[
							{username:username},
							{mobile:mobile},
							{email:email}
						]
					},
					{
						_id:{$ne:user._id}
					}
				]
			}, function(err,u) {
				if(u) {
					if(u.username==username) {
						result.message="Username already exists.";
					} else if(u.email==email) {
						result.message="Email address already exists.";
					} else if(u.mobile==mobile) {
						result.message="Mobile number already exists.";
					}
					res.json(result).end();
				} else {
					User.update({
						_id:user._id
					}, {
						username:username,
						name:name,
						email:email,
						mobile:mobile,
						password:password
					},{multi:true}, function(err,cc) {
						if(err) {
							result.message=err;
						} else {
							if(cc.n==1) {
								result.success=true;
								result.message="User saved.";
							} else {
								result.message="System error.";
							}
						}
						res.json(result).end();
					});
				}
			});
		}

		if(!disableSend)
			res.json(result).end();
	});

	app.post("/api/users", function(req,res) {
		var result={success:false,message:""};

		if(!(req.body.username && req.body.password && req.body.email && req.body.name && req.body.mobile)) {
			result.message="Invalid Request, please try again.";
			res.json(result);
			return;
		}

		var user=req.body;
		
		var username=valid.trim(user.username);
		var password=user.password;
		var email=valid.trim(user.email);
		var name=valid.trim(user.name);
		var mobile=valid.trim(user.mobile.toString());

		var disableSend=false;

		if(!valid.isEmail(email)) {
			result.message="Invalid email address.";
		} else if(!valid.isNumeric(mobile)) {
			result.message="Invalid mobile number.";
		} else if(mobile.length!=10) {
			result.message="Mobile number must be of 10 digit.";
		} else if(password.length==0) {
			result.message="Invalid password.";
		} else if(name.length==0) {
			result.message="Invalid name.";
		} else if(!(username.length>=5)) {
			result.message="Invalid username, username must be of 5 charactors.";
		} else {
			disableSend=true;

			User.findOne({
				$or:[
					{username:username},
					{mobile:mobile},
					{email:email}
				]
			}, function(err, u) {
				if(u) {
					if(u.username==username) {
						result.message="Username already exists.";
					} else if(u.email==email) {
						result.message="Email address already exists.";
					} else if(u.mobile==mobile) {
						result.message="Mobile number already exists.";
					}
					res.json(result).end();
				} else {
					User.create({
						username:username,
						password:password,
						name:name,
						mobile:mobile,
						email:email
					}, function(err,newuser) {
						if(err) {
							result.message=err;
						} else {
							result.success=true;
							result.message="User added.";
						}
						res.json(result).end();
					});
				}
			});			
		}

		if(!disableSend)
			res.json(result).end();
	});

	app.get("*", function(req,res) {
		res.sendfile("./public/index.html");
	});
};
