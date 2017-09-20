(function($) {
  $.fn.cascadeSlider = function(opt) {
    var $this = this,
      itemClass = opt.itemClass || 'cascade-slider_item',
      arrowClass = opt.arrowClass || 'cascade-slider_arrow',
      dotClass =  opt.dotClass ? '.' + opt.dotClass : '.cascade-slider_dot',
      slidesClass =  opt.slidesClass ? '.' + opt.slidesClass : '.cascade-slider_slides',
      $item = $this.find('.' + itemClass),
      $arrow = $this.find('.' + arrowClass),
      itemCount = $item.length;

    var defaultIndex = 0;

    changeIndex(defaultIndex);

    $arrow.on('click', function() {
      var action = $(this).data('action'),
        nowIndex = $item.index($this.find('.now')),
          newIndex;

      if(action == 'next') {
        if(nowIndex == itemCount - 1) {
          newIndex = 0;
        } else {
          newIndex = nowIndex + 1;
        }
      } else if (action == 'prev') {
        if(nowIndex == 0) {
          newIndex = itemCount - 1;
        } else {
          newIndex = nowIndex - 1;
        }
      }
      changeIndex(newIndex);

      $(dotClass).removeClass('cur');
      var activeDot = $(dotClass).parent().find('[data-dot-number=' + (newIndex+1) + ']');
      $(activeDot).addClass('cur');
    });
    
    // add data attributes
    for (var i = 0; i < itemCount; i++) {
      $(itemClass).each(function(i) {
        $(this).attr('data-slide-number', [i]);
      });
    }
    
    // dots
    $(dotClass).bind('click', function(){
      // add class to current dot on click
      $(dotClass).removeClass('cur');
      $(this).addClass('cur');

      var index = $(this).index();
      changeIndex(index);
    });

    function changeIndex(nowIndex) {
      // clern all class
      $this.find('.now').removeClass('now');
      $this.find('.next').removeClass('next');
      $this.find('.prev').removeClass('prev');
      if(nowIndex == itemCount -1){
        $item.eq(0).addClass('next');
      }
      if(nowIndex == 0) {
        $item.eq(itemCount -1).addClass('prev');
      }

      $item.each(function(index) {
        if(index == nowIndex) {
          $item.eq(index).addClass('now');
        }
        if(index == nowIndex + 1 ) {
          $item.eq(index).addClass('next');
        }
        if(index == nowIndex - 1 ) {
          $item.eq(index).addClass('prev');
        }
      });
    }
  };
})(jQuery);
