import { createPool } from "mysql2/promise";


export const pool = createPool({
     host: "localhost",
     port: 3306,
     database: "niceTrip2",
     user: "root",
     password: ""

});