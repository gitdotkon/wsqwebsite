jQuery(document).ready(function($) {
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

  function animate_home_screen() {
    $('.slide_bg').addClass('slide_bg_ed');

    //首屏文字动画
    $('.home_screen .animate_up').each(function(index) {
      var $this = $(this);
      setTimeout(function() {
        $this.addClass('animate_uped');
      }, 600 * index); 
    });

    //首屏按钮动画
    setTimeout(function() {
      $('.all_view_wrapper').addClass('all_view_wrapper_fadeIn');
    }, 600 * $('.home_screen .animate_up').size());  

    $('.next_screen').addClass('next_screen_ed');     
  }

  function animate(current_index) {
    if(!$('.slide_animating').length && !$('.screen_slide_animating').length) {
      if(0 == current_index) {
        setTimeout(function() {
          animate_home_screen();
        }, 1000);    
           
      }

      if(0 != current_index) {
        $('.slide_bg').removeClass('slide_bg_ed');
        $('.home_screen .animate_up').removeClass('animate_uped');
        $('.all_view_wrapper').removeClass('all_view_wrapper_fadeIn');  
        $('.next_screen').removeClass('next_screen_ed');       
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
      }, 200);
   
      setTimeout(function() {
        $screen_slide_active.find('.animate_up').each(function(index) {
          var $this = $(this);
          setTimeout(function() {
            $this.removeClass('animate_uped');
          }, 600 * index); 
        });
      }, 0);

      setTimeout(function() {
        $screen_slide.find('.animate_up').each(function(index) {
          var $this = $(this);
          setTimeout(function() {
            $this.addClass('animate_uped');
          }, 600 * index); 
        });
      }, 1200);

      setTimeout(function() {
        if(current_index > $('.screen_slide').index($('.screen_slide_active'))) {
          $screen_slide_active.find('.screen').addClass('screen_ed_down');
        } else {
          $screen_slide_active.find('.screen').removeClass('screen_ed');
        }

        $screen_slide.find('.screen').removeClass('screen_ed_down').addClass('screen_ed');
        
      }, 500);

      setTimeout(function() {
        $slide_active.find('.big_pic').removeClass('big_pic_ed');
        $slide_active.find('.side_pic').removeClass('side_pic_ed');



        //$('.slide_active').find('.animate_uped').removeClass('animate_uped');
        
        $slide_active.removeClass('slide_active');
        
        $slide.removeClass('slide_animating').addClass('slide_active');
        
        $slide_active.prevAll('.slide').find('.big_pic').removeClass('up').addClass('down');

        $slide_active.nextAll('.slide').find('.big_pic').removeClass('down').addClass('up');  

        $screen_slide_active.removeClass('slide_start');
        $screen_slide.find('.screen_tile').addClass('screen_tile_ed');
      }, 1100); 

      setTimeout(function() {
        $screen_slide_active.removeClass('screen_slide_active');
        $screen_slide.removeClass('screen_slide_animating').addClass('screen_slide_active');

        $('.screen_slide_active').prevAll('.screen_slide').find('.screen').removeClass('screen_ed').addClass('screen_ed_down');

        $('.screen_slide_active').nextAll('.screen_slide').find('.screen').removeClass('screen_ed_down').removeClass('screen_ed');     
      }, 2000);   
    }
  }

  animate_home_screen();

  $('body').bind('mousewheel', function(e) {
    if(1) {
      if('-1' == e.deltaY) {
        if($('.slide_active').next('.slide').length) {
          animate($('.slide_active').next('.slide').index());
          $('body').removeClass('footer_visible');
        } else {
          $('body').addClass('footer_visible');
        }
      } else {
        $('body').removeClass('footer_visible');
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
    html = $('.screen_slide').eq(index).find('.screen_tile');
    if(html) {
      $(html).removeClass('screen_tile').addClass('mobile_screen_tile').insertBefore($mobile_text);
    }    
  });

  var $wrapper = $('.wrapper'),
    slide_count = $('.slide').size();
  $('.wrapper').data({'swipe-index': 0});

  $('body').swipe({
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      if('up' == direction) {
        var index = $wrapper.data('swipe-index');
        if(index != slide_count) {
          var index = $wrapper.data('swipe-index');
          $wrapper.data({'swipe-index': Number(index) + 1});
          $wrapper.removeAttr('class');
          $wrapper.addClass('wrapper').addClass('wrapper_' + $wrapper.data('swipe-index'));

          if(index == slide_count - 1) {
            $('body').addClass('mobile_footer_visible');
          } else {
            $('body').removeClass('mobile_footer_visible');
          }
        }
      }
      if('down' == direction) {
        $('body').removeClass('mobile_footer_visible');

        var index = $wrapper.data('swipe-index');
        if(0 != index) {
          $wrapper.data({'swipe-index': Number(index) - 1});
          $wrapper.removeAttr('class');
          $wrapper.addClass('wrapper').addClass('wrapper_' + $wrapper.data('swipe-index'));
        }
      }       
    },
    threshold: 0,
    fingerReleaseThreshold: 200,
    preventDefaultEvents: false
  });  

  $('.social_btns').click(function() {
    $(this).toggleClass('social_btns_open');
  });

  $('.social_btns a').click(function(e) {
    e.stopPropagation();
  });

  $('.back_top').click(function() {
    if($(this).hasClass('mobile_back_top')) {
      $('body').removeClass('mobile_footer_visible');
      $('.wrapper').removeAttr('class').addClass('wrapper');
      $('.wrapper').data({'swipe-index': 0});
      return false;      
    }
  });
});