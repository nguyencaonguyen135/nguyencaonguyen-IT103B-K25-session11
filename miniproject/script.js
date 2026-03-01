let students = [
  { id: 1, name: "Nguyen Van An", age: 20, gpa: 8.5, status: "active" },
  { id: 2, name: "Tran Thi Bich", age: 17, gpa: 7.2, status: "active" },
  { id: 3, name: "Le Hoang Cuong", age: 22, gpa: 9.1, status: "inactive" },
  { id: 4, name: "Pham Thi Dung", age: 19, gpa: 6.8, status: "active" }
];

let nextId = 5;

const showMenu = () => {
  return prompt(
    "===== STUDENT MANAGEMENT SYSTEM =====\n" +
      "1. Create Student\n" +
      "2. Read All Students\n" +
      "3. Filter Scholarship Candidates (GPA > 8.0)\n" +
      "4. Update Student Profile\n" +
      "5. Delete Record\n" +
      "6. Compliance Verification\n" +
      "7. Academic Statistics\n" +
      "8. Data Normalization\n" +
      "0. Exit\n" +
      "======================================\n" +
      "Enter your choice:"
  );
};

const formatStudent = (student) => {
  return "ID: " + student.id + " | Name: " + student.name + " | Age: " + student.age + " | GPA: " + student.gpa + " | Status: " + student.status;
};

const formatList = (list, title) => {
  let header = title;
  if (!header) {
    header = "Student List";
  }

  if (list.length === 0) {
    return header + "\n(No records found)";
  }

  let divider = "------------------------------------------------------------";
  let text = header + "\n" + divider;

  for (let i = 0; i < list.length; i++) {
    text += "\n" + formatStudent(list[i]);
  }

  text += "\n" + divider + "\nTotal: " + list.length + " student(s)";
  return text;
};

const createStudent = () => {
  let name = prompt("Enter student name:");
  if (!name || name.trim() === "") {
    alert("Name cannot be empty!");
    return;
  }

  let age = parseInt(prompt("Enter age:"));
  if (isNaN(age) || age <= 0) {
    alert("Invalid age!");
    return;
  }

  let gpa = parseFloat(prompt("Enter GPA (0.0 - 10.0):"));
  if (isNaN(gpa) || gpa < 0 || gpa > 10) {
    alert("Invalid GPA!");
    return;
  }

  let statusRaw = prompt("Enter status (active / inactive):");
  if (!statusRaw) {
    alert("Status cannot be empty!");
    return;
  }

  let statusInput = statusRaw.trim().toLowerCase();
  if (statusInput !== "active" && statusInput !== "inactive") {
    alert('Status must be "active" or "inactive"!');
    return;
  }

  let newStudent = {
    id: nextId,
    name: name.trim(),
    age: age,
    gpa: gpa,
    status: statusInput
  };

  nextId = nextId + 1;
  students.push(newStudent);
  alert("Student created successfully!\n" + formatStudent(newStudent));
};

const readAllStudents = () => {
  alert(formatList(students, "===== ALL STUDENTS ====="));
};

const filterScholarship = () => {
  let candidates = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].gpa > 8.0) {
      candidates.push(students[i]);
    }
  }
  alert(formatList(candidates, "===== SCHOLARSHIP CANDIDATES (GPA > 8.0) ====="));
};

const updateStudent = () => {
  let id = parseInt(prompt("Enter student ID to update:"));
  let student = null;

  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      student = students[i];
      break;
    }
  }

  if (!student) {
    alert("No student found with ID: " + id);
    return;
  }

  alert("Found:\n" + formatStudent(student) + "\n\nLeave blank to keep current value.");

  let newName = prompt("New name (current: " + student.name + "):");
  let newGpa = prompt("New GPA (current: " + student.gpa + "):");

  if (newName && newName.trim() !== "") {
    student.name = newName.trim();
  }

  if (newGpa && newGpa.trim() !== "") {
    let parsedGpa = parseFloat(newGpa);
    if (!isNaN(parsedGpa) && parsedGpa >= 0 && parsedGpa <= 10) {
      student.gpa = parsedGpa;
    } else {
      alert("Invalid GPA value. GPA not updated.");
    }
  }

  alert("Student updated successfully!\n" + formatStudent(student));
};

const deleteStudent = () => {
  let id = parseInt(prompt("Enter student ID to delete:"));
  let index = -1;

  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    alert("No student found with ID: " + id);
    return;
  }

  let removed = students[index];
  let confirmDelete = prompt("Are you sure you want to delete?\n" + formatStudent(removed) + "\n\nType \"yes\" to confirm:");

  if (confirmDelete && confirmDelete.trim().toLowerCase() === "yes") {
    students.splice(index, 1);
    alert("Student \"" + removed.name + "\" has been deleted.");
  } else {
    alert("Deletion cancelled.");
  }
};

const complianceVerification = () => {
  let hasMinor = false;
  let allActive = true;
  let minors = [];
  let inactive = [];

  for (let i = 0; i < students.length; i++) {
    if (students[i].age < 18) {
      hasMinor = true;
      minors.push(students[i]);
    }
    if (students[i].status !== "active") {
      allActive = false;
      inactive.push(students[i]);
    }
  }

  let result = "===== COMPLIANCE VERIFICATION =====\n";
  result += "\nHas at least one student under 18: " + (hasMinor ? "YES" : "NO");

  if (hasMinor) {
    result += "\n   Minors found:";
    for (let i = 0; i < minors.length; i++) {
      result += "\n   → " + minors[i].name + " (Age: " + minors[i].age + ")";
    }
  }

  result += "\n\nAll students have \"active\" status: " + (allActive ? "YES" : "NO");

  if (!allActive) {
    result += "\n   Inactive students:";
    for (let i = 0; i < inactive.length; i++) {
      result += "\n   → " + inactive[i].name + " (Status: " + inactive[i].status + ")";
    }
  }

  alert(result);
};

const academicStatistics = () => {
  if (students.length === 0) {
    alert("No students in the list!");
    return;
  }

  let totalGpa = 0;
  let highest = students[0];
  let lowest = students[0];

  for (let i = 0; i < students.length; i++) {
    totalGpa += students[i].gpa;
    if (students[i].gpa > highest.gpa) {
      highest = students[i];
    }
    if (students[i].gpa < lowest.gpa) {
      lowest = students[i];
    }
  }

  let avgGpa = totalGpa / students.length;

  let result = "===== ACADEMIC STATISTICS =====\n";
  result += "\nTotal students   : " + students.length;
  result += "\nTotal GPA sum    : " + totalGpa.toFixed(2);
  result += "\nAverage GPA      : " + avgGpa.toFixed(2);
  result += "\n\nHighest GPA: " + highest.name + " (" + highest.gpa + ")";
  result += "\nLowest GPA : " + lowest.name + " (" + lowest.gpa + ")";

  alert(result);
};

const dataNormalization = () => {
  let normalized = [];

  for (let i = 0; i < students.length; i++) {
    let item = {
      id: students[i].id,
      name: students[i].name.toUpperCase(),
      age: students[i].age,
      gpa: students[i].gpa,
      status: students[i].status
    };
    normalized.push(item);
  }

  alert(formatList(normalized, "===== NORMALIZED DATA (UPPERCASE NAMES) ====="));
  console.log("Normalized student list:", normalized);
};

const main = () => {
  let running = true;

  while (running) {
    let choice = showMenu();

    switch (choice) {
      case "1":
        createStudent();
        break;
      case "2":
        readAllStudents();
        break;
      case "3":
        filterScholarship();
        break;
      case "4":
        updateStudent();
        break;
      case "5":
        deleteStudent();
        break;
      case "6":
        complianceVerification();
        break;
      case "7":
        academicStatistics();
        break;
      case "8":
        dataNormalization();
        break;
      case "0":
        alert("Goodbye! Thank you for using Student Management System.");
        running = false;
        break;
      case null:
        running = false;
        break;
      default:
        alert("Invalid choice! Please enter a number from 0 to 8.");
        break;
    }
  }
};

main();
    