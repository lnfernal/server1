const axios = require('axios')
const Websocket = require('ws')
const colors = require('colors')
const chalk = require('chalk')
const rl = require('readline')
const { program } = require('commander')
program.version('1.0.0')
const port = process.env.PORT || 3001
const socket = new Websocket.Server({port: port})

const password = 'iminsaneinnit'
const adminmaxPop = 1
const clients = []
const admin = []
const maxPop = 1000
const int = setInterval
const granted = process.env['granted']

// if(msg != password){
// 	ws.send('Nice Try ;)')
// }

function kick(ws){
	ws.close()
}

socket.on('connection', (ws, client) => {

	if(clients.length >= maxPop){
		kick(ws)
		return
	}

	if(admin.length >= adminmaxPop){
		kick(ws)
		return
	}

	console.log('Client just connected')
	clients.push(client)

  ws.on('message', (msg) => {
	if(msg === password){
		ws.send(granted)
	}else{
  console.log(`Message from Client: ${msg}`);
	ws.send('Recieved data')}
  });

	ws.on('close', (ws) => {
		clients.splice(0, 1)
		console.log('A Client just left')
	})
})

socket.on('error', (ws, err) => {
	console.log(`Server encountered error: ${err}`)
	ws.send(`Server encountered error: ${err}`)
})

console.log('Server Socket Started')

int(() => {
	console.log(`Amount of clients: ${clients.length}`)
}, 10000)


