require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors:{origin:"*"}
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const users = [];
const projects = [];
const tasks = [];
const comments = [];

app.post("/register",(req,res)=>{
users.push(req.body);
res.json({message:"Registered"});
});

app.post("/login",(req,res)=>{
res.json({token:"demo-token"});
});

app.get("/projects",(req,res)=>{
res.json(projects);
});

app.post("/projects",(req,res)=>{
projects.push(req.body);
io.emit("update");
res.json({message:"Project Added"});
});

app.get("/tasks",(req,res)=>{
res.json(tasks);
});

app.post("/tasks",(req,res)=>{
tasks.push(req.body);
io.emit("update");
res.json({message:"Task Added"});
});

app.get("/comments",(req,res)=>{
res.json(comments);
});

app.post("/comments",(req,res)=>{
comments.push(req.body);
io.emit("update");
res.json({message:"Comment Added"});
});

io.on("connection",(socket)=>{
console.log("User Connected");
});

server.listen(process.env.PORT,()=>{
console.log("Server running on port 5000");
});