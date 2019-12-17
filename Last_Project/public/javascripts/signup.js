var isCheckedId = false;


$(function(){
    $('#login_pwd').keyup(function(){
      $('#message').html('');
    });

    $('#confirm_pwd').keyup(function(){

        if($('#login_pwd').val() != $('#confirm_pwd').val()){
          $('#message').html('비밀번호 일치하지 않음');
          
        } else{
          $('#message').html('비밀번호 일치함');
        }

    });
});

$('#login_id').change(function(){
    if(isCheckedId) {
        isCheckedId = false;
    }
    console.log($('#login_id').val());
});

$('#btn_check_id').on('click', function() {
    
    if($('#login_id').val().length < 5) {
        alert('5자 이상');
    } else {
        $.ajax({
            url:'/login/checkid?login_id='+$('#login_id').val(),
            method:'GET',
            success:function(data) {
                if(data == 'OK') {
                    isCheckedId = true;
                    $('#message').html('id 사용 가능');
                } else if(data == 'DUPLICATED') {
                    isCheckedId = false;
                    $('#message').html('id 사용 불가');    
                } else {
                    isCheckedId = false;
                    $('#message').text('error 발생, 재시도..');
                }
            },
            error:function(err) {
                isCheckedId = false;
                $('#message').text('error 발생, 재시도..');
            }
        });
    }
});

$('#btn_signup').on('click', function() {

    if(!isCheckedId) {
        alert('ID 체크해~');
        return;
    }
    if($('#user_name').val().length < 3) {
        alert('이름이 짧아~');
        return;
    }
    if($('#login_pwd').val() != $('#confirm_pwd').val() ) {
        alert('비밀번호 달라~');
        return;
    }
    if($('#email').val().match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i) == null){
        alert('이메일 형식 잘못됨.');
        return;
    }
    $.ajax({
        url:'/login/create',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({
            'user_name':$('#user_name').val(),
            'login_id':$('#login_id').val(),
            'login_pwd':$('#login_pwd').val(),
            'email':$('#email').val()
        }),
        success:function(data) {
            if(data.status == 'OK') {
                window.location.replace('/board/list');
            } else {
                $('#message').text('error 발생, 재시도..');    
            }
            
        },
        error:function(err) {
            console.log(err);
            $('#message').text('error 발생, 재시도..');
        }
    });
    
});