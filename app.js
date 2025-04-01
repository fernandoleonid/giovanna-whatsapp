//Importando Bibliotecas Instaladas
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// const {request} = require ('http')

//Inicia a utilização do express
const app = express ()
app.use(cors()); 

//configuração do header -> quem poderá requisitar a API
app.use((request, response, next) =>{
    //Permissão de onde virão as requisições na API
    /*Acces... -> Origem da API*/  
    /* ,'' -> Quem pode acessar (IP, ou * -> todos)*/
    response.header('Access-Control-Allow-Origin', '*')
    
    //Permissão de quais metodos a API irá responder
    /* METODOS -> GET - Pegar dados da API || POST - Salvar dados na API || PUT - Alterar um dado API || DELETE = Deletar um dado na API */
    response.header('Access-Control-Allow-Methods', 'GET') 

    //Aplica as restrições no CORS da requisição
    app.use(cors())

    next()
})

const whatsUsers = require("./module/funcoes")

app.get ('/', cors(), async (req, res) => {
    res.send (
        `
        <style>
        *{
            margin: 0;
            padding:0;
            box-sizing: border-box;
            font-family: 'Courier New', Courier, monospace;
            }
            body{
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            main{
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            h1{
                background-color: #59BFA1;
                padding: 16px 32px;
            }
            h3{
                display: flex;
                gap: 5px;
            }
            h3 div{
                padding: 8px 32px;
                flex-grow: 1;
                background-color:  #C0E6DB;
            }
            table th{
                background-color: #EBF7F3;
                padding: 8px 16px;
                box-shadow: 00px 0px 1px black;
            }
            table td{
                padding: 8px 16px;
                box-shadow: 00px 0px 1px black;
            }

            footer{
                text-align: center;
                padding: 32px;
            }
        </style>
        <main>
        <h1>
            Servidor API para teste
        </h1>
        <h3>
            <div>Contatos</div>
            <div>whatsapp</div>
        </h3>
        <table>
            <tr>
                <th>
                    Verbo
                </th>
                <th>
                    EndPoint
                </th>
            </tr>
            <tr>
                <td>
                    GET
                </td>
                <td>
                    /v1/whatsapp/contatos/11987876567
                </td>
            </tr>
            <tr>
                <td>
                    GET
                </td>
                <td>
                    /v1/whatsapp/conversas?numero=11987876567&contato=Jane Smith
                </td>
            </tr>
        </table>
        </main>
        `
    )
})

//1
app.get('/v1/whatsapp/conversas/:numero', cors(), async function(request, response){

    let receberDados = request.params.numero
    let dadosPessoais = whatsUsers.getDadosPessoais(receberDados)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um perfil'})
    }
})

//2
app.get('/v1/whatsapp/perfil/:numero', cors(), async function(request, response) {

    let receberDados = request.params.numero
    let dadosPessoais = whatsUsers.getDadosPerfil(receberDados)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um perfil'})
    }
})

//3
app.get('/v1/whatsapp/contatos/:numero', cors(), async function(request, response) {

    let receberDados = request.params.numero
    let dadosPessoais = whatsUsers.getDadosContatos(receberDados)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um contato'})
    }
})

//4
app.get('/v1/whatsapp/conversas/:numero', cors(), async function(request, response) {

    let receberDados = request.params.numero
    let dadosPessoais = whatsUsers.getConversasContatos(receberDados)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um contato'})
    }
})

//5
app.get('/v1/whatsapp/conversas/', cors(), async function(request, response) {

    let numero = request.query.numero
    let contato = request.query.contato
    console.log (numero, contato)
    let dadosPessoais = whatsUsers.getListarConversas(numero, contato)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um contato'})
    }
})

//6
app.get('/v1/whatsapp/conversas/palavra-chave/?', cors(), async function(request, response) {

    let numero = request.query.numero
    let palavra = request.query.palavra
    let contato = request.query.contato
    let dadosPessoais = whatsUsers.getFiltrarPalavra(numero, palavra, contato)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado uma conversa'})
    }
})

app.listen('8080', function(){
    console.log('API funcionando...')
})

