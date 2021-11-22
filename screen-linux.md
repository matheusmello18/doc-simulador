# Como utilizar o screen no linux

>screen é para rodar um programa em um terminal e poder fecha-lo que sua session vai se manter online


## instalar

```sh
# sudo apt-get install screen
```

## comandos

Abrir: no terminal digitar o screen que ira abri um novo terminal
```sh
# screen
```
Dentro do screen o ctrl+a é o comando base para tudo, por exemplo ctrl+a ? que vai abrir o help
```sh
ctrl + a + ?
```

Nova aba do screen
```sh
ctrl+a + c
```

Proxima pagina
```sh
ctrl+a + n
```

Em um terminal fora do screen, o comando abaixo mostra as session dele ativa 
```sh
screen -r
```

Para retornar a session do screen, com o comando acima, ira resumir as sessin e com o código da session entre com o comando abaixo
```sh
'screen -r 31294' ou somante 'screen' que pega a ultima session
```


```sh
```


```sh
```

```sh
```