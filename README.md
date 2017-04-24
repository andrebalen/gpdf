# gpdf

Este é um aplicativo que tem a finalidade de obter dados de contato e produtos
fornecidos por fabricas chinesas, estes dados incluem alem do contato descricoes detalhadas de cada produto.
O aplicativo recolhe esses dados e gera fichas em PDF para serem sincronizadas
com a sede de importação
 - [ionic repo] (https://apps.ionic.io/app/ea5cf698)

## Indice de Conteudos

- [TODO] (https://github.com/andrebalen/gpdf#todo)
- [Estrutura de Arquivos] (https://github.com/andrebalen/gpdf#estrutura-de-arquivos)
- [Build] (https://github.com/andrebalen/gpdf#build)
- [Plugins incluidos] (https://github.com/andrebalen/gpdf#plugins-incluidos)

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
www/
|   index.html
|   manifest.json
|   service-worker.js
|
+---css
|       ionic.app.css
|       ionic.app.min.css
|       style.css
|
+---dist
|       jspdf.debug.js
|       jspdf.min.js
|
+---img
|       ionic.png
|
+---js
|       app.js
+-------/controller/pdf.js
|
\---lib
```

Para o Build deste projeto, **estes arquivos devem existir exatamente com estes nomes**:

* `www/index.html` é o template da pagina;
* `www/js/app.js` é o JavaScript de inicio.
* `www/js/controller/pdf.js é o controller de todas as acoes

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
- ionic plugin add cordova-plugin-toast
- ionic plugin add cordova-plugin-network-information
- ionic plugin add cordova-plugin-file-opener2
```

## Trobleshooting

O que acontece quando algo nao funciona normalmente é um plugin quebrado, pra saber o que nao esta presente, siga este procedimento:
```
- ionic platform remove ios
- ionic platform add ios
```
ai é só adicionar os plugins ou ajustar no xml, as vezes pode ser exaustivo, mas uma vez correto, nao da mais problema
