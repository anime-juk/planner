var xml;
var g_xml;
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
        //console.log(xhr.responseXML);
        update(xhr.responseXML);
        
      }
    }
    function update(msg){
      g_xml=msg;
     // msg.getElementsByTagName('concept')[0].getElementsByTagName('PSTU')[0].getElementsByTagName('element')[0]
      var messagesNode = msg.getElementsByTagName('concept');
      var left = document.getElementsByClassName("left1")[0];
      var left2 = document.getElementsByClassName("left2")[0];
      console.log(msg.getElementsByTagName('concept')[0].getElementsByTagName('PSTU')[0].getElementsByTagName('element')[0]);
      var sel=document.createElement('select');
      sel.onclick=plan;
      if(messagesNode)
        for(let i=0; i<messagesNode.length; i++){
          var el = document.createElement('div');
          var inch =document.createElement('input');
          inch.type="checkbox";
          el.className="el";
          messagesNode[i].setAttribute('pres',false);
          el.innerHTML=messagesNode[i].getAttribute('name') + " " + messagesNode[i].getAttribute('comments');
          el.onchange=function(e){messagesNode[i].setAttribute('pres',e.target.checked);console.log(messagesNode[i])};
          left.appendChild(el);
          el.appendChild(inch);
          var opt=document.createElement('option');
          opt.innerHTML=messagesNode[i].getAttribute('name') + " " + messagesNode[i].getAttribute('comments');
          opt.setAttribute("name",messagesNode[i].getAttribute('name'))
          left2.appendChild(sel);
          sel.appendChild(opt);
          //console.log(messagesNode[i])
        }
        xml=messagesNode;
        console.log(xml);
    }
    function clean(){
      for(var i=0; i < document.getElementsByClassName("left1")[0].childNodes.length;){
        document.getElementsByClassName("left1")[0].childNodes[0].remove();
        console.log(document.getElementsByClassName("left1")[0].childNodes.length);
      }
    }
    function plan(e){
    var str=String(e.target.value);
    console.log(str)
    var name_regexp=str.match(/\S?\S\d\d?\s/);
     console.log(name_regexp[0]);
     name_el=name_regexp[0].match(/\S?\S\d\d?/);
      var item;
     var messagesNode = xml;
     for(var i=0; i<messagesNode.length;i++){
       var atrname=messagesNode[i].getAttribute('name');
      console.log(atrname,name_el[0]);
       if(name_el[0] === atrname) {item = messagesNode[i]; console.log(item)}
     }
     ////
     var main=document.getElementsByClassName("main")[0];
     main.innerHTML='end';
     console.log('/////////////')
     planner([item.getAttribute('name')])

     function planner(item){
      main.innerHTML='Шаг: ' + main.innerHTML;
      main.innerHTML='<br>' + main.innerHTML;
       var mas=[];
       var out=[];
       for(var i=0;i<item.length;i++){
         for(var j=0;j<xml.length;j++){ if( (item[i]==xml[j].getAttribute('name'))){if(xml[j].getAttribute('pres') != "false") break;  mas[i]=j;}}
         console.log(mas)
         if(mas[i] == undefined) continue;
         console.log('atr'+ xml[mas[i]].getAttribute('pres'));
         for(var z=0;z < xml[mas[i]].getElementsByTagName('PRDU')[0].getElementsByTagName('element').length;z++){
        main.innerHTML=xml[mas[i]].getElementsByTagName('PRDU')[0].getElementsByTagName('element')[z].getAttribute('name')+' '+main.innerHTML;
        out.push(xml[mas[i]].getElementsByTagName('PRDU')[0].getElementsByTagName('element')[z].getAttribute('name'));
        console.log('out: '+out)
      }

       }
       console.log(out)
       if(out.length == 0) return;
       planner(out)
      }
    }