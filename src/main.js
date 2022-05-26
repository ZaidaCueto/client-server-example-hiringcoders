//criando servidor 
import { createServer } from 'http'
import { readFile } from 'fs';
import { resolve } from 'path';
import {parse} from 'querystring';

const server = createServer((req, res) => {
    switch (req.url) {
        case '/status': {
            res.writeHead(200, {
                'content-Type': 'application/json',
            });
            res.write(
                JSON.stringify({
                    status: 'okey',
                })
            );
            res.end();
            break;
        }
        case '/sign-in': {
            const path = resolve(__dirname,'./pages/sign-in.html');
            readFile(path,(error, file) => {
                if (error) {
                    res.writeHead(500, "can't process HTML file: ");
                    res.end();
                    return;
                }
                res.writeHead(200);
                res.write(file);
                res.end();
            })
            break;
        }

        case '/home': {
            const path = resolve(__dirname,'./pages/home.html');
            readFile(path,(error, file) => {
                if (error) {
                    res.writeHead(500, "can't process HTML file: ");
                    res.end();
                    return;
                }
                res.writeHead(200);
                res.write(file);
                res.end();
            })
            break;
        }
        case '/authenticate': {
            let data = "";
            req.on('data',(chunk) => {
                data += chunk;
            });
            req.on('end',() => {
                const params = parse(data);
                res.writeHead(301,{
                    location:'./home',
                });
    
                res.end();
            })

            break;
        }

        default: {
            res.writeHead(404, 'sevidor não encontrado');

            res.end();

        }
    }
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}.`);

});
//CASO NÇAO ENCONTRE UMA executal no terminal-> PORTA = PORT=3000 run star
