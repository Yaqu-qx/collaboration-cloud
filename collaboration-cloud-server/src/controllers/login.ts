import { Request, Response } from "express";
import connection from "../database";

export const login = async (req: Request, res: Response) => {
  console.log(req.query);
  const { account, password, identity } = req.query;
  // res.status(200).json({ code: 1, message: "Login successful", data: {
  //   id: "0000000001",
  //   name: "Yaqu",
  //   password: "123456",
  //   account: "2021212205257",
  //   telephone: "12345678901",
  //   sex: "male",
  //   age: 20,
  // } });
  try {
    console.log(account, password, identity);
    const [rows]: any = await connection.query(
      "SELECT * FROM user_students WHERE account = ? AND password = ?",
      [account, password]
    );
    if (rows.length > 0) {
      res.status(200).json({ code: 1, message: "Login successful", data: rows[0] });
      console.log("Login successful");
    } else {
      res.status(401).json({ code: 0, message: "Invalid account or password", data: {} });
      console.log("Login failed");
    }
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ code: -1, message: "Internal server error", data: {} });
    console.log("Internal server error");
  }
};
