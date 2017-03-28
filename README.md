# gpdf

Este é um aplicativo que tem a finalidade de obter dados de contato e produtos
fornecidos por fabricas chinesas, estes dados incluem alem do contato descricoes detalhadas de cada produto.
O aplicativo recolhe esses dados e gera fichas em PDF para serem sincronizadas
com a sede de importação
 - [ionic repo] (https://apps.ionic.io/app/ea5cf698)



## Indice de Conteudos

- [TODO] ( https://github.com/andrebalen/gpdf#todo)
- [Estrutura de Arquivos] ( https://github.com/andrebalen/gpdf#estrutura-de-arquivos)
- [Build] ( https://github.com/andrebalen/gpdf#build)
- [Plugins incluidos] ( https://github.com/andrebalen/gpdf#plugins-incluidos)

## TODO
- incluir controller para o salvamento e envio dos arquivos
- 
- incluir campo para escolher fazer ou nao o upload
- incluir um medidor de espaco livre
- fazer um resize posterior das imagens e videos, deixar o usuario tirar fotos livremente
- decidir o que fazer com o video, ateh o momento nome e path no pdf apenas
- o nom do video, tanto quanto do arquivo sai do apelido da fabrica unido com algo do produto


## Estrutura de Arquivos

Depois de criado, seu projeto vai se parecer com isto:

```
gPDF/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

Para o Build deste projeto, **estes arquivos devem existir exatamente com estes nomes**:

* `public/index.html` é o template da pagina;
* `src/index.js` é o JavaScript de inicio.

## Build
Comandos para baixar dependencias e tornar possivel o build

```
- ionic install

```

## Plugins incluidos
Lista de plugins incluidos
```
- ionic plugin add cordova-plugin-file
- ionic plugin add cordova-plugin-file-tranfer


```
