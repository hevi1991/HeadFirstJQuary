<?php
    
    //$_POST假如用户使用POST方法请求,则会生成_POST数组,查看用于输入的什么信息,key是html元素的name属性
    if ($_POST['action'] == 'addRunner'){//检查是否是有一个addRunner值通过POST请求提交到服务器.这是之前增加的隐藏域
        
        $fname = htmlspecialchars($_POST['txtFirstName']);
		$lname = htmlspecialchars($_POST['txtLastName']);
		$gender = htmlspecialchars($_POST['ddlGender']);
		$minutes = htmlspecialchars($_POST['txtMinutes']);
		$seconds = htmlspecialchars($_POST['txtSeconds']);
		if(preg_match('/[^\w\s]/i', $fname) || preg_match('/[^\w\s]/i', $lname)) {
			fail('Invalid name provided.');
		}
		if( empty($fname) || empty($lname) ) {
			fail('Please enter a first and last name.');
		}
		if( empty($gender) ) {
			fail('Please select a gender.');
		}
		if( empty($minutes) || empty($seconds) ) {
			fail('Please enter minutes and seconds.');
		}
		
		$time = $minutes.":".$seconds;

		$query = "INSERT INTO runners SET first_name='$fname', last_name='$lname', gender='$gender', finish_time='$time'";
		$result = db_connection($query);
        
        
		if ($result) {
			$msg = "Runner: ".$fname." ".$lname." added successfully" ;
			success($msg);
		} else {
			fail('Insert failed.');
		}
		exit;
        
    }else if($_GET['action']=='getRunners'){
        //这个变量存的是数据库取表的询问语句
        $query = "SELECT first_name,last_name,gender,finish_time FROM runners order by finish_time ASC";
        //先取得与数据库服务器的联系,并选择数据库
        $result = db_connection($query);

        //定义和用法
        //mysql_fetch_array() 函数从结果集中取得一行作为关联数组，或数字数组，或二者兼有
        //返回根据从结果集取得的行生成的数组，如果没有更多行则返回 false。
        //语法
        //mysql_fetch_array(data,array_type),每次只读一行
        //参数	描述
        //data	可选。规定要使用的数据指针。该数据指针是 mysql_query() 函数产生的结果。
        //array_type	
        //可选。规定返回哪种结果。可能的值：
        //MYSQL_ASSOC - 关联数组
        //MYSQL_NUM - 数字数组
        //MYSQL_BOTH - 默认。同时产生关联和数字数组
        $runners = array();
        while ($row =  mysql_fetch_array($result,MYSQL_ASSOC)){//直至取到为空,才结束
        //array_push() 函数向数组尾部插入一个或多个元素。(array(=>带字符串键名的) 创建出有字符串键名的数组,有点像字典)
            array_push($runners,array('fname'=>$row['first_name'],'lname'=>$row['last_name'],'gender'=>$row['gender'],'time'=>$row['finish_time']));
        
        }
        echo json_encode(array("runners"=>$runners));//将json格式输出出来

        exit;
    }


    function db_connection($query){
        //mysql_connect:PHP连接数据库的服务器的函数
        //param:mySQL数据库所在的服务器名
        //param:该mySQL数据库的用户名
        //param:该用户的密码
        mysql_connect('127.0.0.1','runner_db_user','runner_db_password') OR die('Could not connect to database');
        //OR:链接不上就走die函数
        //die:直接结束PHP脚本

        //选择数据库
        mysql_select_db('hfjq_race_info');
        
        //mysql_query() 函数执行一条 MySQL 查询。
        return mysql_query($query);//返回查询出来的结果集合
    }

    function fail($message){
        die(json_encode(array('status'=>'fail','message'=>$message)));//退出的时候返回json
    }
    function success($message){
        die(json_encode(array('status'=>'success','message'=>$message)));//退出的时候返回json
    }
    
?>
