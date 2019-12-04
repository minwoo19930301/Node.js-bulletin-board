$('#btn_board_new').on('click', function() {
    window.location.replace("/board/register");
});

$('#btn_board_register').on('click', function() {
    $.ajax({
        url:'/board/register/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'board_title':$('#board_title').val(),
        'board_content':$('#board_content').val()  }),
        success:function(data){
            if(data.status == 'OK'){
                alert('저장에 성공');
                window.location.replace("/board/list");
            }else{
                alert('저장에 실패');
            }
        },
        error: function(err){
            alert('지정에 실패, 통신 오류');
        }
    });
});

$('#btn_board_list').on('click', function() {
    window.location.replace("/board/list");
});

$('#btn_board_update').on('click', function() {
    window.location.replace("/board/list");
});

$('#btn_board_delete').on('click', function() {
    window.location.replace("/board/list");
});