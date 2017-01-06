$(function(){
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		dataType: 'jsonp',
		data: {
			'userID': 'admin123'
		},
		success: function(res){
			console.log(res)
			if(res == 0){
				var str = '<div><p>您的购车空空如也</p><img src="images/1.jpg"><button class="main">去瞅瞅吧</button></div>'
				$('.shopping').html(str)
			}else{
				var arr = [];
				$.each(res, function(o,vl) {
					var list = '<div class="addCar"><p>'+ vl.goodsName +'</p><img src="'+ vl.goodsListImg +'"><button>结算</button><button>删除</button><div>'
					arr.push(list)
				});
				$('.shopping').append(arr);
			}
		}
	});
})