//Configs 
const express = require("express")
const server = express()

//config server p arqvs estaticos
server.use(express.static("public"))

//habilitar body do formulario
server.use(express.urlencoded({ extended: true }))

//config database connection
const Pool = require("pg").Pool
const db = new Pool({
   user: "postgres",
   password: "0000", //Colocar sua senha
   host: "localhost",
   port: 5432,
   database: "doe"
})

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
   express: server,
   noCache: true
})

//Apresentacao
server.get("/", function(req, res) {
   
   db.query("SELECT * FROM donors", function(err, result){
      if (err) return res.send("Erro de banco de dados!")

      const donors = result.rows
      return res.render("index.html", { donors })
   })

})

/* Recebe dados do formulario */
server.post("/", function(req, res) {
   //pegar dados do formulario html.
   const name = req.body.name
   const email = req.body.email
   const blood = req.body.sangue

   //Verificando os campos preenchidos
   if ( name == "" || email == "" || blood == "") {
      return res.send("Todos os campos são obrigatórios!")
   }


   //add valores dentro do banco de dados
   const query = `INSERT INTO donors ("name", "email", "blood") 
   VALUES ($1, $2, $3)`

   const values = [name, email, blood]

   db.query(query, values, function(err) {
      //fluxo de erro
      if (err) return res.send("erro no banco de dados.")
      
      //fluxo ideal
      return res.redirect("/") //voltando pra pagina inicial
   })
})

// Servidor escutando a porta 3000
server.listen(3000, function() {
   console.log("Listening port 3000...")
})

//Pause em 1he5min