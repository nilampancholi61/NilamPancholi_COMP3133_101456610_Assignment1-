const { gql } = require('apollo-server-express');

const employeeTypeDefs = gql`
    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
        created_at: String
        updated_at: String
    }

    type Query {
        getAllEmployees: [Employee]
        getEmployeeById(id: ID!): Employee
        searchEmployees(designation: String, department: String): [Employee]
    }

    type Mutation {
        addEmployee(
            first_name: String!,
            last_name: String!,
            email: String!,
            gender: String!,
            designation: String!,
            salary: Float!,
            date_of_joining: String!,
            department: String!,
            employee_photo: String
        ): Employee

        updateEmployee(
            id: ID!,
            first_name: String,
            last_name: String,
            email: String,
            gender: String,
            designation: String,
            salary: Float,
            date_of_joining: String,
            department: String,
            employee_photo: String
        ): Employee

        deleteEmployee(id: ID!): String
    }
`;

module.exports = employeeTypeDefs;
