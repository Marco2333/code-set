<?php 
	$objDrawing = new \PHPExcel_Worksheet_Drawing();
	$objDrawing->setName('Logo');
	$objDrawing->setDescription('Logo');
	//设置图片路径
	$objDrawing->setPath(SITE_PATH."/Public/admin/admin1.png");
	//设置图片高度
	$objDrawing->setHeight(36);
	//图片所在的单元格
	$objDrawing->setCoordinates("H8");
	//设置偏移
	$objDrawing->setOffsetX(5);
	$objDrawing->setOffsetY(3);
	$objDrawing->setRotation(25);
	$objDrawing->getShadow()->setVisible(true);
	$objDrawing->getShadow()->setDirection(45);
	$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());


 ?>