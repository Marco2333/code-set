<?php 
	public function getRetireInfo() {

	    $data = json_decode(html_entity_decode(I('aoData')),true);

	    for($i = 0;$i < count($data);$i++) {
	        if($data[$i]['name'] == 'iDisplayStart') {
	            $dataStart = $data[$i]['value'];      
	        }
	        if($data[$i]['name'] == 'iDisplayLength') {
	           $dataLength = $data[$i]['value'];      
	        }
	        if($data[$i]['name'] == 'sEcho') {
	           $sEcho = $data[$i]['value'];      
	        }
	        if($data[$i]['name'] == 'sSearch') {
	            $sSearch = $data[$i]['value'];
	        }
	    }
	    
	    $Model = new \Think\Model();

	    if( strlen(trim($sSearch)) == 0 ) {  
	        $count = $Model->query("select count(*) as ct from rt_teacher");
	        $infolist = $Model->query("select * from rt_teacher limit ".$dataStart.",".$dataLength);
	    }
	    else {
	        $field = array("employee_id","name","gender","nation","date_format(birth_date,'%Y-%c-%d')","date_format(work_date,'%Y-%c-%d')","date_format(submit_date,'%Y-%c-%d')","positional_title","education_background",
	            "politics_status","homephone","mobilephone","rank","identity_card_number","department",
	            "home_address","status","native_place","physical_condition","tips1", "tips2", "tips3" );
	        // 把查询条件传入查询方法
	        $sqlstring = "select * from rt_teacher where ";
	        for ($i=0; $i < count($field)-1; $i++) { 
	            $sqlstring = $sqlstring.$field[$i]." like "."'%".$sSearch."%' "."or "     ;
	        }
	        $sqlstring= $sqlstring."tips3"." like "."'%".$sSearch."%' ";

	        $count = $Model->query(str_replace("*","count(*) as ct",$sqlstring));
	        $infolist = $Model->query($sqlstring." limit ".$dataStart.",".$dataLength);
	    }

	    for($i = 0;$i < count($infolist);$i++) {
	        $infolist[$i]['temp'] = "";
	    }

	    $res['sEcho'] = $sEcho;
	    $res['status'] = 1;
	    $res['iTotalRecords'] = $count[0]['ct'];
	    $res['iTotalDisplayRecords'] = $count[0]['ct'];
	    $res['aaData'] = $infolist;
	    $this->ajaxReturn($res);
	}
 ?>