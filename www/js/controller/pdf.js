GPDF.controller('pdfCtrl',  function($rootScope, $scope, $cordovaFile, $cordovaNetwork, $cordovaToast, $cordovaFileTransfer, $cordovaCamera, $cordovaFileOpener2)
{
  $scope.data = {};
  $scope.produto = {};
  $scope.free = {};
  $scope.src = [];
  $scope.storage = [];

  document.addEventListener("deviceready", function ()
  {
    var isOnline = $cordovaNetwork.isOnline();
    // Verifica se estamos online
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState)
    {
      $cordovaToast.show('Rede Disponível, enviando fichas ....', 'long', 'top')
      // Envia os arquivos para a sede via trade.guelcos.com
      var filePath = cordova.file.dataDirectory; //+'/fbr_'+name+'.pdf'; //http://ngcordova.com/docs/plugins/file/
      var localStorageItens = JSON.parse(window.localStorage.getItem('files'));

      angular.forEach(localStorageItens, function(value, key)
      {
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = value
        options.mimeType = "application/pdf";
        //console.log(options);
        $cordovaFileTransfer.upload("http://trade.guelcos.com/files/file.php", filePath+value, options)
          .then(function(result)
          {
           delete localStorageItens[key];
           //console.log(result);
          }, function(err)
          {
           console.log(err)
          }, function (progress)
          {
            // constant progress updates
          });
        })
      })

  //  console.log("vou ver o espaco livre");
  //  $scope.free = $cordovaFile.getFreeDiskSpace(); // pra mostrar o que ainda tem de espaco
//    console.log("espaco livre é :"+ free);

    $scope.file = function()
    {
      //alternativas para criar arquivos unicos, prefiro o timestamp
      //var atual_data = new Date().toISOString().split("T",1);
      var epoc = new Date().getTime();
      //var tstamp = Number(atual_data);
      //console.log("timestamp human readable: "+atual_data+"_"+epoc);
      //var randon_chars = Math.random().toString(36).substring(7);

      var filePath = cordova.file.dataDirectory; //http://ngcordova.com/docs/plugins/file/
      var fileName = epoc+'_'+$scope.data.user+'_fbr_'+$scope.data.apelido+'_prod_'+$scope.produto.id+'.pdf';
      console.log("local de salvamento:"+filePath);
      console.log("nome do arquivo:"+fileName);
  //    $cordovaFile.writeFile(filePath, fileName, geraPdf());

      var localFiles = JSON.parse(window.localStorage.getItem('files'))
      if(!window.localStorage.getItem('files')) {
        localFiles = [];
      }
      else {
        console.log("vou atualizar a lista de espera"+$scope.storage);
        $scope.storage = localFiles; // acredito q popular a lista fica melhor aqui
        console.log("atualizei, itens q podem ser visualizados:"+$scope.storage);
      }
      localFiles.push(fileName);
      window.localStorage.setItem('files', JSON.stringify(localFiles))

      $cordovaFile.writeFile(filePath, fileName, geraPdf()).then(function()
      {
      $scope.produto = {}; // zera o escopo produto depois q escreve o PDF
      //console.log($scope.src);
  //    console.log("vou zerar as posicoes de imagens do produto, e talvez do 2o cartao");
      // forma polida de fazer
      $scope.src.splice(3, 4); // limpa a partir da 3a posicao 4 posicoes incluindo a 3a
      //preciso arrumar uma forma de remover o buffer de imagem da view
      $scope.src[3]=''; //limpa;
      $scope.src[4]=''; //limpa;
      $scope.src[5]=''; //limpa;
      $scope.src[6]=''; //limpa;
      //console.log("sera q rolou?");
    //  console.log($scope.src);
      var filePath = cordova.file.dataDirectory; //http://ngcordova.com/docs/plugins/file/
      var localStorageItens = JSON.parse(window.localStorage.getItem('files'));
        console.log(localStorageItens, "lero")
        if(isOnline)
        {
          console.log("está online")
    //      console.log($scope.data)
//          console.log($scope.produto)
          angular.forEach(localStorageItens, function(value, key)
          {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = value
            options.mimeType = "application/pdf";
            $cordovaFileTransfer.upload("http://trade.guelcos.com/files/file.php", filePath+value, options)
              .then(function(result)
              {
      //          console.log(result, "ok");
                delete localStorageItens[key];
                $cordovaToast.show('Fichas sincronizadas com sucesso', 'long', 'top')
              }, function(err)
              {
    //            console.log(err)
                $cordovaToast.show('Link indisponivel, incluindo na fila', 'long', 'top')
              }, function (progress)
              {
                // constant progress updates
              });
          })
        }
      })
      }

//captura de imagem
      $scope.foto = function(index)
      {
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPG,
          targetWidth: 900,
          targetHeight: 675,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        }; //340 189 180 x 100 eh uma boa

        $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.src[index] = "data:image/JPG;base64," + imageData;
          console.log($scope.src)
        }, function(err) {
          // error
        });
      }

 // inclui o cabeçalho da guelcos nas paginas
  var header = function()
  {
    //Logo Guelcos
    var imgData = 'data:image/png;base64,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';

    var now = new Date();

    pdf.setFontSize(8);
    pdf.setTextColor(150);
    pdf.text(145, 5, '' + now);
    pdf.setTextColor(50);
    pdf.setFontSize(10);
    pdf.addImage(imgData, 5, 5); // adicionando logotipo no topo da pagina

  }

 // Função responsável por executar a captura dos dados e geração do PDF
  var geraPdf = function()
  {
    // buscando as informações da view
    var usuario = $scope.data.user || '';
    var name = $scope.data.apelido || '';
    var wechat = $scope.data.wechat || '';
    var tiprod = $scope.data.tiprod || '';
    var fob = $scope.data.fob || '';
    var origem = $scope.data.origem || '';
    var destino = $scope.data.destino || '';

    var id = $scope.produto.id || '';
    var hscode = $scope.produto.hscode || '';
    var moq = $scope.produto.moq || '';
    var preco = $scope.produto.preco || '';
    var detalhes = $scope.produto.detalhes || '';
    var inmetro = $scope.produto.inmetro || '';
    var obs = $scope.produto.obs || '';
    var obs2 = $scope.produto.obs2 || '';
    var obs3 = $scope.produto.obs3 || '';


    var pdf = new jsPDF();
//    var temCartoes = false;
//    var tem3aimagemDeProduto = false;

    pdf.setFont("helvetica");
    pdf.setProperties({
      title: 'Draft PO Guelcos:'+usuario,
      subject: 'produtos do fabricante: ' + name,
      author: 'guelcos dev team - po@guelcos.com.br',
      keywords: 'draft, PO, guelcos, purchase order, trade fair app, canton fair',
      creator: 'gPDF, IOs generated, javascript, web 2.0, ajax'
      });

    header();

    pdf.text(20, 30, 'Fornecedor: ' + name);
    pdf.text(20, 35, 'Cliente: '+ usuario);

    pdf.text(20, 40, 'Apelido da Fabrica: ' + name);
    pdf.text(20, 45, 'wechat id / obs: ' + wechat);
    pdf.text(20, 50, 'tipo de produto: ' + tiprod);
    pdf.text(20, 55, 'incoterms: ' + fob);
    pdf.text(20, 60, 'origem: ' + origem);
    pdf.text(20, 65, 'destino: ' + destino);
    pdf.setTextColor(150);
    pdf.setLineWidth(0.2);
    pdf.line(20, 70, 90, 70); // comeca no 20 na altura 110 termina no 90 na altura 110
    pdf.setTextColor(50);
    pdf.text(20, 75, 'Modelo/Descrição:' +id);
    pdf.text(20, 80, 'HS CODE:' +hscode);
    pdf.text(20, 85, 'MOQ:' +moq);
    pdf.text(60, 85, 'Preço: U$'+preco);
    pdf.text(20, 90, 'Descrição: ' +detalhes);
    pdf.text(20, 95, 'Inmetro?:' +inmetro);
    pdf.text(20, 100, 'Observações: ' +obs);
    pdf.text(20, 105, '' +obs2);
    pdf.text(20, 110, '' +obs3);

    if($scope.src[1]) // se nao tiver imagem nem perde tempo
    {
      pdf.addImage($scope.src[1], 20, 115); // cartao 1
    }

    if($scope.src[2]) // se nao tiver 2o cartao nem perde tempo
    {
      pdf.addPage();
      header();
      pdf.addImage($scope.src[2], 20, 30); // cartao 2 no lugar do 1o
    }

    if($scope.src[3]) // se nao tiver imagem nem perde tempo
    {
      pdf.addPage(); // coloca a pagina q vai receber o cabecalho abaixo
      header();
      pdf.addImage($scope.src[3], 20, 30);  // foto produto 1
    }

    if($scope.src[4]) // se nao tiver imagem nem perde tempo
    {
      pdf.addPage(); // coloca a pagina q vai receber o cabecalho abaixo
      header();
      pdf.addImage($scope.src[4], 20, 30); // foto produto 2
    }

    if($scope.src[5]) // se nao tiver imagem nem perde tempo
    {
      pdf.addPage(); // caso so tiver a ultima imagem ela nao vai aparecer,
      header();
      pdf.addImage($scope.src[5], 20, 30);  // foto produto 3
    }

    if($scope.src[6]) // se nao tiver imagem nem perde tempo
    {
      pdf.addPage(); // caso so tiver a ultima imagem ela nao vai aparecer,
      header();
      pdf.addImage($scope.src[6], 20, 30); // foto produto 4
    }
    return pdf.output("blob");
  }

$scope.showPdf=function(filename)
{
  var filePath = cordova.file.dataDirectory;
  console.log("abrindo:"+filePath+'/'+filename);
  if(filePath)
  {
  $cordovaFileOpener2.open(filePath+'/'+filename,'application/pdf').then(
    function()
    {
      console.log("ok "+filePath+'/'+filename);
    },
    function(err) {
      console.log("falha ao abrir "+filePath+'/'+filename);
    });
    }
    else {
        console.log("falha ao acessar o caminho para "+filename);
    }
}
});
})
