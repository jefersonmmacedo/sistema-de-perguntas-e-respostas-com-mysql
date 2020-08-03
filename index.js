const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

const app = express()

//conexão com o banco de dados
connection
    .authenticate()
    .then(() =>{
        console.log('Sucesso ao conectar ao banco de dados!')
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//utilizando o ejs como View Engine
app.set("view engine", "ejs");
app.use(express.static('public'));

//Body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) =>{
    Pergunta.findAll({raw: true, order: [
        ['id','DESC'] 
        ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });
    
});

app.get("/perguntar", (req, res) =>{
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) =>{
    let titulo = req.body.titulo;
    let pergunta = req.body.pergunta;
    let autor = req.body.autor;
    Pergunta.create({
        titulo: titulo,
        pergunta:pergunta,
        autor: autor
    }).then(() => {
        res.redirect("/");
    });
});



app.get("/pergunta/:id", (req, res) =>{
    let id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            Resposta.findAll({
                where: {
                    PerguntaId: pergunta.id
                },order: [
                    ['id','DESC'] 
                    ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
            
        } else{
            res.redirect("/");
        }
    })
    
});

app.post("/salvarresposta", (req, res) =>{
    let resposta = req.body.resposta;
    let autorResposta = req.body.autorResposta;
    let perguntaId = req.body.idPergunta;
    Resposta.create({
        resposta: resposta,
        autorResposta:autorResposta,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("pergunta/" + perguntaId);
    });
});

//Servidor
app.listen(80, ()=>{
    console.log("Servidor iniciado");
});