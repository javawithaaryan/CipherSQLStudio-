require('dotenv').config();
const mongoose = require('mongoose');
const pool = require('./config/postgres');
const Assignment = require('./models/Assignment');
const UserProgress = require('./models/UserProgress');

const employeesTableColumns = [
  { columnName: 'id', dataType: 'SERIAL PRIMARY KEY' },
  { columnName: 'name', dataType: 'VARCHAR(100)' },
  { columnName: 'department', dataType: 'VARCHAR(50)' },
  { columnName: 'salary', dataType: 'NUMERIC' },
  { columnName: 'hire_date', dataType: 'DATE' }
];

const employeesTableRows = [
  { name: 'Alice Smith', department: 'Engineering', salary: 120000, hire_date: '2021-03-15' },
  { name: 'Bob Jones',   department: 'Engineering', salary: 85000,  hire_date: '2022-01-10' },
  { name: 'Charlie Davis', department: 'Sales',      salary: 75000,  hire_date: '2020-11-20' },
  { name: 'Diana Prince', department: 'Engineering', salary: 140000, hire_date: '2019-06-05' },
  { name: 'Evan Wright',  department: 'HR',          salary: 65000,  hire_date: '2023-02-01' }
];

const departmentsTableColumns = [
  { columnName: 'id', dataType: 'SERIAL PRIMARY KEY' },
  { columnName: 'name', dataType: 'VARCHAR(50)' },
  { columnName: 'location', dataType: 'VARCHAR(100)' },
  { columnName: 'budget', dataType: 'NUMERIC' }
];

const departmentsTableRows = [
  { name: 'Engineering', location: 'San Francisco', budget: 5000000 },
  { name: 'Sales',       location: 'New York',      budget: 2000000 },
  { name: 'HR',          location: 'Chicago',       budget: 500000 }
];

const assignmentsSeed = [
  {
    title: "Basic Employee Retrieval",
    description: "Learn how to select all data from a table.",
    difficulty: "Easy",
    question: "Write a query to retrieve all columns for all employees in the 'employees' table.",
    
    sampleTables: [
      {
        tableName: 'employees',
        columns: employeesTableColumns,
        rows: employeesTableRows
      }
    ],

    expectedOutput: {
      type: "table",
      value: employeesTableRows // conceptual mock
    }
  },
  {
    title: "High Earners in Engineering",
    description: "Filter data based on multiple conditions.",
    difficulty: "Medium",
    question: "Retrieve the names and salaries of employees in the 'Engineering' department who earn more than 80000.",
    
    sampleTables: [
      {
        tableName: 'employees',
        columns: employeesTableColumns,
        rows: employeesTableRows
      }
    ],

    expectedOutput: {
      type: "table",
      value: [] // generic placeholder
    }
  },
  {
    title: "Department Budgets per Location",
    description: "Join tables and aggregate data.",
    difficulty: "Hard",
    question: "Write a query across 'employees' and 'departments' to find the total salary being paid out by location.",
    
    sampleTables: [
      {
        tableName: 'employees',
        columns: employeesTableColumns,
        rows: employeesTableRows
      },
      {
        tableName: 'departments',
        columns: departmentsTableColumns,
        rows: departmentsTableRows
      }
    ],

    expectedOutput: {
      type: "table",
      value: []
    }
  }
];

const seedDBs = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ciphersqlstudio");
    
    console.log("Clearing old MongoDB assignments and user progress...");
    await Assignment.deleteMany({});
    await UserProgress.deleteMany({});
    
    console.log("Seeding MongoDB assignments...");
    await Assignment.insertMany(assignmentsSeed);
    console.log("MongoDB seeded successfully with embedded sampleTables!");

    // No need to seed PostgreSQL directly anymore!
    // PostgreSQL is now purely an isolated execution sandbox mapped per userId
    console.log("PostgreSQL setup is now handled dynamically per user via sandboxService during /start");

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDBs();
