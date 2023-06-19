/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Nikhil Kumar Student ID: 124632225 Date: 18th June 2023
*
********************************************************************************/ 
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var collegeData = require("./modules/collegeData");


var app = express();

// Serve static files from the "views" directory
app.use(express.static(path.join(__dirname, "views")));

// GET /students route
app.get("/students", (req, res) => {
  const course = req.query.course;
  if (course) {
    collegeData
      .getStudentsByCourse(course)
      .then((students) => {
        if (students.length > 0) {
          res.json(students);
        } else {
          res.json({ message: "no results" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    collegeData
      .getAllStudents()
      .then((students) => {
        res.json(students);
      })
      .catch((err) => {
        res.json({ message: "no results" });
      });
  }
});

// GET /tas route
app.get("/tas", (req, res) => {
  collegeData
    .getTAs()
    .then((tas) => {
      if (tas.length > 0) {
        res.json(tas);
      } else {
        res.json({ message: "no results" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// GET /courses route
app.get("/courses", (req, res) => {
  collegeData
    .getCourses()
    .then((courses) => {
      if (courses.length > 0) {
        res.json(courses);
      } else {
        res.json({ message: "no results" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// GET /student/:num route
app.get("/student/:num", (req, res) => {
  const num = req.params.num;
  collegeData
    .getStudentByNum(num)
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      res.status(404).json({ message: "no results" });
    });
});

// GET / route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// GET /about route
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// GET /htmlDemo route
app.get("/htmlDemo", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
});

// 404 route
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Initialize collegeData before starting the server
collegeData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("Server listening on port: " + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log("Error initializing collegeData:", err);
  });

