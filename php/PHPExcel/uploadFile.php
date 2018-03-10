<?php 
	public function uploadFile($task_id) {

	    if(!empty($_FILES)) {
	        // dump("sss");
	        $upload = new \Think\Upload();// 实例化上传类
	        $upload->maxSize  =  1000000000  ;// 设置附件上传大小
	        $upload->rootPath =  './Uploads/student/'; // 设置附件上传根目录   任务列表
	        // $upload->savePath  =     $filePath.'/'; // 设置附件上传（子）目录
	        $info   =   $upload->upload();
	        if($info === false) {// 上传错误提示错误信息
	            $this->error("上传错误：".$upload->getError(),"",3);
	        }

	        //判断文件是否为excel格式
	        $fileName = $info["file"]['name'];

	        $fileType = substr($fileName,strrpos($fileName, '.') + 1);
	        if(strtolower($fileType) !== "xls" && strtolower($fileType) !== "xlsx") {
	           $this->error("文件格式错误！");
	        }

	        $filen=substr($fileName,0,strrpos($fileName, '.'));

	        //判断引入何种格式的phpexcel
	        import("Org.Util.PHPExcel");
	        $PHPExcel = new \PHPExcel();

	        if($fileType === "xlsx") {
	            //如果excel文件后缀名为.xlsx，导入类
	            import("Org.Util.PHPExcel.Reader.Excel2007");
	            $PHPReader=new \PHPExcel_Reader_Excel2007();
	        }
	        else {
	            import("Org.Util.PHPExcel.Reader.Excel5"); 
	            $PHPReader=new \PHPExcel_Reader_Excel5();
	        } 
	        $PHPExcel=$PHPReader->load(SITE_PATH."Uploads/student/".$info["file"]["savepath"].$info["file"]['savename']);       
	        
	        $currentSheet = $PHPExcel->getSheet(0);
	        //获取总列数
	        $allColumn = $currentSheet->getHighestColumn();
	        //获取总行数
	        $allRow = $currentSheet->getHighestRow();
	        //获取整张表，写入二维数组arr中 arr[行][列]
	        for($currentRow = 1;$currentRow <= $allRow;$currentRow++){
	        //从哪列开始，A表示第一列
	            for($currentColumn='A';$currentColumn<=$allColumn;$currentColumn++){
	                //数据坐标
	                $address=$currentColumn.$currentRow;
	                $cell = $currentSheet->getCell($address);
	                $cvalue = $cell->getValue();

	                if($cell->getDataType()==\PHPExcel_Cell_DataType::TYPE_NUMERIC){  
	                    $cellstyleformat = $cell->getStyle($cell->getCoordinate())
	                    ->getNumberFormat();  

	                    $formatcode = $cellstyleformat->getFormatCode(); 

	                    if (preg_match('/^(\[\$[A-Z]*-[0-9A-F]*\])*[hmsdy]/i', $formatcode)) {  
	                        $cvalue = gmdate("Y-m-d", \PHPExcel_Shared_Date::ExcelToPHP($cvalue));  
	                    }
	                    else{  
	                        $cvalue=\PHPExcel_Style_NumberFormat::toFormattedString($cvalue,$formatcode);  
	                    }  
	                }
	                //读取到的数据，保存到数组$arr中\
	                $arr[$currentRow][$currentColumn]=$cvalue;
	            }
	        }

	        for($i = 2,$len = count($arr);$i <= $len;$i++) {
	            $data = [
	                'student_id' => $arr[$i]['A'],
	                'created_at' => date('Y-m-d'),
	                'task_id' => $task_id
	            ];
	            M('ex_stutask')->add($data);
	        }
	    }
	}
 ?>