require('dotenv').config();
const mongoose = require('mongoose');
const pool = require('./config/postgres');
const Assignment = require('./models/Assignment');

const assignmentsSeed = [
  {
    title: "Basic Employee Retrieval",
    description: "Learn how to select all data from a table.",
    difficulty: "Easy",
    question: "Write a query to retrieve all columns for all employees in the 'employees' table.",
    expectedOutput: "A complete list of all employees with their id, name, department, salary, and hire_date.",
    tables: ["employees"]
  },
  {
    title: "High Earners in Engineering",
    description: "Filter data based on multiple conditions.",
    difficulty: "Medium",
    question: "Retrieve the names and salaries of employees in the 'Engineering' department who earn more than 80000.",
    expectedOutput: "A list of employee names and their salaries, strictly for those in Engineering earning > 80k.",
    tables: ["employees"]
  },
  {
    title: "Department Budgets per Location",
    description: "Join tables and aggregate data.",
    difficulty: "Hard",
    question: "Write a query across 'employees' and 'departments' to find the total salary being paid out by location.",
    expectedOutput: "A list showing location and the SUM of salaries for employees located there.",
    tables: ["employees", "departments"]
  }
];

const seedDBs = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ciphersqlstudio");
    
    console.log("Clearing old MongoDB assignments...");
    await Assignment.deleteMany({});
    
    console.log("Seeding MongoDB assignments...");
    await Assignment.insertMany(assignmentsSeed);
    console.log("MongoDB seeded successfully!");

    console.log("Connecting to PostgreSQL...");
    // Create tables
    await pool.query(`
      DROP TABLE IF EXISTS employees CASCADE;
      DROP TABLE IF EXISTS departments CASCADE;

      CREATE TABLE departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        location VARCHAR(100),
        budget NUMERIC
      );

      CREATE TABLE employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        department VARCHAR(50),
        salary NUMERIC,
        hire_date DATE
      );
    `);

    console.log("PostgreSQL tables created. Seeding data...");
    
    // Seed Departments
    await pool.query(`
      INSERT INTO departments (name, location, budget) VALUES
      ('Engineering', 'San Francisco', 5000000),
      ('Sales', 'New York', 2000000),
      ('HR', 'Chicago', 500000);
    `);

    // Seed Employees
    await pool.query(`
      INSERT INTO employees (name, department, salary, hire_date) VALUES
      ('Alice Smith', 'Engineering', 120000, '2021-03-15'),
      ('Bob Jones', 'Engineering', 85000, '2022-01-10'),
      ('Charlie Davis', 'Sales', 75000, '2020-11-20'),
      ('Diana Prince', 'Engineering', 140000, '2019-06-05'),
      ('Evan Wright', 'HR', 65000, '2023-02-01');
    `);

    console.log("PostgreSQL seeded successfully!");
    
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDBs();
