window.onload = initBody;
var ajaxRequest;
var A;
var B;
var C;

function initBody() {
	
	var button = document.getElementById('buttonId');
	button.onclick = calculate;
}

function calculate() {
	document.getElementById('r1').value = "";
	document.getElementById('r2').value = "";
	
	A = document.getElementById('A').value;
	B = document.getElementById('B').value;
	C = document.getElementById('C').value;
	
	var correctInput = checkInput(A, B, C);
	
	if(correctInput == true){
		makeAjaxReqResp();
	}
	else{
		alert("All fields must be filled out and numbers only!");
	}
}
function checkInput(A, B, C){
	var checkResult = true;
	var regexp = /^[0-9-]{0,10}$/;
	if( A == "" | B == "" | C == "" )
	{
		checkResult = false;
	}
		else{
			if( !(regexp.test(A)) | !(regexp.test(B)) | !(regexp.test(C))){
			checkResult = false;
		}
	}
	return checkResult;
}

function makeAjaxReqResp(){

	ajaxFunction();
	ajaxRequest.onreadystatechange = processRequest;

	ajaxRequest.open("GET","http://localhost:8081/myfirstservlet?A="+A+"&B="+B+"&C="+C,true);
	ajaxRequest.send(null);

}
function ajaxFunction(){
	try{
	ajaxRequest = new XMLHttpRequest();
	} catch(e){

		try {
		ajaxRequest = new ActiveXObject("Msxml2.XMNHTTP");
		}catch(e){

			try {
			ajaxRequest = new ActiveXObject("Microsoft.XMNHTTP");
			}catch(e){
				alert("Your browser broke");
				return false;
			}
		}	
	}
}
function processRequest(){
	if(this.readyState==4){
		if(this.status==200){
			var result = this.responseXML;
			var X = result.getElementsByTagName('X')[0].innerHTML;
			var Y = result.getElementsByTagName('Y')[0].innerHTML;
			document.getElementById('r1').value = X;
			document.getElementById('r2').value = Y;
			insertNewRow(X, Y);
		    
			
		}
	}
}

function insertNewRow(X, Y) {
	
	var tbody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
  
	var row = document.createElement("tr");
	tbody.appendChild(row);
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	var td3 = document.createElement("td");
	row.appendChild(td1);
	row.appendChild(td2);
	row.appendChild(td3);
	
	var vA = 1;
	var pA = " ";
	if(A<0){pA = " -"; vA= -1;	}
	
	var vB = 1;
	var pB = " + ";
	if(B<0){pB = " - "; vB= -1;	}
	
	var vC = 1;
	var pC = " + ";
	if(C<0){pC = " - "; vC= -1;}
	
	td1.innerHTML = pA + A * vA +'*x<sup><small>2</small></sup> ' + pB + B * vB + '*x' + pC + C * vC + ' = 0';
	td2.innerHTML = X;
	td3.innerHTML = Y;
	
}



$(document).ready(function(){
	$("table").on("click","tr:not(.header)", function(){ 	
		this.remove();
	});	
});