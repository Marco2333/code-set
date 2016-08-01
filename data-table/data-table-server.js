$(document).ready(function() {
    var dataTableOut = $('table').dataTable( {
        language: {
           "sProcessing" : "正在获取数据，请稍后...", 
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "searching":true,
        aLengthMenu:[ 20, 50, 75, 100 ],
        "bProcessing": true,
        "bServerSide": true,
        "sPaginationType": "full_numbers",
        //使用post方式
        "fnServerData": retrieveData,
        "sAjaxSource": "/retire/index.php/Home/Index/getRetireInfo",
        // "oLanguage": {
        //     "sUrl": "cn.txt"
        // },
        // "aoColumnDefs":[ 
        //     {  
        //         "aTargets":[0],  
        //         "visible":false  
        //     },
        // ],
        "aoColumns": [
             {"mDataProp":"id"},
             {"mDataProp":"employee_id"},
             {"mDataProp":"name"},
             {"mDataProp":"gender"},
             {"mDataProp":"birth_date"},
             {"mDataProp":"work_date"},
             {"mDataProp":"nation"},
             {"mDataProp":"positional_title"},
             {"mDataProp":"education_background"},
             {"mDataProp":"politics_status"},
             {"mDataProp":"homephone"},
             {"mDataProp":"mobilephone"},
             {"mDataProp":"rank"},
             {"mDataProp":"identity_card_number"},
             {"mDataProp":"department"},
             {"mDataProp":"home_address"},
             {"mDataProp":"status"},
             {"mDataProp":"native_place"},
             {"mDataProp":"retire_time"},
             {"mDataProp":"physical_condition"},
             {"mDataProp":"tips1"},
             {"mDataProp":"tips2"},
             {"mDataProp":"tips3"},
             {"mDataProp":"temp"}
        ]//$_GET['sColumns']将接收到aoColumns传递数据
    });  
});

function retrieveData( sSource111,aoData111, fnCallback111) {
    $.ajax({
        url : sSource111,//这个就是请求地址对应sAjaxSource
        data : {"aoData":JSON.stringify(aoData111)},//这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
        type : 'post',
        dataType : 'json',
        async : false,
        success : function(result) {
            fnCallback111(result);//把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
            if(userType != '3'){
                var trList = $(".table tbody tr");
                var employee_id,id;     
                $(".table thead tr").children().eq(0).addClass('none');      
                trList.each(function(){  
                    employee_id = $(this).children().eq(1).text();
                    id = $(this).children().eq(0).addClass('none').text();
                    $htmlString = "&nbsp;<a class='modify-button' data-row-id="+id+"'><i class='fa fa-pencil-square-o'></i></a>" + "<a class='none modify-submit-button' data-row-id="+id+"'><i class='fa fa-check'></i></a>" + "&nbsp;&nbsp;<a class=' none modify-cancel-button' data-row-id='"+id+"'><i class='fa fa-adjust'></i></a>" + "&nbsp;&nbsp;<a class='deleterow-button' data-row-id="+id+"'><i class='fa fa-trash-o'></i></a>" + "&nbsp;&nbsp;&nbsp;<a class='move-up-button' data-row-id="+id+"><i class='fa fa-hand-o-up'></i></a>"+ "&nbsp;&nbsp;&nbsp;<a class='move-down-button' data-row-id="+id+"><i class='fa fa-hand-o-down'></i></a>" + "&nbsp;&nbsp;&nbsp;<a class='move-out-button' data-row-id="+id+"><i class='fa fa-hand-o-right'></i></a>";
                    $(this).children().last().html($htmlString);
                });
           
            }      

        },
        error : function(msg) {
        }
    });
}