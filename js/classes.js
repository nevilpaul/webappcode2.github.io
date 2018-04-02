//define form variables
var formSubmition = document.getElementById('formSubmition');
//addEventListener
formSubmition.addEventListener('submit',dataSubmit,true);;
function pageView(){
  //localstorage_cookie = localStorage setItem('userpage_id','27727');
}
//class to connect to server via XMLHttpRequest
function serverConnection(){
  this.object = {
    method:'',
    url:'',
    data:'',
    connect:function(a,b,d){
      if(window.XMLHttpRequest){
             server_http = new XMLHttpRequest();
         }else{
             server_http = new ActiveXObject('Microsoft.XMLHTTP');
         }
         server_http.onprogress = function(event){
             console.log(event);
         }
         server_http.onreadystatechange = function(e){
             if(server_http.readyState == 4 && server_http.status == 200){
                var res = server_http.responseText;
                return res;
             }
         }
         server_http.open(a,b,true);
         //server_http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         server_http.send(d);
    }
  }
}

var conn = new serverConnection();
var response_xmlhttp = new serverConnection();


function serverConn(c,method,URI,formdata){
  //defining data configurations
  c.object['method'] = method; //defined key data for method
  c.object['url'] = URI; //defined key data for url
  c.object['data'] = formdata; //defined key data for data
  //store in global variables
  var method,url,data;
  method = c.object['method'];
  url = c.object['url'];
  data = c.object['data'];
  c.object.connect(method,url,data);
}
//submit_data using the class conn
function dataSubmit(e){
  e.preventDefault();

  var formdata,method,URI,username,password;
  //define username and password
  username = document.getElementById('username').value;
  password = document.getElementById('password').value;
  if(username == '' && password == ''){
    alert('fill in all the fields');
  }else{
    formdata = new FormData(this);
    formdata.append('submit_data','SIGNIN');
    method = 'POST';
    URI = 'admin/php_data/loginCredentials.php';
    serverConn(conn,method,URI,formdata);
  }
}
