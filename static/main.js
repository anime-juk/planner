function getFile () {
  clean();
    var file = document.getElementById ('fileInput').value;
    document.getElementsByClassName('filename')[0].innerHTML = 'Имя файла: ' + file;

    var form = document.forms.namedItem("fileinfo");
    oData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'fileinfo');
    xhr.send(oData);

    xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
      
        // по окончании запроса доступны:
        // status, statusText
        // responseText, responseXML (при content-type: text/xml)
      
        if (this.status != 200) {
          // обработать ошибку
          alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
          return;
        }
      
        // получить результат из this.responseText или this.responseXML
        console.log(xhr.responseXML);
        update(xhr.responseXML);
        
      }
    }
    function update(msg){
      var messagesNode = msg.getElementsByTagName('concept');
      var left = document.getElementsByClassName("left")[0];
      if(messagesNode)
        for(var i=0; i<messagesNode.length; i++){
          var el = document.createElement('div');
          el.className="el";
          el.innerHTML=messagesNode[i].getAttribute('name') + " " + messagesNode[i].getAttribute('comments');
          left.appendChild(el);
        }
    }
    function clean(){
      for(var i=0; i < document.getElementsByClassName("left")[0].childNodes.length;){
        document.getElementsByClassName("left")[0].childNodes[0].remove();
        console.log(document.getElementsByClassName("left")[0].childNodes.length);
      }
    }