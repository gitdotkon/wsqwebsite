(function($) {
  var _old = $.fn.attr;
  $.fn.attri = function() {
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

jQuery(document).ready(function($) {
  $(window).load(function() {
    var $body = $('body'),
      $stage_nav_container = $('.stage_nav_container');

    $('.next_screen').hover(function() {
      $('.next_screen_mousewheel').addClass('next_screen_mousewheel_ed');
    }, function() {
      $('.next_screen_mousewheel').removeClass('next_screen_mousewheel_ed');
    });

    $('.logo.animate_left').addClass('animate_lefted');

    $('.animate_right').addClass('animate_righted');

    //社交图标动画
    $('.social_btns .animate_left').each(function(index) {
      var $this = $(this);
      setTimeout(function() {
        $this.addClass('animate_lefted');
      }, 300 * ($('.social_btns .animate_left').size() - index));  
    });

    function animate_home_screen(delay) {
      $('.slide_bg').addClass('slide_bg_ed');

      if(1 == delay) {
        setTimeout(function() {
          //首屏文字动画
          $('.home_screen .animate_up').each(function(index) {
            var $this = $(this);
            setTimeout(function() {
              $this.addClass('animate_uped');
            }, ($('.home_screen').hasClass('stages_home_screen') ? 200 : 600) * index); 
          });

          setTimeout(function() {
            $('.slide_animating').removeClass('slide_animating');
          }, 1500);           
        }, 500);       
      } else {
        //首屏文字动画
        $('.home_screen .animate_up').each(function(index) {
          var $this = $(this);
          setTimeout(function() {
            $this.addClass('animate_uped');
          }, ($('.home_screen').hasClass('stages_home_screen') ? 200 : 600) * index); 
        });  

        setTimeout(function() {
          $('.slide_animating').removeClass('slide_animating');
        }, 1500);                     
      }
      //首屏按钮动画
      setTimeout(function() {
        $('.all_view_wrapper').addClass('all_view_wrapper_fadeIn');
      }, 600 * $('.home_screen .animate_up').size());  

      $('.next_screen').addClass('next_screen_ed');     
    }

    function animate(current_index) {
      if(!$('.slide_animating').length && !$('.screen_slide_animating').length && !$body.hasClass('footer_animating') && !$('.lightbox_visible').length) {
        if(0 == current_index) {
          $('.nav_container').removeClass('nav_container_visible');
        } else {
          $('.nav_container').addClass('nav_container_visible');
        }

        if(0 == current_index) {
          setTimeout(function() {
            animate_home_screen();
          }, $('.home_screen').hasClass('stages_home_screen') ? 500 : 100); 

          $('body').addClass('home_screen_visible').removeClass('home_screen_invisible');
        } else {
          setTimeout(function() {
            $('body').addClass('home_screen_invisible').removeClass('home_screen_visible');
          }, 1000);    
        }

        $('.stage_screen_btns_wrapper span.active').removeClass('active');
        $('.stage_screen_btns_wrapper span').eq(current_index - 1).addClass('active');

        $('body').attr({id: 'screen_visible_' + current_index});

        if(!$stage_nav_container.find('ul.dot_ul li').eq(current_index - 1).hasClass('active')) {
          $stage_nav_container.find('.active').removeClass('active');
          $stage_nav_container.find('ul.dot_ul li').eq(current_index - 1).addClass('active');
          $stage_nav_container.find('ul.text_ul li').eq(current_index - 1).addClass('active');

          //$('.stage_nav_line_hidden').removeClass('stage_nav_line_hidden');
          //$stage_nav_container.find('.active').prevAll('li').addClass('stage_nav_line_hidden');
          //$('.stage_nav_line_hidden').last().removeClass('stage_nav_line_hidden');
        }

        $stage_nav_container.attr({id: 'stage_nav_container_' + current_index});

        if(0 != current_index) {
          $('.home_screen .animate_up').removeClass('animate_uped');
          $('.all_view_wrapper').removeClass('all_view_wrapper_fadeIn');  
          $('.next_screen').removeClass('next_screen_ed'); 

          setTimeout(function() {
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
        setTimeout(function() {
          $slide.find('.side_pic').addClass('side_pic_ed');
          $screen_slide.find('.side_pic').addClass('side_pic_ed');
        }, 200);
     
        setTimeout(function() {
          $screen_slide_active.find('.animate_up').each(function(index) {
            var $this = $(this);
            setTimeout(function() {
              $this.removeClass('animate_uped');
            }, 150 * index); 
          });
        }, 0);

        setTimeout(function() {
          $screen_slide.find('.animate_up').each(function(index) {
            var $this = $(this);
            setTimeout(function() {
              $this.addClass('animate_uped');
            }, 300 * index); 
          });
        }, 800);

        setTimeout(function() {
          if(current_index > $('.screen_slide').index($('.screen_slide_active'))) {
            $screen_slide_active.find('.screen').addClass('screen_ed_down');
          } else {
            $screen_slide_active.find('.screen').removeClass('screen_ed');
          }

          $screen_slide.find('.screen').removeClass('screen_ed_down').addClass('screen_ed');
          
        }, 300);

        $screen_slide_active.find('.side_pic').removeClass('side_pic_ed');

        setTimeout(function() {
          $slide_active.find('.big_pic').removeClass('big_pic_ed');

          $slide_active.find('.side_pic').removeClass('side_pic_ed');
          

          //$('.slide_active').find('.animate_uped').removeClass('animate_uped');
          
          $slide_active.removeClass('slide_active');
          
          $slide.removeClass('slide_animating').addClass('slide_active');
          
          $('.slide_active').prevAll('.slide').find('.big_pic').removeClass('up').addClass('down');

          $('.slide_active').nextAll('.slide').find('.big_pic').removeClass('down').addClass('up');  

          
          $screen_slide.find('.screen_tile').addClass('screen_tile_ed');


          update_nav_container();
        }, 1100); 

        setTimeout(function() {
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
      if(!$('.nav_container ul li').eq(index).hasClass('active')) {
        $('.nav_container').find('.active').removeClass('active');
        $('.nav_container ul li').eq(index).addClass('active');
      }
    }

    function update_mobile_nav_container() {
      var index = $('.wrapper').data('swipe-index');
      if(0 == index || index == $('.slide').size()) {
        $('.mobile_nav_container').removeClass('mobile_nav_container_visible');
      } else {
        $('.mobile_nav_container').addClass('mobile_nav_container_visible');
      }

      if(!$('.mobile_nav_container ul li').eq(index).hasClass('active')) {
        $('.mobile_nav_container').find('.active').removeClass('active');
        $('.mobile_nav_container ul li').eq(index).addClass('active');
      }
    }

    $('.nav_container a').click(function() {
      var $li = $(this).parent('li'),
        $nav_container = $li.parents('.nav_container'),
        index = $li.index();
      if(!$li.hasClass('active')) {
        $nav_container.find('.active').removeClass('active');
        $li.addClass('active');
        animate(index);
      }
      
      return false;
    });

    $('.stage_screen_btns_wrapper a').click(function() {
      var $span = $(this).parent('span'),
        index = $span.index() + 1;
      if(!$span.hasClass('active')) {
        animate(index);
      }
      
      return false;
    });

    $('.stage_nav_a').click(function() {
      var $li = $(this).parent('li'),
        index = $li.index() + 1;
      if(!$li.hasClass('active')) {
        animate(index);
      }
      
      return false;
    });

    $('.home_screen .stage_screen_btns a').click(function() {
      var $span = $(this).parent('span'),
        index = $span.index() + 1;
      if($('.mobile_stages_slider').is(':visible')) {
        var old = index - 1;
        index = $wrapper.data('swipe-index');
        if(index != slide_count) {
          var index = $wrapper.data('swipe-index');
          $wrapper.data({'swipe-index': Number(index) + 1});
          $wrapper.removeAttr('class');
          $wrapper.addClass('wrapper').addClass('wrapper_' + $wrapper.data('swipe-index'));

          if(index == slide_count - 1) {
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
        if(!$span.hasClass('active')) {
          $span.siblings('.active').removeClass('active');
          $span.addClass('active');
          animate(index);
        }
      }
      
      return false;
    });

    $('.nav_container a').click(function() {
      var $li = $(this).parent('li'),
        $nav_container = $li.parents('.nav_container'),
        index = $li.index();
      if(!$li.hasClass('active')) {
        $nav_container.find('.active').removeClass('active');
        $li.addClass('active');
        animate(index);
      }
      
      return false;
    });

    $('.mobile_nav_container a').click(function() {
      var $li = $(this).parent('li'),
        $mobile_nav_container = $li.parents('.mobile_nav_container'),
        index = $li.index() + 1;
      if(!$li.hasClass('active')) {
        $mobile_nav_container.find('.active').removeClass('active');
        $li.addClass('active');
            $wrapper.data({'swipe-index': Number(index) - 1});
            $wrapper.removeAttr('class');
            $wrapper.addClass('wrapper').addClass('wrapper_' + $wrapper.data('swipe-index'));
      }
      
      update_mobile_nav_container();  
      return false;
    });

    $('.next_screen').click(function() {
      animate(1);

      return false;
    });

    animate_home_screen(1);

    $body.bind('mousewheel', function(e) {
      if('-1' == e.deltaY) {
        if($('.slide_active').next('.slide').length) {
          animate($('.slide_active').next('.slide').index());
        } else {
          if(!$('.slide_animating').length && !$('.screen_slide_animating').length && !$body.hasClass('footer_animating') && !$('.lightbox_visible').length) {
            $body.addClass('footer_visible');

            $('.nav_container').removeClass('nav_container_visible');
          }
        }
      } else if('1' == e.deltaY) {
        if($body.hasClass('footer_visible')) {
          $body.removeClass('footer_visible');

          $body.addClass('footer_animating');
          setTimeout(function() {
            $body.removeClass('footer_animating');
          }, 600);

          $('.nav_container').addClass('nav_container_visible');

          $('.slide_active').prevAll('.slide').find('.big_pic').removeClass('up').addClass('down');
        } else {
          if($('.slide_active').prev('.slide').length) {
            animate($('.slide_active').prev('.slide').index());
          }           
        }             
      }
    });

    $('.slide').each(function(index) {
      var $mobile_text = $('<div class="mobile_text"><div class="table"><div class="td"></div></div></div>').appendTo($(this));
      var html = $('.screen_slide').eq(index).find('.screen_inner').html();
      if(html) {
        $(html).appendTo($mobile_text.find('.td'));
      }    
      html = $('.screen_slide').eq(index).find('.side .td').html();
      if(html) {
        $('<div class="mobile_more">' + html + '</div>').appendTo($mobile_text.find('.td'));
      }
      html = $('.screen_slide').eq(index).find('.screen_tile').clone();
      if(html) {
        $(html).removeClass('screen_tile').addClass('mobile_screen_tile').insertBefore($mobile_text);
      }    
    });

    var $wrapper = $('.wrapper'),
      slide_count = $('.slide').size();
    $('.wrapper').data({'swipe-index': 0});

    if($body.hasClass('stages_page')) {
      $body.swipe({
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
          if('up' == direction && !$('.wrapper').hasClass('wrapper_1')) {
            var index = $wrapper.data('swipe-index');
            if(index != slide_count) {
              var index = $wrapper.data('swipe-index');
              $wrapper.data({'swipe-index': Number(index) + 1});
              $wrapper.removeAttr('class');
              $wrapper.addClass('wrapper').addClass('wrapper_' + $wrapper.data('swipe-index'));

              if(index == slide_count - 1) {
                $body.addClass('mobile_footer_visible');
              } else {
                $body.removeClass('mobile_footer_visible');
              }
            }

            $('body.stages_page .mobile_stage_slide').scrollTop(0);

            $body.addClass('stages_header_bg');
          }

          if('down' == direction && $('.wrapper').hasClass('wrapper_1')) {
            //$body.removeClass('stages_header_bg');
          }

          update_mobile_nav_container();  
        },
        threshold: 0,
        //fingerReleaseThreshold: 400,
        preventDefaultEvents: false
      });  
    } else {
      $body.swipe({
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
          if('up' == direction) {
            var index = $wrapper.data('swipe-index');
            if(index != slide_count) {
              var index = $wrapper.data('swipe-index');
              $wrapper.data({'swipe-index': Number(index) + 1});
              $wrapper.removeAttr('class');
              $wrapper.addClass('wrapper').addClass('wrapper_' + $wrapper.data('swipe-index'));

              if(index == slide_count - 1) {
                $body.addClass('mobile_footer_visible');
              } else {
                $body.removeClass('mobile_footer_visible');
              }
            }
          }
          if('down' == direction) {
            $body.removeClass('mobile_footer_visible');

            var index = $wrapper.data('swipe-index');
            if(0 != index) {
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

    $('.social_btns').bind('click touchstart', function() {
      $(this).toggleClass('social_btns_open');
    });

    $('.social_btns a').click(function(e) {
      e.stopPropagation();
    });

    $('.back_top').click(function() {
      if($(this).hasClass('mobile_back_top')) {
        if($body.hasClass('stage_page')) {
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
        if($body.hasClass('not_full_screen_page')) {
          $('html, body').animate({
            scrollTop: 0
          }, 600);   
        } else {
          $body.removeClass('footer_visible');
          setTimeout(function() {
            $('.nav_container ul li').first().find('a').trigger('click');
            if($body.hasClass('stages_page')) {
              animate(0);
            }
          }, 100);          
        }
        return false;     
      }
    });
  });

  $(document).on('click', '.lightbox_btn', function() {
    var $lightbox = $($(this).attr('href'));
    if(!$lightbox.hasClass('lightbox_visible')) {
      if(!$lightbox.find('iframe').length) {
        var $iframe = $('<iframe />').prependTo($lightbox),
          attrs = $lightbox.find('.iframe').attri();
        $.each(attrs, function(ele, key) {
          $iframe.attr(ele, key);
        });
      }
      $('.lightbox_visible').removeClass('lightbox_visible');
      $lightbox.addClass('lightbox_visible');
      $('html').addClass('has_lightbox_visible');
    }
    return false;  
  });

  $('.lightbox_close').click(function() {
    $('.lightbox_visible').removeClass('lightbox_visible');
    $('.has_lightbox_visible').removeClass('has_lightbox_visible');
    return false;  
  });  

  //$('#mobile_wrapper_height').text('@media only screen and (max-width: 1024px) { .wrapper {height: ' + (Number($('.slide').size()) - 1) + '00%;} }');

  function set_slider_status(slider) {
    if(slider.count > 1) {
      $(slider).parent('.stages_slider').find('.slider_status span').text(slider.currentSlide + 1);
    }
  }

  $(window).load(function() {
    $('.stages_slider .flexslider').flexslider({
      animation: 'slide',
      slideshow: false,
      slideshowSpeed: 5000,
      animationSpeed: 800,
      start: function(slider) {
        set_slider_status(slider);
        $('.stages_slider .flex-direction-nav a').click(function(e) {
          e.stopPropagation();
        });        
      },
      after: function(slider) {
        set_slider_status(slider);
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
      start: function(slider) {
        $('.mobile_stages_slider_nav a').click(function(e) {
          var $li = $(this).parent('li'),
            index = $li.index();
          if(!$li.hasClass('active')) {
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
      after: function(slider) {
        $('body.stages_page .wrapper_1 .mobile_stage_slide').scrollTop(0);
        if(!$('.mobile_stages_slider_nav ul li').eq(slider.currentSlide).hasClass('active')) {
          $('.mobile_stages_slider_nav .active').removeClass('active');
          $('.mobile_stages_slider_nav ul li').eq(slider.currentSlide).addClass('active');          
        }
      }    
    });       
  }); 

  $('.specs').clone().addClass('mobile_specs').insertAfter($('.stage_box'));

  $('.stages_page .footer').clone(true).appendTo($('.mobile_stage_slide'));

  $('.mobile_stages_slider_nav').click(function() {
    $('body').toggleClass('mobile_stages_slider_nav_open');
  });

  $('.stages_page .stages_slider').click(function() {
    window.location = $(this).attr('data-href');
  });
});