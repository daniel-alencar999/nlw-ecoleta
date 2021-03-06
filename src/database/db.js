const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database ("./src/database/database.db")

module.exports = db

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        "https://d33wubrfki0l68.cloudfront.net/9778402ffaec92e9b69db63836956401249742ad/c994b/imagens/tsr_eletronicos-03.jpg",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastro com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData) 
        
    db.all(`SELECT name FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
    }

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    }) 

    db.run(`DELETE FROM places WHEre id =?`, [1], function(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso!")
    })



})