GPDF.controller('pdfCtrl',  function($rootScope, $scope, $cordovaFile, $cordovaNetwork, $cordovaToast, $cordovaFileTransfer) {
  $scope.data = {};
  $scope.produto = {};
  document.addEventListener("deviceready", function () {


    var isOnline = $cordovaNetwork.isOnline();
    // Verifica se estamos online
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      $cordovaToast.show('Você está  Online', 'long', 'center')
      // Envia os arquivos para o FTP
      var filePath = cordova.file.dataDirectory; //+'/fbr_'+name+'.pdf'; //http://ngcordova.com/docs/plugins/file/
      var localStorageItens = JSON.parse(window.localStorage.getItem('files'));
      angular.forEach(localStorageItens, function(value, key) {
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = value
        options.mimeType = "application/pdf";
        $cordovaFileTransfer.upload("http://trade.guelcos.com/files/file.php", filePath+value, options)
          .then(function(result) {
            delete localStorageItens[key];
          }, function(err) {
           console.log(err)
          }, function (progress) {
            // constant progress updates
          });


        })
      })
    })

  $scope.file = function(){

    var filePath = cordova.file.dataDirectory; //+'/fbr_'+name+'.pdf'; //http://ngcordova.com/docs/plugins/file/
    var fileName = 'fbr_'+$scope.data.apelido+'.pdf';
    //console.log("local de salvamento:"+filePath);
    $cordovaFile.writeFile(filePath, fileName, geraPdf());

    var localFiles = JSON.parse(window.localStorage.getItem('files'))
    if(!window.localStorage.getItem('files')){
      localFiles = [];
    }
    localFiles.push(fileName);
    window.localStorage.setItem('files', JSON.stringify(localFiles))
    $scope.produto = {};
    var filePath = cordova.file.dataDirectory; //+'/fbr_'+name+'.pdf'; //http://ngcordova.com/docs/plugins/file/
    var localStorageItens = JSON.parse(window.localStorage.getItem('files'));
    angular.forEach(localStorageItens, function(value, key) {
      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = value
      options.mimeType = "application/pdf";
      $cordovaFileTransfer.upload("http://trade.guelcos.com/files/file.php", filePath+value, options)
        .then(function(result) {
          console.log(result);
          delete localStorageItens[key];
          $cordovaToast.show('Arquivos sincronizados com sucesso', 'long', 'center')
        }, function(err) {
          console.log(err)
          $cordovaToast.show('Ops, tivemos um problema', 'long', 'center')
        }, function (progress) {
          // constant progress updates
        });


    })
  }


 // Função responsável por executar a captura dos dados e geração do PDF
  var geraPdf = function()
  {

    //Logo Guelcos
    //    var imgData = 'data:image/png;base64,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';
    var name = $scope.data.apelido;
    var wechat = $scope.data.wechat;
    var tiprod = $scope.data.tiprod;
    var fob = $scope.data.fob;


    var pdf = new jsPDF();

    pdf.setFont("helvetica");
    pdf.setProperties({
      title: 'Purchase Order Draft da Guelcos',
      subject: 'produtos disponibilizados pelo fabricante: ' + name,
      author: 'Andre Balen - balenpro@gmail.com',
      keywords: 'draft, PO, guelcos, purchase order',
      creator: 'gPDF, IOs generated, javascript, web 2.0, ajax'
    });


    pdf.text(70, 20, 'Draft PO do fabricante ' + name);

    //pdf.setFontSize(40);
    pdf.text(20, 50, 'Apelido: ' + name);
    pdf.text(20, 60, 'incluir contato');
    pdf.text(20, 70, '+ contato');
    pdf.text(20, 80, 'wechat id /obs: ' + wechat);
    pdf.text(20, 90, 'tipo de produto: ' + tiprod);
    pdf.text(20, 100, 'FOB: ' + fob);
    pdf.text(20, 110, 'Produtos');


    return  pdf.output("blob");


  }


});
