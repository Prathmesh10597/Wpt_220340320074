let db = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "test",
  port: 3306,
};

const mysql = require("mysql2");
const con = mysql.createConnection(db);

const express = require("express");
const app = express();

app.use(express.static("sf"));

app.get("/getbookdetails", (req, resp) => {
  let input = req.query.x;

  let output = {
    status: false,
    bookdetails: { bookid: 0, bookname: "xyz", price: 0 },
  };

  con.query("select * from book where bookid=?", [input], (err, rows) => {
    if (rows.length > 0) {
      output.status = true;
      output.bookdetails = rows[0];
    }
    resp.send(output);
  });
});

app.get("/updatebookdetails", (req, resp) => {
  let bookid = req.query.x;
  let price = req.query.z;

  let output = { status: false, bookdetails: { bookid: 0, price: 0 } };
  con.query(
    "update book set price=? where bookid=?",
    [price, bookid],
    (err, rows) => {
      if (err) {
        console.log("error occure" + toString(err));
      } else if (rows.affectedRows > 0) {
        output.status = true;
      }
      resp.send(output);
    }
  );
});

app.listen(8081, () => {
  console.log("server listening at port 8081...");
});
