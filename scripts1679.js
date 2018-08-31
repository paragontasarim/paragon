var is_touch_device = 'ontouchstart' in document.documentElement;

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}



(function ($) {

    $.fn.isOnScreen = function(y){

        if(y == null || typeof y == 'undefined') y = 1;

        var win = $(window);

        var viewport = {
            top : win.scrollTop()
        };

        viewport.bottom = viewport.top + win.height();

        var height = this.outerHeight();

        if(!height){
            return false;
        }

        var bounds = this.offset();
        bounds.bottom = bounds.top + height;

        var visible = (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));

        if(!visible){
            return false;
        }

        return (viewport.bottom - bounds.top) >= y;

    };

})(jQuery);



function redbtnhover(){
    $('.red-btn').each(function(){
        $(this).hover(function () {
            $(this).children('.hover-bg').css('height', $(this).outerWidth());
        }, function () {
            $(this).children('.hover-bg').css('height', 0);
        });
    })

}


$.fn.setEqualHeight = function() {

    var currentCols = $(this);

    if($(currentCols).length>0) {
        function countH(currentCols) {
            var tallestcolumn = 0;
            currentCols.each(
                function () {
                    $(this).css('height', 'auto');
                    currentHeight = $(this).height();
                    if (currentHeight > tallestcolumn) {
                        tallestcolumn = currentHeight;
                    }
                }
            );
            currentCols.height(tallestcolumn);
        }

        countH(currentCols);
		 setTimeout(function(){countH(currentCols);},100);

        $(window).on('resize', function () {
            setTimeout(function(){countH(currentCols);},300);
        });
		
        $(window).on('load', function () {
            setTimeout(function(){countH(currentCols);},300);
        });		
    }
}; 

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function changeUrlParam (param, value) {
    var currentURL = window.location.href+'&';
    var change = new RegExp('('+param+')=(.*)&', 'g');
    var newURL = currentURL.replace(change, '$1='+value+'&');

    if (getURLParameter(param) !== null){
        try {
            window.history.replaceState('', '', newURL.slice(0, - 1) );
        } catch (e) {
            console.log(e);
        }
    } else {
        var currURL = window.location.href;
        if (currURL.indexOf("?") !== -1){
            window.history.replaceState('', '', currentURL.slice(0, - 1) + '&' + param + '=' + value);
        } else {
            window.history.replaceState('', '', currentURL.slice(0, - 1) + '?' + param + '=' + value);
        }
    }
}


function subMenuPos(){
    $('.submenu').each(function(){
        var currentSubmenu = $(this);
        var submenuParent = $(this).prev('a');
        $(currentSubmenu).css('padding-left', $(submenuParent).position().left);
    });
}


function peoplePopupF(){
    var peopleList = $('.people-list>li a .info');
	
	 $('.modal-link, .people-popup .red-btn3').click(function(){
        var expName = $(this).attr('data-name');
        if(expName){
            $("input[name='PROPERTY[61][0]']").val(expName);
        }
    });
	
	
    if($(peopleList).length>0 || $('.people-popup-link').length>0){

        $(peopleList).setEqualHeight();

        function peoplePopupSize(){
            var siteWidth = $('.site-width').width() +200;
            var windHeight = $(window).height() -60;
            if (viewport().width < 1000 || viewport().height < 780) {
                windHeight += 60
            }
            if (viewport().width < 1600) {
                siteWidth = viewport().width - 100;
            }
            if (viewport().width < 1000) {
                siteWidth = viewport().width;
            }
            if (viewport().width < 650) {
                windHeight = "auto";
                siteWidth = "auto"
                $('.people-popup .content-col .content-col-scroll').mCustomScrollbar("destroy");
            }

            $('.people-popup').css({'width':siteWidth , 'height':windHeight});
			 			
			$('.people-popup .content-col .content-col-scroll').each(function(){
            $(this).mCustomScrollbar({
                callbacks:{
                    whileScrolling:function(){
                        if(this.mcs.topPct <100){
                            $(this).addClass('bottom-shadow top-shadow');
                        }
                        else{
                            $(this).removeClass('bottom-shadow');
                        }
                        if(this.mcs.topPct == 0){
                            $(this).removeClass('top-shadow');
                        }
                    }
                }
            });
        });
		
        }

        peoplePopupSize();

        $(window).resize(function(){
            peoplePopupSize();
        });

        $('.people-list li .people-popup-link, .detail-news-wrap .people-popup-link').fancybox({
            padding:0,
            margin: 0,
            openSpeed: 500,
            closeSpeed: 400,
            wrapCSS: 'people-popup-wrap',
            'scrolling': 'no',
            nextEffect:'fade',
            prevEffect:'fade',
            openEffect : 'fade',
            closeEffect : 'fade'
        });

        var hash = window.location.hash;
        if(hash) {
            $.fancybox(
                hash,
                {
                    padding:0,
                    margin: 0,
                    openSpeed: 500,
                    closeSpeed: 400,
                    wrapCSS: 'people-popup-wrap',
                    'scrolling': 'no',
                    nextEffect:'fade',
                    prevEffect:'fade',
                    openEffect : 'fade',
                    closeEffect : 'fade'
                });
        }



    }
   $('.people-popup .red-btn3').click(function(e){
    /*   $.fancybox.close();*/

	 /* setTimeout(function(){*/
		 $.fancybox.open(
			$("#expert-question"),
			{
			    padding:0,
			    margin: [50, 0, 50, 0],
			    openSpeed: 300,
			    closeSpeed: 300,
			    'scrolling': 'no',
			    wrapCSS: 'form-modal-wrap'
			}
		 );
	/*  }, 700);*/

	  e.preventDefault();


   });
}
function MainTabs() {
    var obj = this;
    this.tabs = $('.news-list-block .js-news-tab a');
    this.panes = $('.news-list-block .js-pane');
    this.setTab = function($tab){
        var id = $tab.attr('href'),
            $curPane = this.panes.filter(id);
        this.tabs.removeClass('current');
        this.panes.removeClass('open');
        $tab.addClass('current');
        $curPane.addClass('open');
    };
    this.init = function(){
        this.setTab(this.tabs.eq(0));
        
        this.tabs.click(obj, function(e){
            var $curTab = $(e.target);
            obj.setTab($curTab);
            e.preventDefault();
        });
    };
    
}
	
	

$(document).ready(function(){
	
	

	

    window.fbAsyncInit = function() {
        FB.init({
            appId      : 162409487434571,
            xfbml      : true,
            version    : 'v2.4'
        });
    };

    function isEmpty( el ){
        return !$.trim(el.html())
    }

    function number_format(str) {
        return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    }

    var mainTabs = new MainTabs();
    mainTabs.init();
    
    function startCount() {
        $('.indicators dt span').each(function () {
            var currentElem = $(this);
            var finishVal = parseInt($(this).text());

            console.log(finishVal);
            $(currentElem).countTo({
                from: 0,
                to: finishVal,
                speed: 500,
                refreshInterval: 1,
                decimals: 0,
                formatter: function (value, options) {
                    return number_format(''+value.toFixed(options.decimals)+'');
                    //return value;
                }
            });

        });
    }


    $('input, textarea').placeholder();

    if(viewport().width>750) {
        subMenuPos();
    }

    $(window).resize(function(){
        if(viewport().width>750) {
            subMenuPos();
        }
    });

    if($('.events-big-slider').length>0){
        if(isEmpty($('.events-slider'))){
            $('.events-big-slider-wrap').hide();
        }
    }


    $('input, select').styler();
	
	
	
	$('.event-scedule-wrap .modal-link').on('click', function(){
		var eventLink = $(this).attr('data-eventlink');
		if(eventLink){
			$('#prop71').val(eventLink);
			}
		});

 
        redbtnhover();
        var mainBranches =$('.main-branches');


    if ($(mainBranches).length > 0) {


        var itemWidth = $('.main-branches .item:first-child').outerWidth();
        var itemHeight = $('.main-branches .item:first-child').outerHeight();
        $('.hover-bg em').css({
            height: itemHeight,
            width: itemWidth,
            'margin-top': -itemHeight / 2,
            'margin-left': -itemWidth / 2
        });

        var bannerPics = $('.banner-pics>li');

        setTimeout(function(){ $(mainBranches).removeClass('no-hover'); }, 2000);

        var eventsSlider = $('.events-slider');

        function mainSlick(){

            $(eventsSlider).slick({
                arrows: true,
                infinite: false,
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 1,
                swipeToSlide: true,
                cssEase: 'ease-in-out',
                draggable: true,
                responsive: [
                    {
                        breakpoint: 1350,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 1100,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 900,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            centerMode: true,
                            variableWidth: true,
                            arrows:false,
                            centerPadding: '0px'
                        }
                    }
                ]
            });

            $('.events-slider .slick-slide').setEqualHeight();
            $('.events-slider .slick-arrow').height($(eventsSlider).height()-36);

            $(window).on('resize', function(){
                $('.events-slider .slick-arrow').height($(eventsSlider).height()-36);
            });

        }


        var hoverBg = $('.main-branches .hover-bg');
        var hoverItems = $('.main-branches .item');
        var hoverFl = 0;

        $('.main-branches').hover(function () {
                $(this).addClass('hovered');
                hoverFl = 1;
            },
            function () {
                $(this).removeClass('hovered');
                hoverFl = 0;
            });


        if ($(mainBranches).hasClass('type3') && viewport().width > 700) {

            $('.hover-bg em').css({
                height: itemHeight + 40,
                width: itemWidth + 40,
                'margin-top': (-itemHeight / 2) - 20,
                'margin-left': (-itemWidth / 2) - 20
            });

            $(hoverItems).hover(function () {
                var hoverID = $(this).index();
				
				$(bannerPics).removeClass('current');
                $(bannerPics[hoverID+1]).addClass('current');
			
                if (hoverFl == 0) {
                    $(hoverBg).addClass('no-transit');
                }
                else {
                    $(hoverBg).removeClass('no-transit');
                }

                $(mainBranches).removeClass (function (index, css) {
                    return (css.match (/(^|\s)hoverId-\S+/g) || []).join(' ');
                });

                $(mainBranches).addClass('hoverId-' + hoverID);
                $(hoverBg).css('left', 33.3 * hoverID + '%');
            },
            function(){
				$(bannerPics).removeClass('current');
                $(bannerPics[0]).addClass('current');
                $(mainBranches).removeClass (function (index, css) {
                    return (css.match (/(^|\s)hoverId-\S+/g) || []).join(' ');
                });
            });
        }


        if (($(mainBranches).hasClass('type4') || $(mainBranches).hasClass('type5')) && viewport().width > 700) {

            $(hoverItems).hover(function () {
                    var hoverID = $(this).index();
					$(bannerPics).removeClass('current');
	                $(bannerPics[hoverID+1]).addClass('current');				
                    $(mainBranches).addClass('hoverId-' + hoverID);
                },
                function(){
					$(bannerPics).removeClass('current');
	                $(bannerPics[0]).addClass('current');
                    $(mainBranches).removeClass (function (index, css) {
                        return (css.match (/(^|\s)hoverId-\S+/g) || []).join(' ');
                    });
                });
        }



        /*
        if ($(mainBranches).hasClass('type4') && viewport().width > 700) {

            $(hoverItems).hover(function () {
                var hoverID = $(this).index();
                var topPos = 0;
                if (hoverID > 1) {
                    var topPos = 50;
                }
                var leftPos = hoverID % 2;
                if (hoverFl == 0) {
                    $(hoverBg).addClass('no-transit');
                }
                else {
                    $(hoverBg).removeClass('no-transit');
                }
                $(hoverBg).css({'left': 50 * leftPos + '%', 'top': topPos + '%'});
            });
        }



        if ($(mainBranches).hasClass('type5') && viewport().width > 700) {

            var hoverBgLeft = $('.main-branches .hover-bg-left');
            var hoverBgRight = $('.main-branches .hover-bg-right');
            var lastHover = -10;
            var lastTopPos = 0;

            $(hoverItems).hover(function () {
                var hoverID = $(this).index();
                var topPos = 0;

                if (hoverID == 2 || hoverID == 3) {
                    topPos = 1;
                }
                if (hoverID == 4 || hoverID == 5) {
                    topPos = 2;
                }
                var leftPos = hoverID % 2;

                if (hoverFl == 0) {
                    $(hoverBg).addClass('no-transit');
                }
                else {
                    $(hoverBg).removeClass('no-transit');
                }

                if(hoverID%2==0){
                    $(mainBranches).removeClass('right-hover').addClass('left-hover');

                }
                else{
                    $(mainBranches).removeClass('left-hover').addClass('right-hover');
                }

                $(hoverBg).css({'left': 50 * leftPos + '%', 'top': 33.3 * topPos + '%'});

                lastHover = hoverID;
                lastTopPos = topPos;
            });

        }
        */

        mainSlick();


        if(isEmpty($('#soon'))){
            $('#soon').hide();
            $('.events-big-tabs li:first-child').remove();
            $('.events-big-tabs li').addClass('current');
            $('#upcoming').show();
        }
        else{
            $('.event-panes').hide();
            $('.event-panes:first').show();
        }
        $('.events-big-tabs li').click(function () {
            if(!$(this).hasClass('current')) {
                var target = $(this).attr('data-target');
                $('.event-panes').hide();
                $(target).show();
                $(eventsSlider).slick('unslick');
                mainSlick();
                $(eventsSlider).slick('setPosition');
                $(eventsSlider).addClass('on-center animate-in').removeClass('delay');
                $('.events-big-tabs li').removeClass('current');
                $(this).addClass('current');
            }
        });


    }


    var headerSearchField = $('.header-search .search-field');
    $('.header-search .hidden-btn').click(function(){
        $(headerSearchField).fadeIn();
    });

    var windowObj  = $(window);
    var windTop = $(windowObj).scrollTop();
    var headerObj = $('header');
    $(windowObj).scroll(function(){
        windTop = $(windowObj).scrollTop();
        if(windTop>300  && viewport().width>750){
            $(headerObj).addClass('fixed');
        }
        else{
            $(headerObj).removeClass('fixed');
        }
    });



    $(document).on("click touchstart",function (event) {
        if ($(event.target).closest(".header-search .hidden-btn, .header-search .search-field").length) return;
        if($('.header-search .hidden-btn').is(":visible")){
            $('.header-search .search-field').fadeOut();
        }
        event.stopPropagation();
    });




    var timeLine = $('.time-line');
    if($(timeLine).length>0){

        var tallestcolumn = 0;


        var timePanes = $('.time-line-panes > ul > li');
        var timeTabs = $('.time-line li');
        var panesCount = $('.time-line-panes > ul > li').length;


        $('.time-line-panes > ul > li .info').each(function(){
            currentHeight = $(this).outerHeight();
            if (currentHeight > tallestcolumn) {
                tallestcolumn = currentHeight;
            }
        });

        $('.time-line-panes > ul, .time-line-wrap').height(tallestcolumn+20);

        var timeLine = $('.time-line-wrap');

        $(window).resize(function(){
            var tallestcolumn = 0;
            $('.time-line-panes > ul').height('auto');
            $('.time-line-panes > ul > li .info').each(function(){
                currentHeight = $(this).outerHeight();
                if (currentHeight > tallestcolumn) {
                    tallestcolumn = currentHeight;
                }
            });
            $('.time-line-panes > ul').height(tallestcolumn+20);

            if(viewport().width<700){
                $(timeLine).sly(false);
                var timeLinesly = $(timeLine).sly({
                    horizontal: 1,
                    itemNav: 'centered',
                    smart: 1,
                    mouseDragging: 1,
                    touchDragging: 1,
                    speed: 800,
                    elasticBounds: 1,
                    dragHandle: 1,
                    scrollBy: 1,
                    dynamicHandle: 1,
                    startAt: $('.time-line-panes > ul > li.current').index(),
                    activateOn:'click'
                });
            }
            else{
                var timeLinesly = $(timeLine).sly({
                    horizontal: 0,
                    itemNav: 'forceCentered',
                    smart: 1,
                    mouseDragging: 1,
                    touchDragging: 1,
                    speed: 800,
                    elasticBounds: 1,
                    dragHandle: 1,
                    scrollBy: 1,
                    dynamicHandle: 1,
                    startAt: $('.time-line-panes > ul > li.current').index(),
                    activateOn:'click',
                    activateMiddle: true
                });

            }
			$(timeLine).sly('on', 'active', changeSlide);
        });

        if(viewport().width<700){
            var timeLinesly = $(timeLine).sly({
                horizontal: 1,
                itemNav: 'centered',
                smart: 1,
                mouseDragging: 1,
                touchDragging: 1,
                speed: 800,
                elasticBounds: 1,
                dragHandle: 1,
                scrollBy: 0,
                dynamicHandle: 1,
                startAt: 0,
                activateOn:'click'
            });
        }
        else{
            var timeLinesly = $(timeLine).sly({
                horizontal: 0,
                itemNav: 'forceCentered',
                smart: 1,
                mouseDragging: 1,
                touchDragging: 1,
                speed: 800,
                elasticBounds: 1,
                dragHandle: 1,
                scrollBy: 1,
                dynamicHandle: 1,
                startAt: 0,
                activateOn:'click',
                activateMiddle: true
            });
        }


        function changeSlide(){
            var currentItemId = this.rel.activeItem;

            $('.time-line-wrap li').removeClass('prev1 prev2 prev3 next1 next2 next3');

            $(timeTabs[currentItemId-1]).addClass('prev1');
            $(timeTabs[currentItemId-2]).addClass('prev2');
            $(timeTabs[currentItemId-3]).addClass('prev3');
            $(timeTabs[currentItemId+1]).addClass('next1');
            $(timeTabs[currentItemId+2]).addClass('next2');
            $(timeTabs[currentItemId+3]).addClass('next3');


            var currentPane = $('.time-line-panes > ul > li.current');
            $(timePanes[currentItemId]).addClass('current');
            $(currentPane).removeClass('current');
            if(panesCount==currentItemId+1){
                $('.time-line-panes .next').addClass('disabled');
            }
            else{
                $('.time-line-panes .next').removeClass('disabled');
            }

            if(currentItemId == 0){
                $('.time-line-panes .prev').addClass('disabled');
            }
            else{
                $('.time-line-panes .prev').removeClass('disabled');
            }
        }

        $(timeLine).sly('on', 'active', changeSlide);


        $('.equal-height').setEqualHeight();

        $('.time-line a').click(function(e){

            e.preventDefault();
        });


        $('.time-line-panes .prev').click(function(){

            $(timeLine).sly('prev');
        });


        $('.time-line-panes .next').click(function(){

            $(timeLine).sly('next');

        });

    }


    var photoGalllery = $('.photo-gallery');
    if($(photoGalllery).length>0) {
        var photoGallleryFotorama = $(photoGalllery).fotorama({
            fit: 'cover',
            ratio: 850 / 520,
            allowfullscreen: false,
            width: '100%',
            margin: 0,
            arrows: true,
            trackpad: true,
            nav:'none',
            thumbwidth:145,
            thumbheight:90,
            thumbborderwidth:0
        });

        var fotorama = $(photoGallleryFotorama).data('fotorama');

        var thumbs = $('.photo-gallery-wrap .thumbs li');
        var desriptions = $('.captions li');
        $(desriptions[0]).addClass('current');

        $(photoGallleryFotorama).on('fotorama:show', function () {
            $(desriptions).removeClass('current');
            $(thumbs).removeClass('current');
            $(desriptions[fotorama.activeIndex]).addClass('current');
            $(thumbs[fotorama.activeIndex]).addClass('current');
            $(thumbsWrap).sly('activate', fotorama.activeIndex);
        });

        $(thumbs).click(function(){
            var clickedID = $(this).index();
           $(thumbs).removeClass('current');
            $(this).addClass('current');
            fotorama.show(clickedID);
            $(thumbsWrap).sly('activate', clickedID);
        });

        var thumbsWrap = $('.photo-gallery-wrap .thumbs');

        $(thumbsWrap).css('max-height', photoGallleryFotorama.height());

        var thumbsSly = $(thumbsWrap).sly({
            horizontal: 0,
            itemNav: 'basic',
            smart: 1,
            mouseDragging: 1,
            touchDragging: 1,
            speed: 500,
            elasticBounds: 1,
            dragHandle: 1,
            scrollBy: 1,
            dynamicHandle: 1,
            startAt: 0
        });

        if(viewport().width<600){
            $(thumbsWrap).sly(false);
            var thumbsSly = $(thumbsWrap).sly({
                horizontal: 1,
                itemNav: 'basic',
                smart: 1,
                mouseDragging: 1,
                touchDragging: 1,
                speed: 500,
                elasticBounds: 1,
                dragHandle: 1,
                scrollBy: 1,
                dynamicHandle: 1,
                startAt: 0
            });
        }

        $(window).resize(function(){
            $(thumbsWrap).css('max-height', photoGallleryFotorama.height());
            $(thumbsWrap).sly('reload');
        });


        var tallestcolumn = 0;

        $('.photo-gallery-wrap .captions li').each(function(){
           var currentHeight = $(this).height();
            if (currentHeight > tallestcolumn) {
                tallestcolumn = currentHeight;
            }
        });


        $('.photo-gallery-wrap .captions').height(tallestcolumn);


    }





    var contactMap = $('.contacts-map');
    if($(contactMap).length>0){
        var myMap;

        var dataPoint = $(contactMap).attr('data-point').split(',');
        var dataName = $(contactMap).attr('data-name');
        var dataText = $(contactMap).attr('data-text');

        function yamapInit() {
            var myCollection = new ymaps.GeoObjectCollection();
            myMap = new ymaps.Map("map-block", {
                center: dataPoint,
                zoom: 13,
                controls: ["zoomControl", "typeSelector"]
            });
            myMap.behaviors.disable("scrollZoom");
            mark1 = new ymaps.Placemark(dataPoint,
                {
                    balloonContentHeader: dataName,
                    balloonContent: dataText
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: '/bitrix/templates/main/img/balloon@2x.png',
                    iconImageSize: [60, 70],
                    iconImageOffset: [0, -70]
                }
            );
            myMap.geoObjects.add(mark1);
            myMap.setCenter(dataPoint, 16);
            var currentPixelCenter = myMap.getGlobalPixelCenter(), offset = [300, 0];

            if(viewport().width>750){
                myMap.setGlobalPixelCenter([currentPixelCenter[0] + offset[0], currentPixelCenter[1] + offset[1]]);
            }

        }
        ymaps.ready(yamapInit);

    }


    var mainForm = $('.main-form form');

    $(mainForm).each(function(){
       $(this).validate();
    });

    var sceduleScroll = $('.scedule-scroll');
    if($(sceduleScroll).length>0) {
        $(sceduleScroll).mCustomScrollbar({
            callbacks:{
                whileScrolling:function(){
                    if(this.mcs.topPct <100){
                        $(sceduleScroll).addClass('bottom-shadow top-shadow');
                    }
                    else{
                        $(sceduleScroll).removeClass('bottom-shadow');
                    }
                    if(this.mcs.topPct == 0){
                        $(sceduleScroll).removeClass('top-shadow');
                    }
                }
            }
        });
    }

    var eventList = $('.big-event-list>li a');
    if($(eventList).length>0){
        $(eventList).setEqualHeight();
    }


    var benefitsList = $('.solution-benefits > ul > li > div');
    if($(benefitsList).length>0){
        $(benefitsList).setEqualHeight();
    }


    var projectList = $('.big-project-list>li a .info');
    if($(projectList).length>0){
        $(projectList).setEqualHeight();
    }

    var solutionList = $('.big-solution-list>li a .info');
    if($(solutionList).length>0){
        $(solutionList).setEqualHeight();
    }


    var newsList = $('.news-big-list>li a');
    if($(newsList).length>0){
        $(newsList).setEqualHeight();
    }
    var eventarchiveList = $('.big-event-list-archive>li a .info');
    if($(eventarchiveList).length>0){
        $(eventarchiveList).setEqualHeight();
    }

    $('body').on('click', '.adaptive-filers-btn', function(){
        var hideText = $(this).attr('data-hide');
        var showText = $(this).attr('data-show');
        if($(this).hasClass('opened')){
            $(this).children('span').text(showText);
        }
        else{
            $(this).children('span').text(hideText);
        }
        $(this).toggleClass('opened');
        $('.right-filter-col').slideToggle();
    });



	peoplePopupF();


    if($('.client-review .point-tabs').length>0) {
        $(".client-review .point-tabs").tabs(".review-panes > div", {
            effect: 'fade',
            fadeOutSpeed: "slow",
            rotate: true,
            onBeforeClick: function (event, index) {
                var currentHeight = $('.review-panes > div:eq(' + index + ')').height();
                $('.review-panes').height(currentHeight);
            }
        }).slideshow({
            next: ".government-tabs .next",
            prev: ".government-tabs .prev"
        });
    }


    $('.modal-link').fancybox({
        padding:0,
        margin: [50, 0, 50, 0],
        openSpeed: 500,
        closeSpeed: 500,
        'scrolling': 'no',
        nextEffect:'fade',
        prevEffect:'fade',
        wrapCSS: 'form-modal-wrap'
    });


    $('.fancybox-media').fancybox({
        helpers:{
            overlay: {
                locked:false
            }
        },
        openEffect : 'elastic',
        openSpeed  : 250,
        closeEffect : 'elastic',
        closeSpeed  : 250,
        padding:0,
        margin: 0,
        wrapCSS: 'video-popup',
        maxWidth	: 900,
        maxHeight	: 700
    });

    $('.hidden-compopents-list-link').click(function(e){
        $(this).parent('div').next('.hidden-compopents-list').slideDown();
        $(this).parent('div').hide();
    });


    $('.modal-link, .people-popup .red-btn3').click(function(){
        var expName = $(this).attr('data-name');
        if(expName){
            $("input[name='PROPERTY[61][0]']").val(expName);
        }
    });



    if($('.project-solutions-filter').length>0) {

        var projectSectionsLinks = {};
        $('.project-types-filter a').each(function(i) {
            projectSectionsLinks[i] = $(this).attr('href');
        });

        var solutionID = getURLParameter('solution');
        if (solutionID) {
            $('.project-solutions-filter li').removeClass('current');
            if($('.project-solutions-filter').find("a[data-solutionid='" + solutionID + "']").length>0) {
                $('.project-solutions-filter').find("a[data-solutionid='" + solutionID + "']").parent('li').addClass("current");
            }
            else{
                $('.project-solutions-filter li:first-child').addClass('current');
            }

            $('.project-types-filter a').each(function(i) {
                $(this).attr('href', projectSectionsLinks[i] + '?solution=' + solutionID);
            });
        }

        $('body').on('click', '.project-solutions-filter a', function (e) {

            var clicked = $(this);
            $('.project-solutions-filter li').removeClass('current');
            $(clicked).parent('li').addClass("current");
            var solutionId = $(clicked).attr('data-solutionid');
            changeUrlParam('solution', solutionId);

            var sectionId = 0;
            sectionId = $('.project-types-filter .current').attr('data-sectionid');

            $('.project-types-filter a').each(function(i) {
                $(this).attr('href', projectSectionsLinks[i] + '?solution=' + solutionId);
            });


            $.get('ajax/projects.html', {solution: solutionId, section: sectionId}, function (res) {
                $("#ajax-project-wrap").html("");
                $("#ajax-project-wrap").html(res + "");
                var projectList = $('.big-project-list>li a .info');
                if ($(projectList).length > 0) {
                    $(projectList).setEqualHeight();
                }
            });

            e.preventDefault();
        });
    }



    if($('.right-filter-col').length>0) {

        var eventSectionsLinks = {};
        $('.event-types-filter a').each(function(i) {
            eventSectionsLinks[i] = $(this).attr('href');
        });


        var year = getURLParameter('news_year');
            if(year){

                $('.date-filter').find("a[data-year='" + year + "']").parent('li').addClass("current");

                $('.event-types-filter a').each(function(i) {
                    $(this).attr('href', eventSectionsLinks[i] + '?news_year=' + year);
                });
            }
        else{
                $('.date-filter li:first-child').addClass('current');
            }



        $('body').on('click', '.right-filter-col .date-filter a', function (e) {

            var clicked = $(this);
            $('.date-filter li').removeClass('current');
            $(clicked).parent('li').addClass("current");
            var year = $(clicked).attr('data-year');

            changeUrlParam('news_year', year);

            var sectionId = 0;
            sectionId = $('.event-types-filter .current').attr('data-sectionid');

            $('.event-types-filter a').each(function(i) {
                $(this).attr('href', eventSectionsLinks[i] + '?news_year=' + year);
            });

            $.get('ajax/news.html', {news_year: year, section: sectionId}, function (res) {
                $("#ajax-news-wrap").html("");
                $("#ajax-news-wrap").html(res + "");
                var newsList = $('.news-big-list>li a');
                if($(newsList).length>0){
                    $(newsList).setEqualHeight();
                }
            });

            e.preventDefault();
        });
    }


    $(window).load(function(){
    setTimeout(function(){
        $('header, .main-banner, .events-slider, .events-big-slider-wrap, .news-list-block, .events-big-slider-wrap .center, footer, .gray-header, .about-blocks, .animated-block, .project-types-filter, .project-solutions-filter, .big-project-list li, .big-solution-list li, .people-list li, .soon-event, .news-big-list > li, .big-event-list > li, .right-filter-col, .project-top-info, .solution-benefits, .similar-projects, .contacts-list>li, .search-results>li, .main-search, .search-filter, .energybot-banner').each(function(){
            var currentElem = $(this);
            if(!$(currentElem).hasClass('animate-in')) {
                var windHeight = $(window).height();
                var scrollBottom = $(document).height() - $(window).scrollTop() - $(window).height();

                if ($(currentElem).isOnScreen(windHeight * 0.05) || scrollBottom < 100) {
                    $(currentElem).addClass('animate-in');
                }

                $(window).scroll(function () {
                    scrollBottom = $(document).height() - $(window).scrollTop() - $(window).height();

                    if ($(currentElem).isOnScreen(windHeight * 0.05) || scrollBottom < 10) {
                        $(currentElem).addClass('animate-in').removeClass('delay delay1 delay2');
                    }
                });

                $(window).resize(function () {
                    scrollBottom = $(document).height() - $(window).scrollTop() - $(window).height();

                    if ($(currentElem).isOnScreen(windHeight * 0.05) || scrollBottom < 10) {
                        $(currentElem).addClass('animate-in').removeClass('delay delay1 delay2');
                    }
                });

            }
        });

    }, 300);

        var indicatorElem = $('.indicators');
        if($(indicatorElem).length>0) {
            var windHeight = $(window).height();
            var conutFl = 0;
            $(window).scroll(function () {
                scrollBottom = $(document).height() - $(window).scrollTop() - $(window).height();

                if ($(indicatorElem).isOnScreen(windHeight * 0.05) || scrollBottom < 10  ) {
                    if(conutFl==0){startCount(); conutFl = 1;}
                }
            });
        }


    });











    $('.events-slider, .events-big-slider-wrap').each(function(){
        var currentElem = $(this);
        var windHeight = $(window).height();
        var scrollBottom = $(document).height() - $(window).scrollTop() - $(window).height();

        if($(currentElem).isOnScreen(windHeight*0.2) || scrollBottom<100){
            $(currentElem).addClass('on-center');
        }

        $(window).scroll(function(){
            scrollBottom = $(document).height() - $(window).scrollTop() - $(window).height();

            if($(currentElem).isOnScreen(windHeight*0.2)  || scrollBottom<10){
                $(currentElem).addClass('on-center').removeClass('delay');
            }
        });
    });

    if(!is_touch_device){
        var s = skrollr.init({
            forceHeight: false,
            smoothScrolling: false
        });
    }

    var contactList = $('.contacts-list>li');
    if($(contactList).length>0) {
        $(contactList).setEqualHeight();
        $('#map-block').click(function(e) {
            $(this).addClass('active');
        });
    }


		if($('.project-types-filter').length>0){
			var currentTitle = $('.project-types-filter li.current a').attr('data-title');
			$('.gray-header h1').text(currentTitle);
		}
		
		



});
/*Doc ready end*/

function GetYa(){for(var prop in window) if(prop.indexOf('yaCounter')==0) return window[prop];return false;}
function SendAnalyticsGoal(g,p){var ya=GetYa();if(!p) p=null;if(window.ga) ga('send','event',''+g,document.URL);else if(window._gaq) _gaq.push(['_trackEvent',''+g,document.URL]);if(ya) ya.reachGoal(''+g,p);console.log(g);}

function func_replace_seo_attr() {
	$('*[data-innerhtml]').each(function() {
		$(this).html(func_htmlspecialchars_decode($(this).attr('data-innerhtml'))).removeAttr('data-innerhtml');
	});
	$('a[data-href]').each(function() {
		$(this).attr('href', $(this).attr('data-href')).removeAttr('data-href');
	});
}

function func_htmlspecialchars_decode(string) {
	return string.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/'/g, '\'');
}

setInterval(function() {
	func_replace_seo_attr();
}, 500);