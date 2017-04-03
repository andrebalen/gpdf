GPDF.controller('pdfCtrl',  function($rootScope, $scope, $cordovaFile, $cordovaNetwork, $cordovaToast, $cordovaFileTransfer,$cordovaCamera) {
  $scope.data = {};
  $scope.produto = {};
  $scope.src = [];
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


  $scope.file = function(){

    var filePath = cordova.file.dataDirectory; //+'/fbr_'+name+'.pdf'; //http://ngcordova.com/docs/plugins/file/
    var fileName = 'fbr_'+Math.random().toString(36).substring(7)+"_"+$scope.data.apelido+'.pdf';
   console.log("local de salvamento:"+fileName);


    var localFiles = JSON.parse(window.localStorage.getItem('files'))
    if(!window.localStorage.getItem('files')){
      localFiles = [];
    }
    localFiles.push(fileName);
    window.localStorage.setItem('files', JSON.stringify(localFiles))
    $scope.produto = {};
    $cordovaFile.writeFile(filePath, fileName, geraPdf()).then(function(){
    var filePath = cordova.file.dataDirectory; //+'/fbr_'+name+'.pdf'; //http://ngcordova.com/docs/plugins/file/
    var localStorageItens = JSON.parse(window.localStorage.getItem('files'));
      if(isOnline){
        angular.forEach(localStorageItens, function(value, key) {
          var options = new FileUploadOptions();
          options.fileKey = "file";
          options.fileName = value
          options.mimeType = "application/pdf";
          $cordovaFileTransfer.upload("http://trade.guelcos.com/files/file.php", filePath+value, options)
            .then(function(result) {
              console.log(localStorageItens[key], "sucesso");
              localStorageItens.splice(key, 1);
              window.localStorage.setItem('files', JSON.stringify(localStorageItens))
              $cordovaToast.show('Arquivos sincronizados com sucesso', 'long', 'center')
            }, function(err) {
              localStorageItens.splice(key, 1);
              window.localStorage.setItem('files', JSON.stringify(localStorageItens))
              console.log(localStorageItens[key], "erro")
              $cordovaToast.show('Ops, tivemos um problema', 'long', 'center')
            }, function (progress) {
              // constant progress updates
            });
        })
      }
    })
  }

    $scope.foto = function(index){
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.src[index] = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        // error
      });


    }
 // Função responsável por executar a captura dos dados e geração do PDF
  var geraPdf = function()
  {

    //Logo Guelcos
    var imgData = 'data:image/png;base64,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';

    var name = $scope.data.apelido || '';
    var wechat = $scope.data.wechat || '';
    var tiprod = $scope.data.tiprod || '';
    var fob = $scope.data.fob || '';


    var pdf = new jsPDF();

    pdf.setFont("helvetica");
    pdf.setProperties({
      title: 'Purchase Order Draft da Guelcos',
      subject: 'produtos disponibilizados pelo fabricante: ' + name,
      author: 'Andre Balen - balenpro@gmail.com',
      keywords: 'draft, PO, guelcos, purchase order',
      creator: 'gPDF, IOs generated, javascript, web 2.0, ajax'
    });

    pdf.addImage(imgData, 10, 10); // adicionando logotipo no topo da pagina
    pdf.addImage($scope.src[1], 10, 10); // adicionando logotipo no topo da pagina
    pdf.addImage($scope.src[2], 10, 10); // adicionando logotipo no topo da pagina
    pdf.text(70, 20, 'Draft PO do fabricante ' + name);

    //pdf.setFontSize(40);
    pdf.text(20, 50, 'Apelido: ' + name);
    pdf.text(20, 60, 'incluir contato');
    pdf.text(20, 70, '+ contato');
    pdf.text(20, 80, 'wechat id /obs: ' + wechat);
    pdf.text(20, 90, 'tipo de produto: ' + tiprod );
    pdf.text(20, 100, 'FOB: ' + fob );
    pdf.text(20, 110, 'Produtos');


    return  pdf.output("blob");


  }


});
})
