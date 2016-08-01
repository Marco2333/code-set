$(document).ready(function() {
    $('table').dataTable({
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
        "sPaginationType": "full_numbers", //jquery datatable设置分页的格式，显示出来上一页，下一页和数字
        "aaSorting": [[ 1, "desc" ]], //jquery datatable 设置某一列按什么排序
        "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 0 ] }] ,//jquery datatable取消某一列的排序功能
        "bSort": false  ，//jquery datatable取消全部的排序功能，
        "bPaginate": true, //jquery datatable 是否使用分页功能
        "bProcessing": true, //jquery datatable 显示正在处理的提示的loading
        "iDisplayLength": 20, //jquery datatable默认每页显示多少条数据
        "bFilter": true, //jquery datatable是否使用搜索功能
        "bLengthChange": false, //jquery datatable 是否启用设置每页显示多少条
        "bStateSave": false, //jquery datatable 保存状态到cookie ******很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性设置为true就可避免了
        "searching":true,
        aLengthMenu:[ 20, 50, 75, 100 ],
        "aoColumnDefs":[ 
            {  
                "aTargets":[0],  
                "visible":false  
            },
        ]
    });
});   

    