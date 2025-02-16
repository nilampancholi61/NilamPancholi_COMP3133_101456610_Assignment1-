const Employee = require('../models/Employee');

const employeeResolvers = {
    Query: {
        async getAllEmployees() {
            return await Employee.find();
        },

        async getEmployeeById(_, { id }) {
            const employee = await Employee.findById(id);
            if (!employee) throw new Error('Employee not found');
            return employee;
        },

        async searchEmployees(_, { designation, department }) {
            let query = {};
            if (designation) query.designation = designation;
            if (department) query.department = department;
            return await Employee.find(query);
        }
    },

    Mutation: {
        async addEmployee(_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) {
            const existingEmployee = await Employee.findOne({ email });
            if (existingEmployee) throw new Error('Email already exists');

            const employee = new Employee({
                first_name,
                last_name,
                email,
                gender,
                designation,
                salary,
                date_of_joining,
                department,
                employee_photo
            });

            await employee.save();
            return employee;
        },

        async updateEmployee(_, { id, ...updateFields }) {
            const employee = await Employee.findByIdAndUpdate(id, updateFields, { new: true });
            if (!employee) throw new Error('Employee not found');
            return employee;
        },

        async deleteEmployee(_, { id }) {
            const employee = await Employee.findByIdAndDelete(id);
            if (!employee) throw new Error('Employee not found');
            return `Employee with ID ${id} deleted successfully`;
        }
    }
};

module.exports = employeeResolvers;
