# Índice:
- [Front-End](#front-end)
  - [Apresentação](#apresentação)
  - [Desenvolvedores](#desenvolvedores)
  - [Deploy](#deploy)
  - [Design](#design)
    - [Desktop](#desktop)
    - [Mobile](#mobile)
  - [User Flow](#user-flow)
  - [Referências](#referências)
  - [Recomendações de Estudo](#recomendações-de-estudo)
- [Documentação](#documentação)
  - [Introdução](#introdução)
  - [Pré-requisitos](#pré-requisitos)
    - [XAMPP\]()
  - [Como rodar](#como-rodar)
  - [Referências](#referências-1)
    - [Desabilitar UAC\]()
    - [Acessar LocalHost pela rede Local (Windows)\]()
  - [Recomendações de Estudo](#recomendações-de-estudo-1)
    - [HTML\*]()
    - [CSS\*]()
    - [JacaScript\]()
- [Créditos](#créditos)
    
# Front-End:

## Apresentação:
Este é o repositório que armazena o front-end do app Cronos.

## Desenvolvedores:
- [Patryck Henryck Moreira Silva](https://github.com/PHmore)
- [Antônio Cássio de Oliveira Neto]()
- [Luiz Filipe de Souza Alves](https://github.com/LuFi-1227)

## Deploy:

## Design:

### Desktop:

### Mobile:

## User Flow:

## Referências:

## Recomendações de Estudo:

# Documentação:

## Introdução:

## Pré-requisitos:
Nesta seção estão contidos os pré-requisitos necessários para rodar o projeto em máquina local.

### XAMPP:
Para o funcionamento do projeto na sua máquina, você deve ter o [XAMPP](https://www.apachefriends.org/pt_br/download.html) ou outra ferramenta de host para o php instalado no seu computador, não é obrigatório o uso do XAMPP, mas este projeto recomenda a utilização do mesmo ao fazer o clone deste repositório.

Link para instalar o XAMPP:
[link](https://www.apachefriends.org/pt_br/download.html)

## Como rodar:

## Referências:
Aqui estão os sites visitados necessários para criar esta documentação.

### Desabilitar UAC:
- No caso de Usuários de Windows, é interessante desabilitar o UAC, para isto, basta rodar no CMD como administrador os seguintes comandos:
```
REG ADD HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System /V EnableLUA /T REG_DWORD /D 0 /F [Enter]

secedit /configure /cfg %windir%\inf\defltbase.inf /db defltbase.sdb /verbose [Enter]

RD /S /Q "%WinDir%\System32\GroupPolicyUsers" [Enter]

RD /S /Q "%WinDir%\System32\GroupPolicy" [Enter]

gpupdate /force  [Enter]
```
- Após rodar os comandos, reinicie seu computador.
- Mas se você quer buscar direto da fonte e de outras formas, aqui está a referência:
- [Desabilitar UAC](https://answers.microsoft.com/pt-br/windows/forum/all/desabilitar-uac/e2fe1321-e984-4075-9e8c-2a683afe7a3b)

### Acessar LocalHost pela rede Local (Windows):
- Para fazer tal feito, basta ter seguido o tutorial da documentação, mas se você preferir assistir um vídeo:
- [Acessar Local Host com Celular](https://www.youtube.com/watch?v=L6pn7S699zQ)
  
## Recomendações de Estudo:

### HTML:

### CSS:

### Javascript:
- Este é o curso de JavaScript da CFB cursos que recomendamos, ele é muito legal e muito didático para o aprendizado.
- [Playlist JavaScript](https://www.youtube.com/watch?v=E4DBTqgxHGM&list=PLx4x_zx8csUg_AxxbVWHEyAJ6cBdsYc0T&index=1)

# Créditos:
- Todos os direitos de Copywriting dos contaúdos de terceiros aqui registrados estão reservados para os criadores dos conteúdos referenciados nesta documentação.
