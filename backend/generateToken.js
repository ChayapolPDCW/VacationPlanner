import jwt from "jsonwebtoken";

const token = jwt.sign({ id: 1 }, "ce3b00d9e72456a6ef9e05b62e4e8e06ef75d9fc37b8c5ab9a7d79017add836d", { expiresIn: "1h" });
console.log(token);