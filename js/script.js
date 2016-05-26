(function ($) {
    var _old = $.fn.attr;
    $.fn.attri = function () {
        var a, aLength, attributes, map;
        if (this[0] && arguments.length === 0) {
            map = {};
            attributes = this[0].attributes;
            aLength = attributes.length;
            for (a = 0; a < aLength; a++) {
                map[attributes[a].name.toLowerCase()] = attributes[a].value;
            }
            return map;
        } else {
            return _old.apply(this, arguments);
        }
    }
}(jQuery));

jQuery(document).ready(function ($) {
    /* workshop */

    /* Parse location params on service page */
    if($('body').hasClass('service_page')){
        var query = window.location.hash;
        if(query){
            $('.tab_active').removeClass('tab_active');
            $(query).addClass('tab_active');
            $(query).find('.work_shops').slideDown();

            $('.tab_nav .active').removeClass('active');
            $('.tab_nav').find('li[data-id='+query+']').addClass('active');

            $('.sv_icons .active').removeClass('active');
            $('.sv_icons').find('li[data-id='+query+']').addClass('active');
            //$('body').addClass('red_header_fixed footer_visible');
            $('.next_screen_trigger').addClass('next_screen_ed');
            $('.home_screen').find('.animate_up').css({'opacity': 1});
            $('html, body').animate({
                scrollTop: $(window).height()
            }, 360);

        }
    }
    if($('body').hasClass('press_center_page')){
        var query = window.location.hash;
        if(query){
            $('.tab_active').removeClass('tab_active');
            $(query).addClass('tab_active');
           
            $('.tab_nav .active').removeClass('active');
            $('.tab_nav').find('li[data-id='+query+']').addClass('active');

            $('.stage_screen_btns .active').removeClass('active');
            $('.stage_screen_btns').find('span[data-id='+query+']').find('a').addClass('active');
            //$('body').addClass('red_header_fixed footer_visible');
            $('.next_screen_trigger').addClass('next_screen_ed');
            $('.home_screen').find('.animate_up').css({'opacity': 1});
            $('html, body').animate({
                scrollTop: $(window).height()
            }, 360);
        }
    }
    /* parse location params on service page*/
    /* Sub menu */
    $('.main_nav_list .left li .menu-expand').click(function(){
        var parent = $(this).closest('li');
        $(parent).find('ul').slideToggle();
        $(parent).toggleClass('open');
    });
    $('.main_nav_list .left li a').click(function(){
        var hash      = window.location.hash;
        var path_name = window.location.pathname;
        var current_url = $(this).attr('href');
        var only_url = current_url.split('#');
        console.log(only_url);
        if(path_name.indexOf(only_url[0])>0){ // the same page
            if(only_url.length>1){
                var new_hash = '#'+only_url[1];
                $('.tab_nav .active').removeClass('active');
                $('.tab_nav').find('li[data-id='+new_hash+']').addClass('active');
                $('body').removeClass('main_nav_visible');
                $('html').toggleClass('menu_is_open');

                $('.tabs').find('.tab_active').removeClass('tab_active');
                $(new_hash).addClass('tab_active');

                $('.stage_screen_btns .active').removeClass('active');
                $('.stage_screen_btns').find('span[data-id='+new_hash+']').find('a').addClass('active');
                //$('body').addClass('red_header_fixed footer_visible');

                $('.next_screen_trigger').addClass('next_screen_ed');
                $('.home_screen').find('.animate_up').css({'opacity': 1});
                $('html, body').animate({
                    scrollTop: $(window).height()
                }, 360);
                return false;
            }
        }

    });
    /* Sub menu */
    $(window).load(function () {
        var $body = $('body'),
            $stage_nav_container = $('.stage_nav_container');

        $('.next_screen').hover(function () {
            $('.next_screen_mousewheel').addClass('next_screen_mousewheel_ed');
        }, function () {
            $('.next_screen_mousewheel').removeClass('next_screen_mousewheel_ed');
        });

        $('.logo.animate_left').addClass('animate_lefted');

        $('.fl_btn_box.animate_left').addClass('animate_lefted');

        $('.round_nav.rn_animate_fade').addClass('rn_animate_faded');

        $('.animate_right').addClass('animate_righted');

        //社交图标动画
        $('.social_btns .animate_left').each(function (index) {
            var $this = $(this);
            setTimeout(function () {
                $this.addClass('animate_lefted');
            }, 300 * ($('.social_btns .animate_left').size() - index));
        });

        function animate_home_screen(delay) {
            $('.slide_bg').addClass('slide_bg_ed');

            if (1 == delay) {
                setTimeout(function () {
                    //首屏文字动画
                    $('.home_screen .animate_up').each(function (index) {
                        var $this = $(this);
                        setTimeout(function () {
                            $this.addClass('animate_uped');
                        }, ($('.home_screen').hasClass('stages_home_screen') ? 200 : 600) * index);
                    });

                    setTimeout(function () {
                        $('.slide_animating').removeClass('slide_animating');
                    }, 1500);
                }, 500);
            } else {
                //首屏文字动画
                $('.home_screen .animate_up').each(function (index) {
                    var $this = $(this);
                    setTimeout(function () {
                        $this.addClass('animate_uped');
                    }, ($('.home_screen').hasClass('stages_home_screen') ? 200 : 600) * index);
                });

                setTimeout(function () {
                    $('.slide_animating').removeClass('slide_animating');
                }, 1500);
            }
            //首屏按钮动画
            setTimeout(function () {
                $('.all_view_wrapper').addClass('all_view_wrapper_fadeIn');
            }, 600 * $('.home_screen .animate_up').size());

            $('.next_screen').addClass('next_screen_ed');
        }

        function animate(current_index) {
            if (!$('.slide_animating').length && !$('.screen_slide_animating').length && !$body.hasClass('footer_animating') && !$('.lightbox_visible').length) {
                if (0 == current_index) {
                    $('.nav_container').removeClass('nav_container_visible');
                } else {
                    $('.nav_container').addClass('nav_container_visible');
                }

                if (0 == current_index) {
                    setTimeout(function () {
                        $('.scroll.animate_fade').removeClass('animate_faded');
                    }, 500);


                    setTimeout(function () {
                        animate_home_screen();
                    }, $('.home_screen').hasClass('stages_home_screen') ? 500 : 100);

                    $('body').addClass('home_screen_visible').removeClass('home_screen_invisible');
                } else {
                    setTimeout(function () {
                        $('.scroll.animate_fade').addClass('animate_faded').scrollTop(0);
                    }, 800);


                    setTimeout(function () {
                        $('body').addClass('home_screen_invisible').removeClass('home_screen_visible');
                    }, 1000);
                }

                $('.stage_screen_btns_wrapper span.active').removeClass('active');
                $('.stage_screen_btns_wrapper span').eq(current_index - 1).addClass('active');

                $('body').attr({id: 'screen_visible_' + current_index});

                if (!$stage_nav_container.find('ul.dot_ul li').eq(current_index - 1).hasClass('active')) {
                    $stage_nav_container.find('.active').removeClass('active');
                    $stage_nav_container.find('ul.dot_ul li').eq(current_index - 1).addClass('active');
                    $stage_nav_container.find('ul.text_ul li').eq(current_index - 1).addClass('active');

                    //$('.stage_nav_line_hidden').removeClass('stage_nav_line_hidden');
                    //$stage_nav_container.find('.active').prevAll('li').addClass('stage_nav_line_hidden');
                    //$('.stage_nav_line_hidden').last().removeClass('stage_nav_line_hidden');
                }

                $stage_nav_container.attr({id: 'stage_nav_container_' + current_index});

                if (0 != current_index) {
                    $('.home_screen .animate_up').removeClass('animate_uped');
                    $('.all_view_wrapper').removeClass('all_view_wrapper_fadeIn');

                    if (!$('.next_screen').hasClass('next_screen_footer')) {
                        $('.next_screen').removeClass('next_screen_ed');
                    }

                    setTimeout(function () {
                        $('.slide_bg').removeClass('slide_bg_ed');
                    }, 1500);
                }

                var $slide = $('.slide').eq(current_index),
                    $screen_slide = $('.screen_slide').eq(current_index),
                    $slide_active = $('.slide_active'),
                    $screen_slide_active = $('.screen_slide_active');

                $screen_slide_active.addClass('slide_start');

                $slide.addClass('slide_animating');
                $screen_slide.addClass('screen_slide_animating');

                $slide.find('.big_pic').addClass('big_pic_ed');
                setTimeout(function () {
                    $slide.find('.side_pic').addClass('side_pic_ed');
                    $screen_slide.find('.side_pic').addClass('side_pic_ed');
                }, 200);

                setTimeout(function () {
                    $screen_slide_active.find('.animate_up').each(function (index) {
                        var $this = $(this);
                        setTimeout(function () {
                            $this.removeClass('animate_uped');
                        }, 150 * index);
                    });
                }, 0);

                setTimeout(function () {
                    $screen_slide.find('.animate_up').each(function (index) {
                        var $this = $(this);
                        setTimeout(function () {
                            $this.addClass('animate_uped');
                        }, 300 * index);
                    });
                }, 800);

                setTimeout(function () {
                    if (current_index > $('.screen_slide').index($('.screen_slide_active'))) {
                        $screen_slide_active.find('.screen').addClass('screen_ed_down');
                    } else {
                        $screen_slide_active.find('.screen').removeClass('screen_ed');
                    }

                    $screen_slide.find('.screen').removeClass('screen_ed_down').addClass('screen_ed');

                }, 300);

                $screen_slide_active.find('.side_pic').removeClass('side_pic_ed');

                setTimeout(function () {
                    $screen_slide.find('.screen_tile').addClass('screen_tile_ed');
                }, 900);

                setTimeout(function () {
                    $slide_active.find('.big_pic').removeClass('big_pic_ed');

                    $slide_active.find('.side_pic').removeClass('side_pic_ed');


                    //$('.slide_active').find('.animate_uped').removeClass('animate_uped');

                    $slide_active.removeClass('slide_active');

                    $slide.removeClass('slide_animating').addClass('slide_active');

                    $('.slide_active').prevAll('.slide').find('.big_pic').removeClass('up').addClass('down');

                    $('.slide_active').nextAll('.slide').find('.big_pic').removeClass('down').addClass('up');


                    update_nav_container();
                }, 1100);

                setTimeout(function () {
                    $screen_slide_active.removeClass('slide_start');

                    $screen_slide_active.removeClass('screen_slide_active');
                    $screen_slide.removeClass('screen_slide_animating').addClass('screen_slide_active');

                    $('.screen_slide_active').prevAll('.screen_slide').find('.screen').removeClass('screen_ed').addClass('screen_ed_down');

                    $('.screen_slide_active').nextAll('.screen_slide').find('.screen').removeClass('screen_ed_down').removeClass('screen_ed');

                    $('.screen_slide_active').siblings('.screen_slide').find('.screen_tile').removeClass('screen_tile_ed');
                }, 2000);
            }
        }

        function update_nav_container() {
            var index = $('.slide').index($('.slide_active'));
            if (!$('.nav_container ul li').eq(index).hasClass('active')) {
                $('.nav_container').find('.active').removeClass('active');
                $('.nav_container ul li').eq(index).addClass('active');
            }
        }

        function update_mobile_nav_container() {
            var index = $('.wrapper').data('swipe-index');
            if (0 == index || index == $('.slide').size()) {
                $('.mobile_nav_container').removeClass('mobile_nav_container_visible');
            } else {
                $('.mobile_nav_container').addClass('mobile_nav_container_visible');
            }

            if (!$('.mobile_nav_container ul li').eq(index).hasClass('active')) {
                $('.mobile_nav_container').find('.active').removeClass('active');
                $('.mobile_nav_container ul li').eq(index).addClass('active');
            }
        }

        $('.nav_container a').click(function () {
            var $li = $(this).parent('li'),
                $nav_container = $li.parents('.nav_container'),
                index = $li.index();
            if (!$li.hasClass('active')) {
                $nav_container.find('.active').removeClass('active');
                $li.addClass('active');
                animate(index);
            }

            return false;
        });

        $('.stage_screen_btns_wrapper a').click(function () {
            var $span = $(this).parent('span'),
                index = $span.index() + 1;
            if (!$span.hasClass('active')) {
                animate(index);
            }

            return false;
        });

        $('.stage_nav_a').click(function () {
            var $li = $(this).parent('li'),
                index = $li.index() + 1;
            if (!$li.hasClass('active')) {
                animate(index);
            }

            return false;
        });

        $('.home_screen .stage_screen_btns a').click(function () {
            if (!$('.home_screen .stage_screen_btns').hasClass('stage_screen_btns_trigger')) {
                var $span = $(this).parent('span'),
                    index = $span.index() + 1;
                if ($('.mobile_stages_slider').is(':visible')) {
                    var old = index - 1;
                    index = $wrapper.data('swipe-index');
                    if (index != slide_count) {
                        var index = $wrapper.data('swipe-index');
                        $wrapper.data({'swipe-index': Number(index) + 1});
                        $wrapper.removeAttr('class');
                        $wrapper.addClass('wrapper').addClass('wrapper_' + $wrapper.data('swipe-index'));

                        if (index == slide_count - 1) {
                            $body.addClass('mobile_footer_visible');
                        } else {
                            $body.removeClass('mobile_footer_visible');
                        }
                    }

                    $('body.stages_page .mobile_stage_slide').scrollTop(0);

                    $body.addClass('stages_header_bg');

                    $('.mobile_stages_slider_nav').trigger('click');
                    $('.mobile_stages_slider_nav ul li').eq($(this).parent('span').index() - 1).find('a').addClass('sa').trigger('click');
                } else {
                    if (!$span.hasClass('active')) {
                        $span.siblings('.active').removeClass('active');
                        $span.addClass('active');
                        animate(index);
                    }
                }

                return false;
            }
        });

        $('.nav_container a').click(function () {
            var $li = $(this).parent('li'),
                $nav_container = $li.parents('.nav_container'),
                index = $li.index();
            if (!$li.hasClass('active')) {
                $nav_container.find('.active').removeClass('active');
                $li.addClass('active');
                animate(index);
            }

            return false;
        });

        $('.mobile_nav_container a').bind('click touchstart', function () {
            var $li = $(this).parent('li'),
                $mobile_nav_container = $li.parents('.mobile_nav_container'),
                index = $li.index() + 1;
            if (!$li.hasClass('active')) {
                $mobile_nav_container.find('.active').removeClass('active');
                $li.addClass('active');
                $wrapper.data({'swipe-index': Number(index) - 1});
                $wrapper.removeAttr('class');
                $wrapper.addClass('wrapper').addClass('wrapper_' + $wrapper.data('swipe-index'));
            }

            update_mobile_nav_container();
            return false;
        });

        $('.next_screen').click(function () {
            if ($(this).hasClass('next_screen_trigger')) {
                if (!$(this).parents('.full_screen').hasClass('sec_full_screen')) {
                    $('html, body').animate({
                        scrollTop: $(window).height()
                    }, 360);
                } else {
                    $('html, body').animate({
                        scrollTop: $(window).height() * 2
                    }, 360);
                }
            } else {
                animate(1);
            }

            return false;
        });

        animate_home_screen(1);

        $('.next_screen_footer').click(function () {
            if ($('body').hasClass('footer_visible')) {
                $('.back_top').trigger('click');
            } else {
                $body.addClass('footer_visible');
            }

            return false;
        });

        $body.bind('mousewheel', function (e) {
            if (!$body.hasClass('facilities_landing_page') && !$body.hasClass('facilities_list_pages2')) {
                if ('-1' == e.deltaY) {
                    if ($('.slide_active').next('.slide').length) {
                        animate($('.slide_active').next('.slide').index());
                    } else {
                        if (!$('.slide_animating').length && !$('.screen_slide_animating').length && !$body.hasClass('footer_animating') && !$('.lightbox_visible').length) {
                            $body.addClass('footer_visible');

                            $('.nav_container').removeClass('nav_container_visible');
                        }
                    }
                } else if ('1' == e.deltaY) {
                    if ($body.hasClass('footer_visible')) {
                        $body.removeClass('footer_visible');

                        $body.addClass('footer_animating');
                        setTimeout(function () {
                            $body.removeClass('footer_animating');
                        }, 600);

                        $('.nav_container').addClass('nav_container_visible');

                        $('.slide_active').prevAll('.slide').find('.big_pic').removeClass('up').addClass('down');
                    } else {
                        if ($('.slide_active').prev('.slide').length) {
                            animate($('.slide_active').prev('.slide').index());

                        }
                    }
                }
            }
        });

        $('.scroll').bind('mousewheel', function (e) {
            e.stopPropagation();
        });

        $('.slide').each(function (index) {
            var $mobile_text = $('<div class="mobile_text"><div class="table"><div class="td"></div></div></div>').appendTo($(this));
            var html = $('.screen_slide').eq(index).find('.screen_inner').html();
            if (html) {
                $(html).appendTo($mobile_text.find('.td'));
            }
            html = $('.screen_slide').eq(index).find('.side .td').html();
            if (html) {
                $('<div class="mobile_more">' + html + '</div>').appendTo($mobile_text.find('.td'));
            }
            html = $('.screen_slide').eq(index).find('.screen_tile').clone();
            if (html) {
                $(html).removeClass('screen_tile').addClass('mobile_screen_tile').insertBefore($mobile_text);
            }
        });

        var $wrapper = $('.wrapper'),
            slide_count = $('.slide').size();
        $('.wrapper').data({'swipe-index': 0});

        if ($body.hasClass('stages_page')) {
            $body.swipe({
                swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                    if ('up' == direction && !$('.wrapper').hasClass('wrapper_1')) {
                        var index = $wrapper.data('swipe-index');
                        if (index != slide_count) {
                            var index = $wrapper.data('swipe-index');
                            $wrapper.data({'swipe-index': Number(index) + 1});
                            $wrapper.removeAttr('class');
                            $wrapper.addClass('wrapper').addClass('wrapper_' + $wrapper.data('swipe-index'));

                            if (index == slide_count - 1) {
                                $body.addClass('mobile_footer_visible');
                            } else {
                                $body.removeClass('mobile_footer_visible');
                            }
                        }

                        $('body.stages_page .mobile_stage_slide').scrollTop(0);

                        $body.addClass('stages_header_bg');
                    }

                    if ('down' == direction && $('.wrapper').hasClass('wrapper_1')) {
                        //$body.removeClass('stages_header_bg');
                    }

                    update_mobile_nav_container();
                },
                threshold: 0,
                //fingerReleaseThreshold: 400,
                preventDefaultEvents: false
            });
        } else {
            if (!$body.hasClass('facilities_landing_page') && !$body.hasClass('about_us_page')) {
                $body.swipe({
                    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                        if ('up' == direction) {
                            var index = $wrapper.data('swipe-index');
                            if (index != slide_count) {
                                var index = $wrapper.data('swipe-index');
                                $wrapper.data({'swipe-index': Number(index) + 1});
                                $wrapper.removeAttr('class');
                                $wrapper.addClass('wrapper').addClass('wrapper_' + $wrapper.data('swipe-index'));

                                if (index == slide_count - 1) {
                                    $body.addClass('mobile_footer_visible');
                                } else {
                                    $body.removeClass('mobile_footer_visible');
                                }
                            }
                        }
                        if ('down' == direction) {
                            $body.removeClass('mobile_footer_visible');

                            var index = $wrapper.data('swipe-index');
                            if (0 != index) {
                                $wrapper.data({'swipe-index': Number(index) - 1});
                                $wrapper.removeAttr('class');
                                $wrapper.addClass('wrapper').addClass('wrapper_' + $wrapper.data('swipe-index'));
                            }
                        }
                        update_mobile_nav_container();
                    },
                    threshold: 0,
                    //fingerReleaseThreshold: 200,
                    preventDefaultEvents: $body.hasClass('stage_page') ? false : true
                });
            }
        }

        $('.social_btns').bind('click touchstart', function () {
            $(this).addClass('social_btns_open');
        });

        $('.social_btns a').click(function (e) {
            e.stopPropagation();
        });

        $('.back_top').click(function () {
            if ($(this).hasClass('mobile_back_top')) {
                if ($body.hasClass('stage_page') || $body.hasClass('facilities_landing_page') || $body.hasClass('about_us_page') || $body.hasClass('facilities_list_pages')) {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 600);
                } else {
                    $body.removeClass('stages_header_bg');
                    $body.removeClass('mobile_footer_visible');
                    $('.wrapper').removeAttr('class').addClass('wrapper');
                    $('.wrapper').data({'swipe-index': 0});
                }
                return false;
            } else {
                if ($body.hasClass('not_full_screen_page') || $body.hasClass('facilities_list_pages')) {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 600);
                } else {
                    if ($body.hasClass('facilities_list_pages')) {
                        setTimeout(function () {
                            animate(0);
                        }, 0);
                    } else {
                        $body.removeClass('footer_visible');
                        setTimeout(function () {
                            $('.nav_container ul li').first().find('a').trigger('click');
                            if ($body.hasClass('stages_page')) {
                                animate(0);
                            }
                        }, 100);
                    }
                }
                return false;
            }
        });
    });

    $(document).on('click', '.lightbox_btn', function () {
        var $lightbox = $($(this).attr('href'));
        if (!$lightbox.hasClass('lightbox_visible')) {
            if (!$lightbox.find('iframe').length) {
                if($lightbox.find('#video').length>0){
                    var vid = document.getElementById('video');
                    vid.play();
                    $('html').addClass('video_playing');
                }else{
                    var $iframe = $('<iframe />').prependTo($lightbox),
                        attrs = $lightbox.find('.iframe').attri();
                    $.each(attrs, function (ele, key) {
                        $iframe.attr(ele, key);
                    });
                }

            }
            $('.lightbox_visible').removeClass('lightbox_visible');
            $lightbox.addClass('lightbox_visible');
            $('html').addClass('has_lightbox_visible');
        }
        return false;
    });

    $('.lightbox_close').click(function () {
        $('.lightbox_visible').removeClass('lightbox_visible');
        $('.has_lightbox_visible').removeClass('has_lightbox_visible');
        if($('html').hasClass('video_playing')){
            $('html').removeClass('video_playing');
            var vid = document.getElementById('video');
            vid.pause();
        }
        return false;
    });

    //$('#mobile_wrapper_height').text('@media only screen and (max-width: 1024px) { .wrapper {height: ' + (Number($('.slide').size()) - 1) + '00%;} }');

    function set_slider_status(slider) {
        if (slider.count > 1) {
            $(slider).parent('.stages_slider').find('.slider_status span').text(slider.currentSlide + 1);
        }
    }

    $(window).load(function () {
        $('.stages_slider .flexslider').flexslider({
            animation: 'slide',
            slideshow: false,
            slideshowSpeed: 5000,
            animationSpeed: 800,
            start: function (slider) {
                set_slider_status(slider);
                $('.stages_slider .flex-direction-nav a').click(function (e) {
                    e.stopPropagation();
                });
            },
            after: function (slider) {
                set_slider_status(slider);
            }
        });

        $('.stage_list_slider .flexslider').flexslider({
            animation: 'slide',
            slideshow: false,
            slideshowSpeed: 5000,
            animationSpeed: 1,
            start: function (slider) {
                var timer;

                $('.stage_list_trigger[data-target="' + $(slider).parent('.stage_list_slider').attr('id') + '"]').mouseover(function () {
                    clearTimeout(timer);
                    $(slider).parent('.stage_list_slider').stop().css({opacity: 1}).css({marginLeft: 0});
                });

                $('.stage_list_trigger[data-target="' + $(slider).parent('.stage_list_slider').attr('id') + '"]').mouseleave(function () {
                    timer = setTimeout(function () {
                        $(slider).parent('.stage_list_slider').stop().css({opacity: 0}).css({marginLeft: '-9999px'});
                    }, 1000);
                });

                $('.stage_list_trigger[data-target="' + $(slider).parent('.stage_list_slider').attr('id') + '"]').find('.stage_item_trigger').mouseover(function () {
                    if($.isFunction(slider.flexAnimate)){
                        var index = $(this).index();
                        console.log(index);
                        slider.flexAnimate(index);
                    }
                });
            }
        });

        $('.stage_detail_slider .flexslider').flexslider({
            animation: 'slide',
            slideshow: true,
            slideshowSpeed: 8000,
            animationSpeed: 800
        });

        $('.mobile_stages_slider .flexslider').flexslider({
            animation: 'slide',
            slideshow: false,
            slideshowSpeed: 5000,
            animationSpeed: 400,
            smoothHeight: true,
            touch: true,
            start: function (slider) {
                $('.mobile_stages_slider_nav a').click(function (e) {
                    var $li = $(this).parent('li'),
                        index = $li.index();
                    if (!$li.hasClass('active')) {
                        $('.mobile_stages_slider_nav .active').removeClass('active');
                        $li.addClass('active');
                        slider.flexAnimate(index);
                    }
                    //e.stopPropagation();
                    $('body').toggleClass('mobile_stages_slider_nav_open');
                    return false;
                });

                $('body.stages_page .wrapper_1 .mobile_stage_slide').scrollTop(0);
            },
            after: function (slider) {
                $('body.stages_page .wrapper_1 .mobile_stage_slide').scrollTop(0);
                if (!$('.mobile_stages_slider_nav ul li').eq(slider.currentSlide).hasClass('active')) {
                    $('.mobile_stages_slider_nav .active').removeClass('active');
                    $('.mobile_stages_slider_nav ul li').eq(slider.currentSlide).addClass('active');
                }
            }
        });

        $('.landing_grid_bg_slider .flexslider').flexslider({
            animation: 'fade',
            slideshow: false,
            slideshowSpeed: 8000,
            animationSpeed: 800,
            start: function (slider) {
                $('.landing_grids_inner ul li').hover(function(){
                    var index = $(this).attr('data-id');
                    slider.flexAnimate(parseInt(index));
                }, function(){
                    //slider.flexAnimate(1);
                });
                $('.landing_grids_inner h2, .landing_grids_inner .txt_inner .btn_medium').hover(function(){
                    slider.flexAnimate(1);
                }, function(){
                    var index = $(this).closest('li').attr('data-id');
                    slider.flexAnimate(parseInt(index));
                });
            },
            before: function($slider){
                console.log($slider);
            }
        });

        if(!$('body').hasClass('workshops_page') && !$('body').hasClass('press_center_page')){
            $('.tab_nav a').click(function () {
                if($('body').hasClass('disable_tab')){
                    return true;
                }

                var index = $(this).parent('li').index();
                $('.tab_nav .active').removeClass('active');
                $(this).parent('li').addClass('active');
                $('.tab_active').removeClass('tab_active');
                $('.tab').eq(index).addClass('tab_active');

                $('.tab').eq(index).find('.work_shops').slideDown();

                $('.sv_icons .active').removeClass('active');
                $('.sv_icons ul li').eq(index).addClass('active');


                $('html, body').animate({
                    scrollTop: $(window).height()
                }, 360);
                return false;
            });
        }
        if($('body').hasClass('press_center_page')){
            $('.tab_nav a').click(function () {
                if($('body').hasClass('disable_tab')){
                    return true;
                }
                var index = $(this).parent('li').index();
                $('.tab_nav .active').removeClass('active');
                $(this).parent('li').addClass('active');
                $('.tab_active').removeClass('tab_active');
                $('.tab').eq(index).addClass('tab_active');
                $('.stage_screen_btns_trigger .animate_up .active').removeClass('active');
                $('.stage_screen_btns_trigger .animate_up').eq(index).find('.tab_nav_trigger').addClass('active');
                $('html, body').animate({
                    scrollTop: $(window).height()
                }, 360);
                return false;
            });
        }
        $('.work_shops .flexslider').flexslider({
            animation: 'slide',
            slideshow: false,
            slideshowSpeed: 8000,
            animationSpeed: 800,
            start: function($slider){
                $('.tab_nav a').click(function(){
                    var index = $(this).parent('li').index();
                    $('.tabs').find('.tab_active').removeClass('tab_active');
                    $('.tabs').find('.tab').eq(1).addClass('tab_active');

                    $('.stage_screen_btns_trigger .animate_up .active').removeClass('active');
                    $('.stage_screen_btns_trigger .animate_up').eq(index).find('.tab_nav_trigger').addClass('active');

                    $slider.flexAnimate(index);
                    return false;
                });

                $('#workshop_four_tile').find('.work_shops_tile').click(function(){
                    var index = $(this).index();

                    $('.tabs').find('.tab_active').removeClass('tab_active');
                    $('.tabs').find('.tab').eq(1).addClass('tab_active');
                    $slider.flexAnimate(index);
                })
            },
            before: function($slider){
                $('.tab_nav').find('.active').removeClass('active');
                $('.tab_nav').find('li').eq($slider.animatingTo).addClass('active');
            }
        });

        $('.historical_bg .flexslider').flexslider({
            animation: 'slide',
            slideshow: false,
            slideshowSpeed: 8000,
            animationSpeed: 800,
            smoothHeight: true,
            start: function (slider) {
                $('.hbg_slider_btns ul li').click(function () {
                    var $this = $(this),
                        index = $this.index();
                    if (!$this.hasClass('active')) {
                        $('.hbg_slider_btns .active').removeClass('active');
                        $this.addClass('active');
                        slider.flexAnimate(index);
                    }
                });
            }
        });
    });

    $('.specs').clone().addClass('mobile_specs').insertAfter($('.stage_box'));

    $('.stages_page .footer').clone(true).appendTo($('.mobile_stage_slide'));

    $('.mobile_stages_slider_nav').click(function () {
        $('body').toggleClass('mobile_stages_slider_nav_open');
    });

    $('.stages_page .stages_slider').click(function () {
        window.location = $(this).attr('data-href');
    });

    $('.carousel_slider').owlCarousel({
        items: 5,
        autoplay: true,
        margin: 40,
        nav: true,
        navText: [],
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 2
            },
            960: {
                items: 5
            }
        }
    });

    $('.team_detail').clone().addClass('mobile_team_detail').insertAfter($('.team_detail'));

    $('.team_detail').first().find('.flexslider').flexslider({
        animation: 'fade',
        slideshow: false,
        slideshowSpeed: 8000,
        animationSpeed: 800,
        smoothHeight: true,
        start: function (slider) {
            $('.our_team_list_ul ul li').click(function () {
                var $this = $(this),
                    index = $this.index();
                if (!$this.hasClass('active')) {
                    $('.our_team_list_ul .active').removeClass('active');
                    $this.addClass('active');
                    slider.flexAnimate(index);
                }
            });
        }
    });

    $('.chairman_dream .flexslider').flexslider({
        animation: 'fade',
        slideshow: true,
        slideshowSpeed: 10000,
        animationSpeed: 800,
        smoothHeight: false,
        start: function (slider) {
            $('.slider_prev').click(function () {
                slider.flexAnimate(slider.getTarget("prev"), true);

                return false;
            });

            $('.slider_next').click(function () {
                slider.flexAnimate(slider.getTarget("next"), true);

                return false;
            });
        }
    });

    $('.mobile_team_detail .name, .mobile_team_detail .position').click(function () {
        if (!$(this).parent('li').hasClass('active')) {
            $('.mobile_team_detail .active').removeClass('active');
            $(this).parent('li').addClass('active');
        } else {
            $(this).parent('li').removeClass('active');
        }

        return false;
    });

    $('.team_detail').first().find('.text').scrollbar({
        showArrows: false,
        scrollx: 'simple',
        scrolly: 'simple',
        autoScrollSize: false
    });

    $('.job .title').click(function () {
        var $job = $(this).parent('.job');
        if (!$job.hasClass('job_open')) {
            $('.job_open').removeClass('job_open').find('.desc').slideUp();
            $job.addClass('job_open').find('.desc').slideDown();
        } else {
            $job.removeClass('job_open').find('.desc').slideUp();
        }

        return false;
    });

    $('.contact_form :input').keyup(function () {
        if (!$(this).val()) {
            $(this).siblings('label').show();
        } else {
            $(this).siblings('label').hide();
        }
    });


    $('.photo_gallery ul').infinitescroll({
        navSelector: ".photo_gallery .page_navi",
        nextSelector: ".photo_gallery .page_navi .page_next",
        itemSelector: ".photo_gallery ul li"
    });

    $(window).unbind('.infscr');

    $('.photo_gallery .load_more_btn').click(function () {
        $('.photo_gallery ul').infinitescroll('retrieve');
        return false;
    });

    $('.photo_gallery ul').infinitescroll({
        navSelector: ".photo_gallery .page_navi",
        nextSelector: ".photo_gallery .page_navi .page_next",
        itemSelector: ".photo_gallery ul li"
    });


    $('.gallery_videos ul').infinitescroll({
        navSelector: ".gallery_videos .page_navi",
        nextSelector: ".gallery_videos .page_navi .page_next",
        itemSelector: ".gallery_videos ul li"
    });

    $(window).unbind('.infscr');

    $('.gallery_videos .load_more_btn').click(function () {
        $('.gallery_videos ul').infinitescroll('retrieve');
        return false;
    });

    $('.gallery_videos ul').infinitescroll({
        navSelector: ".gallery_videos .page_navi",
        nextSelector: ".gallery_videos .page_navi .page_next",
        itemSelector: ".gallery_videos ul li"
    });


    $('.news_inner').infinitescroll({
        navSelector: ".news .page_navi",
        nextSelector: ".news .page_navi .page_next",
        itemSelector: ".news .news_item"
    });

    $(window).unbind('.infscr');

    $('.news .load_more_btn').click(function () {
        $('.news_inner').infinitescroll('retrieve');
        return false;
    });

    $('.news_inner').infinitescroll({
        navSelector: ".news .page_navi",
        nextSelector: ".news .page_navi .page_next",
        itemSelector: ".news .news_item"
    });

    $('.grid').imagesLoaded(function () {
        $('.grid').masonry({
            columnWidth: 200,
            itemSelector: '.grid-item'
        });
    });

    if (!$('body').hasClass('facilities_list_pages')) $('.red_header').clone().addClass('red_header_static').insertAfter($('.red_header'));

    function set_red_header_fixed() {
        var window_height = $(window).height(),
            top = $(document).scrollTop();
        if (!$('.full_screen').length) window_height = 0;
        if (top > window_height) {
            $('body').addClass('red_header_fixed');
        } else {
            $('body').removeClass('red_header_fixed');
        }
    }

    set_red_header_fixed();
    $(window).bind('scroll', function () {
        set_red_header_fixed();
    });



    $('.tab_nav_trigger').click(function () {
        var index = $('.tab_nav_trigger').index($(this));
        $('.tab_nav ul li').eq(index).find('a').trigger('click');
        $(this).closest('.stage_screen_btns').find('.active').removeClass('active');
        $(this).addClass('active');

        return false;
    });

    $('.service_page .main_nav_list .right ul li a').click(function(){
        var index = $(this).parent('li').index();
        $('body').removeClass('main_nav_visible');
        $('html').toggleClass('menu_is_open');
        $('.tab_nav ul li').eq(index).find('a').trigger('click');
        //$(this).closest('.stage_screen_btns').find('.active').removeClass('active');
        //$(this).addClass('active');
    });

    $('.filter_box').first().clone().addClass('mobile_filter_box').insertBefore($('.careers'));

    $('.filter_box span ul li').click(function () {
        $(this).parents('span').find('ul li.active').removeClass('active');
        $(this).addClass('active');
        //$(this).parents('span').find('ul').hide();

        filter();
        return false;
    });

    $('.filter_reset').click(function () {
        $('.filter_box .active').removeClass('active');

        filter();
        return false;
    });

    function filter() {
        var location = $('.filter_location .active').attr('data-filter'),
            title = $('.filter_title .active').attr('data-filter');
        $('.job').show();
        if (location) $('.job[data-location!=' + location + ']').hide();
        if (title) $('.job[data-title!=' + title + ']').hide();
    }

    $.Tipmsg.r = '';

    $('.apply_box form').Validform({});

    $("input[type=file].nice").nicefileinput({
        label: 'Upload Your Resume'
    });

    $('.apply_btn').click(function () {
        $('.white_overlay').show();
        $($(this).attr('href')).fadeIn();

        return false;
    });

    $('.apply_close').click(function () {
        $('.white_overlay').hide();
        $('.apply_wrapper').fadeOut();

        return false;
    });

    function setSecScreenHeight() {
        var window_height = $(window).height();
        $('.sec_full_screen').height(window_height);
    }

    setSecScreenHeight();
    $(window).resize(function () {
        setSecScreenHeight();
    });

    $('.work_shops_close').click(function () {
        // $(this).parents('.work_shops').slideUp();
        $('.tab_nav .active').removeClass('active');
        $('.tabs .tab_active').removeClass('tab_active');
        $('.tabs').find('.tab').eq(0).addClass('tab_active');
        return false;
    });

    $('.menu_btn').click(function () {
        $('body').addClass('main_nav_visible');
        $('html').toggleClass('menu_is_open');
        return false;
    });

    $('.main_nav_close').click(function () {
        $('body').removeClass('main_nav_visible');
        $('html').toggleClass('menu_is_open');
        return false;
    });
});
