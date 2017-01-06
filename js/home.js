$(function() {
	var list = $('.load');
		
		var z = new iScroll('first',{});
		function Load() {
			var pageCode = 0;
			$.ajax({
				url:'http://datainfo.duapp.com/shopdata/getGoods.php',
				dataType :'jsonp',
				data:{
					pageCode:pageCode,
					linenumber:10
				},
				success: function(res) {
					console.info(1)
					var str = '';
					for(var i=0;i<res.length;i++) {
						str  += "<div class='mall'><div class='left'>"
								+"<img src='"+res[i].goodsListImg+"' /></div>"
								+"<div class='right'>"	
								+"<p>"+res[i].goodsName+"</p><p>￥:"+res[i].price+"</p><p>"+res[i].discount+"  <button gid='"+res[i].goodsID+"' class='join'>加入购物车</button></p>"					
								+"</div></div>";
					}
					list.before(str)
					z.refresh();
					pageCode++
				}
			})
		}
		Load();
		
		$.ajax({
			url:'http://datainfo.duapp.com/shopdata/getBanner.php',
			type:'get',
			dataType: 'jsonp',
			success: function(res) {
				var swiperSlide = [];
				$.each(res, function(o,vl) {
					var img = JSON.parse(vl.goodsBenUrl);
					var slide = '<div class="swiper-slide"><img src="'+ img[0] +'"></div>';
					swiperSlide.push(slide);
				});
				$('.swiper-wrapper').append(swiperSlide);
				new Swiper('.swiper-container',{
					loop: true,
					autoplay: 3000,
					pagination : '.swiper-pagination',
					effect : 'cube',
					cube: {
					  slideShadows: true,
					  shadow: true,
					  shadowOffset: 100,
					  shadowScale: 0.6
					}
				});
			}
		})
		
	$('article').on('click','.join',function() {
		var user = localStorage.getItem('user')
		if(user){
			var uid = JSON.parse(user).userID;
			var gid = $(this).attr('gid');
			$.ajax({
				type:"get",
				data: {
					'userID': uid,
					'goodsID': gid,
					'number': 1
				},
				url:"http://datainfo.duapp.com/shopdata/updatecar.php",
				success: function(res) {
					if(res){
						console.log('加入购物车成功')
					}else{
						alert('妹成功')
					}
				}
			});
		}else{
			alert('请登录')
		}
	})
})
