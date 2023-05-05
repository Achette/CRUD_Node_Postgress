const express = require('express');
const { pool } = require("./data/data");
const app = express();
app.use(express.json());
app.listen(8080, () => {
    console.log("O servidor esta ativo na porta 8080!!!");
});

app.get("/getUsers", async (req, res) => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query("SELECT * FROM Users");
        console.table(rows);
        res.status(200).send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de conexão com o servidor");
    }
})

app.post("/getUsers", async (req, res) => {
    try {
        const { name, id } = req.body
        await pool.query(`INSERT INTO Users (id, nome) values (${id}, '${name}');`)
        res.status(200).send(`User ${name} cadastrado na posição ${id}`)

    } catch (error) {
        console.log(error)
        res.status(404).send("Erro de conexão. Não foi possivel salvar os dados")
    }
})

app.put("/getUsers/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        await pool.query(`UPDATE Users SET nome='${name}' WHERE id= ${id}`)
        const { rows } = await client.query("SELECT * FROM Users");
        console.table(rows)
        res.status(200).send('Usuário Atualizado!')

    } catch (error) {
        console.log(error)
        res.status(404).send("Erro de conexão. Não foi possivel salvar os dados")

    }
})

app.delete("/getUsers/:id", async (req, res) => {
    try {
        const { id } = req.params
        await pool.query(`DELETE FROM Users WHERE id=${id}`)
        const { rows } = await client.query("SELECT * FROM Users");
        console.table(rows)
        res.status(200).send(rows)
    } catch (error) {
        console.log(error)
        res.status(500).send('Usuário deletado')
    }
})


