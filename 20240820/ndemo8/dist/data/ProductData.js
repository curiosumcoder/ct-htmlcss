import sqlite3 from "sqlite3";
const dbFilePath = "./src/data/Northwind.db";
export default class ProductData {
    get(id) {
        return new Promise((resolve, reject) => {
            let result;
            //sqlite3.verbose();
            let db = new sqlite3.Database(dbFilePath);
            let sql = `SELECT ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, 
        UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued 
        FROM Products WHERE ProductID = ?`;
            console.log(`Querying with id: ${id} ... ${new Date().toLocaleTimeString()}`);
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                if (row) {
                    const { ProductID: id, ProductName: productName, UnitPrice: unitPrice, QuantityPerUnit: quantityPerUnit, } = row;
                    result = { id, productName, unitPrice, quantityPerUnit };
                }
                // close the database connection
                db.close();
                resolve(result);
            });
        });
    }
    search(filter) {
        return new Promise((resolve, reject) => {
            let result = Array();
            //sqlite3.verbose();
            let db = new sqlite3.Database(dbFilePath);
            let sql = `SELECT ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, 
      UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued 
      FROM Products WHERE ProductName LIKE ?`;
            filter = `%${filter}%`;
            console.log(`Querying with filter: ${filter} ... ${new Date().toLocaleTimeString()}`);
            db.all(sql, [filter], (err, rows) => {
                if (err) {
                    reject(err);
                }
                rows.forEach((row) => {
                    const { ProductID: id, ProductName: productName, UnitPrice: unitPrice, QuantityPerUnit: quantityPerUnit, } = row;
                    const p = {
                        id,
                        productName,
                        unitPrice,
                        quantityPerUnit
                    };
                    result = [p, ...result];
                });
                // close the database connection
                db.close();
                resolve(result);
            });
        });
    }
    create(p) {
        return new Promise((resolve, reject) => {
            let result;
            console.log(p);
            //sqlite3.verbose();
            let db = new sqlite3.Database(dbFilePath);
            const sql = `INSERT INTO Products (ProductName, SupplierID, CategoryID, 
        QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            db.run(sql, [p.productName, 1, 1, p.quantityPerUnit, p.unitPrice, 1, 1, 1, 1], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log("Last inserted ID: " + this.lastID);
                    console.log(p);
                    result = Object.assign(Object.assign({}, p), { id: this.lastID });
                    resolve(result);
                }
                // close the database connection
                db.close();
            });
        });
    }
    update(p) {
        return new Promise((resolve, reject) => {
            let result;
            console.log(p);
            //sqlite3.verbose();
            let db = new sqlite3.Database(dbFilePath);
            const sql = `UPDATE Products 
        SET ProductName = ?, QuantityPerUnit = ?, UnitPrice = ? 
        WHERE ProductID = ?`;
            db.run(sql, [p.productName, p.quantityPerUnit, p.unitPrice, p.id], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.changes);
                }
                // close the database connection
                db.close();
            });
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            //sqlite3.verbose();
            let db = new sqlite3.Database(dbFilePath);
            const sql = `DELETE FROM Products WHERE ProductID = ?`;
            db.run(sql, [id], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.changes);
                }
                // close the database connection
                db.close();
            });
        });
    }
}
