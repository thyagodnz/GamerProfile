# Gamer Profile

Sistema web para gerenciamento de biblioteca pessoal de jogos.

## Funcionalidades
- Adicionar jogos à biblioteca
- Marcar jogos como favoritos
- Registrar progresso 
- Avaliar jogos
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
