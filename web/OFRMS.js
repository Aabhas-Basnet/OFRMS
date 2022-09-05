var arryN = []
	var arryS =[]
	eel.expose(Receive_Info);
	

	function Receive_Info(x,y)
	{    
        if (localStorage.getItem('arryN')== null){
		    LoadArrayToLS(x,y);
		}    	
	}  
	
	function Add_File(){
	  
	  var Name = getInfoName();
	  
	  if (Name == null){
	  
	  }
	  else{
	    var Source = getInfoSource(Name);
		eel.Add_file(Name,Source)
		
		var N1 = localStorage.getItem('arryN');
		var N1A = JSON.parse(N1);
		var N2 = localStorage.getItem('arryS');
		var N2A = JSON.parse(N2);
		
		N1A.push(Name);
		N2A.push(Source);
		LoadArrayToLS(N1A,N2A);
	  }
	}
	
	function checkName(x){
	   var N1 = localStorage.getItem('arryN');
	   var N1A = JSON.parse(N1);
	   
	   for (var i = 0; i < N1A.length; i++){
          if (N1A[i].toLowerCase() == x.toLowerCase()){
		    return true;
		  }	   
	   }
	}
	
	function getInfoName(x) {
	  while(true){
	    var x = window.prompt("Enter the name of the file: ");
		var checker = false;
		
		if (x == ""){
		  alert("You did not write anything!");
	    }else{
		  checker = checkName(x);
		  if (checker){alert ("This name already exist ! Try a different name.");
		  }else{break;}
		}
		 
 	  }
	  return x;
	}
	
	function getInfoSource(N) {
	  x = N+'.csv'
	  return x;
	}
	
	function Del_File(){
	  var Name = window.prompt("Enter the name of the file: ");
	  var Source;
	  var N1 = localStorage.getItem('arryN');
	  var N1A = JSON.parse(N1);
	  var N2 = localStorage.getItem('arryS');
	  var N2A = JSON.parse(N2);
	  var found = false;
	  
	  for (var i = 0; i < N1A.length; i++){
	    if (N1A[i] == Name){
		   console.log(N1A[i]);
		   N1A.splice(i,1);
		   Source = N2A[i];
		   N2A.splice(i,1);
		   eel.Del_file(Name,Source)
		   LoadArrayToLS(N1A,N2A);
		   found = true;
		}
	  }
		
		if (found == false){
		 alert("The file you want to delete is missing !");
		}	
	  
	}
	
	LoadArrayToLS = function(x,y){
	   localStorage.setItem('arryN',JSON.stringify(x));
	   localStorage.setItem('arryS',JSON.stringify(y));
	}
	
	arry1 = localStorage.getItem('arryN');
	arryN = JSON.parse(arry1);
	arry2 = localStorage.getItem('arryS');
	arryS = JSON.parse(arry2);
	
	LoadProject();
	function LoadProject(){
	 
	    var f = document.getElementById("LProjects");
		
		var br = document.createElement("br");
	    for (a in arryN){
		
		  const i = document.createElement("input");
		  i.setAttribute('type', "checkbox");
		  i.setAttribute('id', arryN[a]);
		  i.setAttribute('class', 'Checkbox');
		  
		  var newlabel = document.createElement("Label");
		  newlabel.setAttribute("for",arryN[a]);
		  newlabel.innerHTML = ' '+arryN[a];
		  
		  const S = document.createElement("Select");
		  S.setAttribute("id",arryN[a]+"Type");
		  
		  var Opt1 = document.createElement("option");
		  Opt1.setAttribute("value","Credit");
		  Opt1.innerHTML = "Credit";
		  
		  var Opt2 = document.createElement("option");
		  Opt2.setAttribute("value","Debit");
		  Opt2.innerHTML = "Debit";

		  S.appendChild(Opt1);
		  S.appendChild(Opt2);
		  f.appendChild(i);
		  f.appendChild(S);
		  f.appendChild(newlabel);
          f.appendChild(br.cloneNode());		  
		}

	}
	
	
	function callPython(){
	    var pcCount = 0;
	    des = document.getElementById("Description").value;
	    am = document.getElementById("Amount").value;
	    src = document.getElementById("Source").value;

		for (i in arryN){
		  var pc = ProjectCheck(arryN[i]);
		  
		  if (pc){
		     ty = TypeCheck(arryN[i]);
			 pcCount++;
			 eel.Add_record(des,am,ty,src,arryS[i])
		  }
		}
		
    }
	
	function TypeCheck(x){
	 val = document.getElementById(x+"Type").value;
	 console.log(val);
	 return val;
	}
	
	function ProjectCheck(x){
	   const cb = document.querySelector('#'+x);
	   if (cb.checked == true){
		 return true;
		}
	}
	
	Check_Fill = function(){
	  var Des = document.getElementById("Description").value;
	  var Amt = document.getElementById("Amount").value;
	  var Src = document.getElementById("Source").value;
	  var Sub = document.querySelector("#SubmitAns");
	  var add = document.querySelector("#Add_button");
	  var Del = document.querySelector("#Del_button");
	  var pcCount = 0;
	  
	  for (i in arryN){
		  var pc = ProjectCheck(arryN[i]);
		  
		  if (pc){
			 pcCount++;
		  }
		}
	  
	  if (Des == "" || Amt == "" || Src =="" || pcCount == 0){
	    Sub.disabled = true;
	  }else{
	    Sub.disabled = false;
	  }
	  
	  if (Des == "" && Amt == "" && Src =="" ){
	    add.disabled = false;
		Del.disabled = false;
	  }else{
	    add.disabled = true;
		Del.disabled = true;
	  }
	}
	  
	
	setInterval(Check_Fill,10);
	
	
	