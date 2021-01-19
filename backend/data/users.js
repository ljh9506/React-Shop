import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Joon Hee',
    email: 'joon@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Moon',
    email: 'moon@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
