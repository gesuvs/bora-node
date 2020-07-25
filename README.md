# Bora

## Pre requisitos

- Node
- Docker
- Docker Compose
- Docker-Machine
- VirtualBox - (Para ambiente de desenvolvimento)
- Git
- VSCode

---

## Configurando Ambiente

```bash
git clone https://github.com/GBernardo10/bora-node
```

```bash
docker-machine create -driver virtualbox master
```

```bash
docker-machine env master
```

```bash
eval $(docker-machine env master)
```

```bash
docker swarm init --advertise-addr eth1
```

Vai retornar uma mesagem do tipo:

docker swarm join --token <TOKEM>

Anote comando que gerou, será necessario mais para a frente

Crie mais duas docker machine

```bash
docker-machine create -d virtualbox --swarm
--swarm-discovery
token://<TOKEN> node1
```

```bash
docker-machine create -d virtualbox --swarm
--swarm-discovery
token://<TOKEN> node2
```

Acesse elas com o comando:

- docker-machine env node1
  - eval \$(docker-machine env node1)
- docker-machine env node2
  - eval \$(docker-machine env node2)

Em cada uma delas cole o comando :

```bash
docker swarm join --token <TOKEM>

➜ docker swarm join --token
SWMTKN-1-6a489od49dvx8w0cgzlgxrtl4zuea9uo6uhzxnai4d58t97hsw-
0j87b3lsgbz07dmf2y2q47hsn 192.168.99.107:2377

This node joined a swarm as a worker.
```

Para verificar se esta tudo corretamente configurado, utilize o comando abaixo:

```bash
➜ docker-machine ls
NAME     ACTIVE   DRIVER       STATE     URL   SWARM   DOCKER    ERRORS
master   -        virtualbox   Running                 Unknown
node1    -        virtualbox   Running                 Unknown
node2    -        virtualbox   Running                 Unknown
```

e...

```bash
➜ docker node ls
ID                            HOSTNAME            STATUS        AVAILABILITY
g02px1jo6ccf320wxmltkzt0q *   master              Ready         Active
k3rjj7i6kkejnvrfvnte2xos5     node1               Ready         Active
zitxgjrst9si19syvrhmjvnx7     node2               Ready           Active
```

Pronto, se teve esse resultado seu ambiente de desenvolvimento esta concluido.

---

## Rodando a aplicação

```bash
├── api-gateway
├── config
├── docker-compose.services.yml
├── docker-compose.traefik.yml
├── eventos-service
├── README.md
├── script.sh
├── services.sh
├── tls
├── token-docker-machine
├── travis_key.enc
├── travis.txt
├── upload-service
└── user-service
```

Passo a passo:

Rode o script com o comando abaixo:

```bash
bash ./script.sh -ssh
```

Esse passo acima, so precisa ser feito uma unica vez, com ele, vai ser criado as chaves publica e privada, juntamente com o certificado digital para usar com o serviço Traefik, para usar https.

Na docker-machine no node master, rode o comando:

```bash
➜ docker stack deploy -c docker-compose.traefik.yml traefik
```

Isso vai subir os serviços traefik e o nginx.

---

Pre requisito para subir os outros serviços, preencher as variaveis ambiente no no arquivo, ".env.prod".

```bash
bash ./services.sh
```

Para saber se tudo ocorreu bem, faça:

```bash
➜ docker stack ps services
NAME                     IMAGE                   NODE   DESIRED STATE
services_gateway.1       gesuvs/gateway:latest   master    Running
services_bora-evento.1   gesuvs/eventos:latest   master    Running
services_bora-user.1     gesuvs/user:latest      master    Running
services_postgres.1      postgres:11             master    Running
```

```bash
➜ docker stack ps traefik
NAME                       IMAGE               NODE   DESIRED STATE
traefik_traefik.1          traefik:1.4         master Running
traefik_nginx_redirect.1   nginx:1.13          node1  Running
traefik_traefik.2          traefik:1.4         master Running
traefik_nginx_redirect.2   nginx:1.13          node2  Running
```

Para saber a url, execute:

```bash
docker-machine ip master
192.168.99.107
```

Com essa url voce tem acesso para se conectar ao banco de dados e tambem para executar requisições, com o uri, com prefix **/api**, seguindo para os endpoints, **/users** para service de usuarios e **/eventos** para service de eventos.
