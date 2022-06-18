//Thư viện WOW: khởi tạo
new WOW().init();

//Thư viện Swiper
		var swiper = new Swiper('.swiper-container', {
			centeredSlides: true,
      		navigation: {
	       	 	nextEl: '.swiper-button-next',
	       	 	prevEl: '.swiper-button-prev',
     	 	},
     	 	pagination: {
        		el: '.swiper-pagination',
				//để click vào các dấu tròn được
        		clickable:true,
      		},	
    	});

		//Thư viện mCustomScrollbar
		$('#vehicle-list').mCustomScrollbar({
			theme:'dark'
		});
		//Khi click vào nút nào đó thì thanh scroll tại nơi có id=vehicle-list, sẽ di chuyển xuống chỗ có giá trị value do ta truyền vào
		function move(value){
			$('#vehicle-list').mCustomScrollbar("scrollTo",value,{
				//xét animation chạy
				scrollEasing:'easeOut'
			})
		}
		//Gọi tất cả các id ra. Khi click vào đó thì nó sẽ so sánh id của thẻ a đó có trùng với "cars-nav" hay không. 
		// Nếu có thì thanh scroll sẽ chạy xuống ngay chỗ có id=cars
		$('.vehicle-nav ul li a').click(function(){
			if($(this).attr('id')==="cars-nav"){
				move("#cars");
			}		
		})
		
		//Function ẩn hiện class active khi click trên navbar
		var count ="";
		// Khi thẻ a trong id=navbar được click thì thực hiện function
		$('#navbar > a').click(function(){
			//Nếu lần đầu tiên vào web và ấn
			if(count === ""){
				//gán id của cái mình nhấn vào biến count
				count = $(this).attr('id');
				//thêm class active vào cái mình nhấn
				$(this).addClass('active');
				//khi id của nút click vào bằng với “vehicles-link” thì remove “hide-vehicle”. Vehicle list (popup) sẽ hiện ra
				if(count === "vehicles-link"){
					$('#vehicles').removeClass('hide-vehicle');
					//khi popup vehicles xuất hiện thì cho hiệu ứng ở 2 thẻ có class và id bên dưới. 
					$('.vehicle-nav').addClass('fadeInDown')
					$('#vehicle-list').addClass('fadeInUp')
				}
			}
			// Nếu những lần sau nhấn
			else{
				//nếu đã click 1 lần mà lại click một lần nữa thì tiến hành remove class active đi, đồng thời trả biến count về rỗng
				if(count === $(this).attr('id')){
					$(this).removeClass('active');
					count = "";
					$('.vehicle-nav').addClass('fadeOutUp');
					$('#vehicle-list').addClass('fadeOutDown')
					setTimeout(function(){
						//Nhấn tiếp nút dropdown tại Vehicles một lần nữa thì sẽ đóng popup vehicle list lại: add vô class “hide-vehicle”
						$('#vehicles').addClass('hide-vehicle');	
						$('.vehicle-nav').removeClass('fadeOutUp');
						$('#vehicle-list').removeClass('fadeOutDown')
					},300)		
				}
				// nếu nhấn sang nút khác (có id khác) 
				else{
					//remove hết class active. 
					$('#navbar > a').removeClass('active');
					//add class ative vào cái nút hiện tại
					$(this).addClass('active');
					// gán id của nút hiện tại vào biến count
					count = $(this).attr('id');
					//khi click sang nút mới (ko phải là vehicles-link) thì ẩn popup đi
					if(count != "vehicles-link"){
						//khi popup ẩn đi thì cũng cần có hiệu ứng
						//Phải để code hiệu ứng nằm trên code ẩn mới thấy được hiệu ứng
						$('.vehicle-nav').addClass('fadeOutUp');
						$('#vehicle-list').addClass('fadeOutDown')
						//do hiệu ứng cần thời gian thực hiện nên ở giữa phải setTimeout (lệnh delay 300ms rồi mới thực hiện lệnh bên trong – tức là lệnh ẩn popup)
						setTimeout(function(){
							$('#vehicles').addClass('hide-vehicle');
							$('.vehicle-nav').removeClass('fadeOutUp');
							$('#vehicle-list').removeClass('fadeOutDown')
						},300)							
					}
					// Nếu từ nút khác mà click vehicles0-link lại lần nữa
					else{
						
						$('#vehicles').removeClass('hide-vehicle');
						$('.vehicle-nav').addClass('fadeInDown')
						$('#vehicle-list').addClass('fadeInUp')
					}
				}
			}
		})
		//HIỆU ỨNG KHI CLICK CLOSE thì cũng ẩn popup
		$('#vehicle-close').click(function(){
			$('.vehicle-nav').addClass('fadeOutUp');
			$('#vehicle-list').addClass('fadeOutDown');
			setTimeout(function(){
				$('#vehicles').addClass('hide-vehicle');
				$('.vehicle-nav').removeClass('fadeOutUp');
				$('#vehicle-list').removeClass('fadeOutDown');
			},300)
			$('#navbar a').removeClass('active');
			//vì lúc này biến count vẫn bằng id của vehicles nên khi click lại lần nữa thì popup ko xuất hiện. Phải click lần 2 nó mới xuất hiện. Vậy nên phải trả biến count về bằng rỗng
			count ="";
		})
		// Add hiệu ứng xuất hiện cho từng chiếc xe trong popup. 
		$('.vehicle-product').addClass('animated fadeInUp');

// OUR VEHICLES CAROUSEL BT
        // Chức năng di chuyển class active
        // Khi click những thẻ li bên trong class carousel-indicators-config thì sẽ thực hiện chức năng
		$('.carousel-indicators-config li').click(function(){
			//xóa bỏ hết class active đang có ở các thẻ li
			$('.carousel-indicators-config li').removeClass('active');
			// add class active vào cái đang trỏ tới
			$(this).addClass('active');
		})

// Tại màn hình xs, click vào mũi tên của indicator-header thì hiện ra danh sách dropdown
		//Click vào class="indicators-xs-header" thì thực hiện
		$('.indicators-xs-header').click(function(){
			//cho ol chạy lên xuống bằng hàm slideToggle
			$('.carousel-indicatiors-xs ol').slideToggle();
			// Cho mũi tên xoay lên xuống
			//nếu mũi tên đã có class rotate thì xóa class để mũi tên quay về vị trí cũ. Class="transform-rotate" được định nghĩa bên _our-vehicles.scss
			if($('.indicators-xs-header i').hasClass('transform-rotate')){
				$('.indicators-xs-header i').removeClass('transform-rotate')
			}
			//ngược lại nếu thẻ i(mũi tên) chưa có rotate thì add class vào để rotate
			else{
				$('.indicators-xs-header i').addClass('transform-rotate')
			}
			
		})

// Chức năng: Tại màn hình xs, xác định nút nào được click thì hình nào được chạy tới
		// Click vào li
		$('.carousel-indicatiors-xs ol li').click(function(){
			//thì nội dung của thẻ span ở trên header sẽ được thay bằng nội dung của nơi đang trỏ chuột
			$('.indicators-title span').html($(this).html());
			//sau đó, thẻ ol sẽ bị cuốn lên: dùng hàm slideUP
			$('.carousel-indicatiors-xs ol').slideUp();
		})

	// Chức năng: di chuyển thẻ active trên indicator-header khi click các nút prev/next của BT	
		// count = 0 đến 4 tương ứng với hình số 1 đến 5. Chỉnh cho nút prev
		var count= 0;
		$('.carousel-control-prev').click(function(){
			//khi nhấn li thì bỏ thẻ active ra
			$('.carousel-indicators-config li').removeClass('active');
			//nếu count = 0 thì cho lặp lại hình thứ 5 (vị trí có count =4)
			if(count ==0){
				count= 4;
			}
			//ngược lại thì cho lùi hình
			else{
				count--;
			}
			$('.carousel-indicators-config li').each(function(i){
				//nếu li nào đang trùng với hình thì add class active vào
				if(i == count){
					$(this).addClass('active');
					//ở màn hình nhỏ thì cũng đổi tên của header (lấy ra thẻ span để đổi)
					$('.indicators-title span').html($(this).html());
				}
			})
		})
		//Tương tự với nút next
		$('.carousel-control-next').click(function(){
			$('.carousel-indicators-config li').removeClass('active');
			//nếu là hình cuối thì cho quay ngược lại hình số 0
			if(count ==4 ){
				count= 0;
			}
			//nếu chưa là hình cuối thì cho sang hình tiếp
			else{
				count++;
			}
			$('.carousel-indicators-config li').each(function(i){
				if(i == count){
					$(this).addClass('active');
					//ở màn hình nhỏ thì cũng đổi tên của header (lấy ra thẻ span để đổi)
					$('.indicators-title span').html($(this).html());
				}
			})
		})

//BACK TO TOP
		$('.back-to-top').click(function(){
			//toàn bộ trang html sẽ có hiệu ứng scrollTop trong 1000ms
			$('body,html').animate({scrollTop:0},1000);
		})

// Chức năng collapse		
		function collapse(){
			//lấy chiều rộng của màn hình và gán cho biến width
			var width = $(window).width();
			console.log(width);
			//nếu chiều rộng màn hình >=750px
			if(width >= 750){
				//remove class "collapse" ra khỏi class "collapse-ul"
				$('.collapse-ul').removeClass('collapse');
			}
			//nếu chiều rộng màn hình < 750px
			if(width<750){
				//add class "collapse" vào thì các ul sẽ bị ẩn
				$('.collapse-ul').addClass('collapse');
			}
		}
		// Khi kích thước màn hình thay đổi thì thực hiện: hàm collapse
		$(window).resize(function(){
			collapse();
		})
		//KHi trang web load xong thì mới thực hiện function collapse
		//Tránh trường hợp vừa mới mở điện thoại ra, chưa resize thì nó vẫn đo kích thước để tiến hành collapse
		$(document).ready(function(){
			collapse();
		})