$(document).ready(function(){
	var ph = $(window).height() - 80;
	$(".page-content").css("height",ph);
	$(".nav-list-item a").click(function() {
		$(this).parent(".nav-list-item").toggleClass("active");
		$(this).next(".sub-list").toggle(200);
		if($(this).parent(".nav-list-item").hasClass('active')) {
			$(this).parent(".nav-list-item").siblings(".nav-list-item").removeClass("active").children(".sub-list").slideUp(200);
		}
	});

	$(".tab-nav li").click(function() {
		$(".nav-list li").removeClass('active');
	});

	$(".sub-list").on('click','li',function() {
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});

	$(window).resize(function() {
		var ph = $(window).height() - 80;
		$(".page-content").css("height",ph);
	});
});

$(document).ready(function() {
	$(".tab-nav").on('click','li',function() {
		$(".nav-list li").removeClass('active');
	});
	$(".tab-nav").on('dblclick', 'li', function() {
		closeApp($(this).attr('data-id'));
	});
	$(".tab-arrow-l").click(function() {
		var left = parseInt($('.tab-nav > ul').css('left'));
		left = left + 70 > 0 ? 0 : left + 70;
		$(".tab-nav > ul").animate({
			left: left + "px"
		},200);
	});
	$(".tab-arrow-r").click(function() {
		var left = parseInt($('.tab-nav > ul').css('left'));
		left = left - 70 > -$(".tab-nav").width() + 10 ? left - 70 : left;
		$(".tab-nav > ul").animate({
			left: left + "px"
		},100);
	});
	$(window).resize(function() {
		throttle(tabResponse,window);
	});
});

function throttle(fn,context) {
   clearTimeout(fn.tid);
   fn.tid = setTimeout(function() {
       fn.call(context);
   },200);
}

function openapp(url,appid,appname, refesh) {
	var i, len, flag = 0,
		$tabList = $(".tab-nav li");

	$tabList.removeClass("active");

	for(i = 0, len = $tabList.length;i < len;i++) {
		if($($tabList[i]).attr("data-id") == appid) {
			$($tabList[i]).addClass("active");
			flag = 1;
			break;
		}
	}

	if(flag === 0) {
		var parameter = "'"+url+"',"+appid+",'"+appname+"'",
			$tabA = $("<a></a>").attr('data-id',appid).text(appname).prop('href',"javascript:openapp("+parameter+")"),
			$closeS = $("<span class='close-tab'>×</span>"), 
			$tabL = $("<li class='active'></li>");

		$tabL.attr("data-id", appid).append($tabA).append($closeS).appendTo($(".tab-nav ul"));
		$closeS.click(function() {
			closeApp(appid);
		});
	}

	flag = 0;
	$(".page-content iframe").addClass("none").removeClass("current");
	$iframList = $(".page-content iframe");
	for(i = 0, len = $iframList.length;i < len;i++) {
		if($($iframList[i]).attr("data-id") ==  appid) {
			flag = 1;
			$($iframList[i]).addClass("current").removeClass("none");
			break;
		}
	}
	if(flag === 0) {
		$("<iframe class='current'></iframe>").attr("data-id",appid).prop("src",url).appendTo($(".page-content"));
	} else if(refesh) {
		$iframList[i].contentWindow.location.reload(true);
	}
	tabResponse();
}

function closeApp(id) {
	if(id == 0) {
		return;
	}

	var i, len, nextTab, nextFrame,
		$tab = $(".tab-nav li"),
		$iframe = $(".page-content iframe");

	for(i = 0, len = $tab.length;i < len;i++) {
		if($($tab[i]).attr("data-id") == id) {
			if($($tab[i]).hasClass('active')) {
				nextTab = $($tab[i]).next('li');

				if(nextTab.length !== 0) {
					nextTab.addClass('active');
				}
				else {
					$($tab[i]).prev('li').addClass('active');
				}
				$($tab[i]).remove();
				break;
			}
			else {
				$($tab[i]).remove();
			}
		}
	}

	for(i = 0, len = $iframe.length;i < len;i++) {
		if($($iframe[i]).attr("data-id") == id) {
			if($($iframe[i]).hasClass('current')) {
				nextFrame = $($iframe[i]).next('iframe');
				if(nextFrame.length !== 0) {
					nextFrame.removeClass('none').addClass('current');
				}
				else {
					$($iframe[i]).prev('iframe').removeClass('none').addClass('current');
				}
				$($iframe[i]).remove();
				break;
			}
			else {
				$($iframe[i]).remove();
			}
		}
	}
	tabResponse();
}

function tabResponse() {
	var i, len, widthSum = 0, prevWidth = 0,
	$tab = $(".tab-nav li"),
	navLen = $(".tab-nav").width(),
	arrowLen = $(".tab-arrow").width(),
	prevTab = $(".tab-nav li.active").prevAll("li");
	
	for(i = 0, len = $tab.length;i < len;i++) {
		widthSum += $($tab[i]).width() + 10;
	}
	if(widthSum > navLen - 16) {
		$(".tab-nav ul").width(widthSum + 2);
		$(".tab-arrow").removeClass('none');
		for(i = 0, len = prevTab.length;i < len;i++) {
			prevWidth += $(prevTab[i]).width() + 10;
		}

		$(".tab-nav > ul").animate({
			left: - prevWidth * 2 / 3 + "px"
		},200);
	}
	else {
		$(".tab-nav ul").width("auto").css('left',0);
		$(".tab-arrow").addClass('none');
	}
}