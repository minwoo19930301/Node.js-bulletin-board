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
                alert('저장 성공');
                window.location.replace("/board/list");
            }else{
                alert('저장 실패');
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
    $.ajax({
        url:'/board/update/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'board_title':$('#board_title').val(),
                             'board_content':$('#board_content').val(),
                             'bid':$('#bid').val()}),
        success:function(data) {
            if(data.status == 'OK') {
                alert('수정 성공');
                window.location.replace('/board/list');
            } else {
                alert('수정사항이 없습니다.');    
            }
        },
        error:function(err) {
            alert('수정 실패, 다시 시도');
        }
    });
});

$('#btn_board_delete').on('click', function() {
    $.ajax({
        url:'/board/update/delete',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'board_title':$('#board_title').val(),
                             'board_content':$('#board_content').val(),
                             'bid':$('#bid').val()}),
        success:function(data) {
            if(data.status == 'OK') {
                alert('삭제 완료');
                window.location.replace('/board/list');
            } else {
                alert('삭제할 수 없습니다.');    
            }
        },
        error:function(err) {
            alert('삭제 실패, 다시 시도');
        }
    });
});
