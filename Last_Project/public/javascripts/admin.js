$('#btn_board_change').on('click', function() {
    window.location.replace("/board/register");
});


$('#user_list').on('click', function() {
    window.location.replace("/admin");
});

$('#user_update').on('click', function() {
    if($('#user_email').val().match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i) == null){
        alert('이메일 형식 잘못됨.');
        return;
    }
    $.ajax({
        url:'/update/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'user_uid':$('#user_uid').val(),
        'login_id':$('#login_id').val(),
        'login_pwd':$('#login_pwd').val(),
        'user_name':$('#user_name').val(),
        'user_email':$('#user_email').val(),
              }),
        success:function(data) {
            if(data.status == 'OK') {
                alert('수정 성공');
                window.location.replace('/admin');
            } else {
                alert('수정사항이 없습니다.');    
            }
        },
        error:function(err) {
            alert('수정 실패, 다시 시도');
        }
    });
});

$('#user_delete').on('click', function() {
    $.ajax({
        url:'/update/delete',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'user_uid':$('#user_uid').val()}),
        success:function(data) {
            if(data.status == 'OK') {
                alert('삭제 완료');
                window.location.replace('/admin');
            } else {
                alert('삭제할 수 없습니다.');    
            }
        },
        error:function(err) {
            alert('삭제 실패, 다시 시도');
        }
    });
});
