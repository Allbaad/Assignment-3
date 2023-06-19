const fs = require('fs');

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

function initialize() {
  return new Promise(function(resolve, reject) {
    fs.readFile('./data/students.json', 'utf8', function(err, studentDataFromFile) {
      if (err) {
        reject('Unable to read students.json');
        return;
      }

      fs.readFile('./data/courses.json', 'utf8', function(err, courseDataFromFile) {
        if (err) {
          reject('Unable to read courses.json');
          return;
        }

        const studentData = JSON.parse(studentDataFromFile);
        const courseData = JSON.parse(courseDataFromFile);

        dataCollection = new Data(studentData, courseData);

        resolve();
      });
    });
  });
}

function getAllStudents() {
  return new Promise(function(resolve, reject) {
    if (dataCollection && Array.isArray(dataCollection.students) && dataCollection.students.length > 0) {
      resolve(dataCollection.students);
    } else {
      reject('No students found');
    }
  });
}

function getTAs() {
  return new Promise(function(resolve, reject) {
    if (dataCollection && Array.isArray(dataCollection.students)) {
      const tas = dataCollection.students.filter(function(student) {
        return student.TA === true;
      });
      resolve(tas);
    } else {
      reject('No students found');
    }
  });
}

function getCourses() {
  return new Promise(function(resolve, reject) {
    if (dataCollection && Array.isArray(dataCollection.courses) && dataCollection.courses.length > 0) {
      resolve(dataCollection.courses);
    } else {
      reject('No courses found');
    }
  });
}

function getStudentsByCourse(course) {
  return new Promise(function(resolve, reject) {
    if (dataCollection && Array.isArray(dataCollection.students)) {
      const students = dataCollection.students.filter(function(student) {
        return student.course === course;
      });
      if (students.length > 0) {
        resolve(students);
      } else {
        reject('No results returned');
      }
    } else {
      reject('No students found');
    }
  });
}

function getStudentByNum(num) {
  return new Promise(function(resolve, reject) {
    if (dataCollection && Array.isArray(dataCollection.students)) {
      const student = dataCollection.students.find(function(student) {
        return student.studentNum === num;
      });
      if (student) {
        resolve(student);
      } else {
        reject('No results returned');
      }
    } else {
      reject('No students found');
    }
  });
}

module.exports = {
  initialize,
  getAllStudents,
  getTAs,
  getCourses,
  getStudentsByCourse,
  getStudentByNum
};
