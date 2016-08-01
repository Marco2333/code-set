<?php 
	public function downloadfile($student, $mark, $fileName){

	    import("Org.Util.PHPExcel");
	    $objPHPExcel = new \PHPExcel();
	    import("Org.Util.PHPExcel.Reader.Excel5"); 

	    $objPHPExcel->setActiveSheetIndex(0);
	    
	    $objPHPExcel->getActiveSheet()->setCellValue('A1', '学生姓名');
	    for($j = count($student);$j > 0;$j--) {
	        $objPHPExcel->getActiveSheet()->setCellValue('A'.($j + 1), $student[$j - 1]['username']);
	    }

	    for($currentColumn = 'B',$i = 0;$i < count($mark);$i++, $currentColumn++) {
	        $objPHPExcel->getActiveSheet()->setCellValue($currentColumn.'1', $mark[$i]['title']);
	        for($j = count($mark[$i]['mark']);$j > 0;$j--) {
	            $objPHPExcel->getActiveSheet()->setCellValue($currentColumn.''.($j + 1), $mark[$i]['mark'][$j - 1]['mark']);
	        }
	    }

	    ob_end_clean();  //清空缓存 
	         
	    header("Pragma: public");
	    header("Expires: 0");

	    header("Cache-Control:must-revalidate,post-check=0,pre-check=0");
	    header("Content-Type:application/force-download");
	    header("Content-Type:application/vnd.ms-execl");
	    header("Content-Type:application/octet-stream");
	    header("Content-Type:application/download");      
	    header('Content-Disposition:attachment;filename='.$fileName.'.xls');//设置文件的名称
	    header("Content-Transfer-Encoding:binary");

	    $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
	    $objWriter->save('php://output');          
	}
 ?>