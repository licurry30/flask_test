
        //AJAX 提交请求 GET方式
        //using AJAX:::::::::::::::::::::
        // an XMLHttpRequest
        var xhr = null;
	


		   /*
         * void
         * ExeQuery()
         *
         * SQL查询
         */
        function SqlQuery(page)
        { 
            //alert(page);
		
            // instantiate XMLHttpRequest object
            try
            {
                xhr = new XMLHttpRequest();
            }
            catch (e)
            {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            // handle old browsers
            if (xhr == null)
            {
                alert("Ajax not supported by your browser!");
                return;
            }

            
            // construct URL  url中文正常 但在send时出现乱码。
            var url = "dcmquery.php?q=newquery&NoduleType=" + document.getElementById("NoduleType").value
                                    +"&page="+page
                                    +"&NoduleCharacter="+ document.getElementById("NoduleCharacter").value
                                    +"&relations="+ document.getElementById("relations").value
                                    +"&relationvalue="+ document.getElementById("relationvalue").value;
			                                      
            //alert(url);
            // document.write(url);
            // inform user
            document.getElementById("queryresult").innerHTML = "Looking up symbol ff...";

             
            
            // get quote
            xhr.onreadystatechange = newqueryhandler;
            xhr.open("GET", encodeURI(url), true);
			xhr.setRequestHeader("Content-Type","text/html; charset=UTF-8");     
            xhr.send(null);
        }
		
		
		 /*
         * void
         * handler()
         * 新建开放项目 Ajax响应
         * Handles the Ajax response.
         */
        function newqueryhandler()
        {
			//alert(xhr.responseText);
			
			//AddHeader "Content-Type","text/html; charset=UTF-8";
            // only handle requests in "loaded" state
            if (xhr.readyState == 4)
            {
                if (xhr.status == 200)
                    document.getElementById("queryresult").innerHTML = xhr.responseText;
                else
                    alert("Error with Ajax call!");
					//document.write(xhr.responseText);
					
            }
			//window.location.reload();
        }
		
		

        function loadpage()
        {
            document.getElementById('content_teachmenu_6').innerHTML=document.getElementById('content_teachmenu_6_hidden').innerHTML;
        }
		
		
	function choice1(){
                       document.write( <select id="NoduleType">);
                                    document.write(<option id="NoduleType1">大结节</option>);
                                    document.write(<option id="NoduleType2">小结节</option>);
                                    document.write(<option id="NoduleType3">非结节</option>);
                                    
                        document.write(</select>);
			}	
