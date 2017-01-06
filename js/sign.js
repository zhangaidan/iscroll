$(function() {
	$('#signForm').validate({
		submitHandler: function(){
			$.ajax({
				url: 'http://datainfo.duapp.com/shopdata/userinfo.php',
				data: $('form:eq(1)').serialize(),
				type: 'get',
				data: {
					userID: $('.txt').val(),
					password: $('.pass').val(),
					status: 'login'
				},
				success: function(e) {
					console.info(e);
					if(e==2) { 
						alert('用户名密码不正确');
					} else if(e==0) {
						alert('用户名不存在')
					} else {
						//storage 操作比cookie方便
						localStorage.setItem('user',e);
						window.location = 'index.html#home';
					}
				}
			})
		},
		rules: {
			uName:{
				required:true,
				minlength:6
			},
			uPass:{
				required:true,
				minlength:6
			},
			uCopy: {
				required:true,
				minlength:6,
				equalTo:"#uPass"
			}
		},
		messages: {
			uName:{
				required:'用户名不能为空',
				minlength:'用户名必须输入6位'
			},
			uPass:{
				required:'密码不能为空',
				minlength:'密码必须输入6位'
			},
			uCopy: {
				required:'用户名不能为空',
				minlength:'用户名必须输入6位',
				equalTo:"密码不相同"
			}
		}
	})
})