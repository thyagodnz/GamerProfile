# Gamer Profile

Sistema web para gerenciamento de biblioteca pessoal de jogos.

## Funcionalidades
- Adicionar jogos à biblioteca
- Marcar jogos como favoritos 
- Fazer review de jogos
- Criar wishlist

## Classes do domínio

### User
- id
- nome
- email
- senha

### Game
- id
- titulo
- capa
- genero
- descricao

### Library
- id
- usuario
- jogos

### LibraryItem
- jogo
- status
- favorito
- nota
- horasJogadas

### Review
- usuario
- jogo
- comentario
- nota

## Relações entre as classes

### Associação
- User ↔ Review (Um usuário pode criar várias reviews)

- Game ↔ Review (Um jogo pode possuir várias reviews)

### Agregação
- User ◇── Library (A biblioteca pertence ao usuário, mas pode ser tratada separadamente)

### Composição
- Library ◆── LibraryItem (Os itens da biblioteca dependem da existência da biblioteca. Se a biblioteca for apagada, os itens também são.)
