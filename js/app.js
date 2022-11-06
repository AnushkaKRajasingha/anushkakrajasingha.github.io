var local_cache = [];

function loadmore_portf(){
	$.getJSON( "../js/data/portfolio.json", function( data ) {
		var items = [];
		$counter = 0;
		$.each( data, function( key, val ) {
			if(key < $('#data-load-count').val()) return;

			$image = val.image != "" ? "../"+val.image : "https://image.thum.io/get/width/350/"+val.site;
			items.push( "<div class='box'><div class=\"image\"> <img src=\""+ $image + "\" alt=\"\" /></div>" );
			items.push( " <div class=\"content\">\n" +
				"                            <h3>"+val.title+"</h3>\n" +
				"                            <p>"+val.desc+"</p>\n" +
				"                            <a target='_blank' href=\""+val.site+"\" class=\"btn\">View Site</a>\n" +
				"                        </div></div>" );
			$('#data-load-count').val(key + 1);
			if($counter == $('#data-load-step').val()){ return false;}
			$counter++;

		});

		$(items.join( "" )).insertBefore( "#more-btn-cnt" );
	});
}

function insertTestimonialItem(data){
	var items = [];
	$counter = 0;
	$.each( data, function( key, val ) {
		if(key < $('#data-load-count').val()) return;

		$image = val.tm_image != "" ? "../images/clients/"+val.tm_image : "../images/clients/avatar.png";

		$animateddirection = (key % 2 == 1) ?"animate__backInLeft" : "animate__backInRight";
		$clienttitle = val.tm_client_title == undefined ? "Upwork client" :  val.tm_client_title;

		items.push("<div class=\"tm-item animate__animated "+$animateddirection+"\">\n" +
			"<img alt=\"Client Name\" class=\"tm-image\" src=\""+$image+"\" />\n" +
			"<div class=\"tm\">\n" +
			"<h4 class=\"tm-title\">"+val.tm_title+"</h4>\n" +
			"<p class=\"tm-word\">\n" +val.tm_word+
			"</p>\n" +
			"<div class=\"tm-client\">\n" +
			"<span class=\"singature\">"+val.tm_client+"</span>\n" +
			"<span class=\"name\">"+val.tm_client+"</span>\n" +
			"<span class=\"title\">"+$clienttitle+"</span>\n" +
			"</div>\n" +
			"</div>\n" +
			"</div>");

		$('#data-load-count').val(key + 1);
		if($counter == $('#data-load-step').val()){ return false;}
		$counter++;

	});
	$(items.join( "" )).insertBefore( "#more-btn-cnt" );
}

async function loadmore_testimonials(){
	if(local_cache['data'] == undefined)
		var resulr = await $.getJSON( "../js/data/testimonials.json", function( data ) {
			data.sort(function(a,b){
				//if(a['tm_word'].split(' ').length > 5 && b['tm_word'].split(' ').length > 5)
				return b['tm_word'].length - a['tm_word'].length;
				//return b['tm_word'].length - a['tm_word'].length;
			})
			local_cache['data'] = data.filter(function(item){
				return item['tm_word'].split(' ').length > 5;
			});
		});
	insertTestimonialItem(local_cache['data'])
}

(function($, document, window){

	function infocontent(param)
	{
		var contentViewTop = $(window).scrollTop();
		var contentViewBottom = contentViewTop + $(window).height();

		var scrolltop = $(param).offset().top;
		var elementBottom = scrolltop + $(param).height();

		return ((elementBottom <= contentViewBottom) && (scrolltop >= contentViewTop));
	}
	
	$(document).ready(function(){

		var canvas = document.getElementById("stars");
		var parent = document.getElementsByClassName("site-content");
		canvas.width = parent[0].offsetWidth;
		canvas.height = parent[0].offsetHeight + 200;

		function setCountDown(){

            // set the date we're counting down to
            var target_date = new Date($(".counter-wrap").data("date-target")).getTime();
             
            // variables for time units
            var days, hours, minutes, seconds;
             
            // update the tag with id "countdown" every 1 second
            setInterval(function () {
             
                // find the amount of "seconds" between now and target
                var current_date = new Date().getTime();
                var seconds_left = (target_date - current_date) / 1000;
             	
             	if(current_date < target_date ){
	                // do some time calculations
	                days = ( parseInt(seconds_left / 86400) < 10 ) ? "0"+ parseInt(seconds_left / 86400) : parseInt(seconds_left / 86400);
	                seconds_left = seconds_left % 86400;
	                 
	                hours = (parseInt(seconds_left / 3600) < 10)? "0"+ parseInt(seconds_left / 86400) : parseInt(seconds_left / 86400);
	                seconds_left = seconds_left % 3600;
	                 
	                minutes = (parseInt(seconds_left / 60)<10)?"0"+parseInt(seconds_left / 60):parseInt(seconds_left / 60);
	                seconds = (parseInt(seconds_left % 60)<10)?"0"+parseInt(seconds_left % 60):parseInt(seconds_left % 60);
	            }else{
	            	days = '00';
					hours = '00';
					minutes = '00';
					seconds = '00';
	            }
                // format countdown string + set tag value

                $(".days .number").html(days);
                $(".hours .number").html(hours);
                $(".minutes .number").html(minutes);
                $(".seconds .number").html(seconds);
             
            }, 1000);

		}

		setCountDown();

		new WOW().init();

		$('.site-footer').load('partials/footer.html');
		$('.site-footer-subpage').load('../partials/footer.html');
		$('.site-header').load('partials/subpage-header.html');
		$('.site-header-subpage').load('../partials/subpage-header.html');
		setTimeout(function(){jQuery('.section-title').addClass(' animate__animated animate__rubberBand')},1000);

		$('#load-more').click();

		$(window).scroll(function(){
			if (infocontent($('#load-more'))){
				$('#load-more').click();
			}
		})

	});

	$(window).load(function(){

	});



})(jQuery, document, window);



