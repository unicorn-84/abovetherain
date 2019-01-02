var $ = jQuery.noConflict();

$.fn.inlineStyle = function (prop) {
  return this.prop("style")[$.camelCase(prop)];
};

$.fn.doOnce = function( func ) {
  this.length && func.apply( this );
  return this;
};

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
      || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());

var SEMICOLON = SEMICOLON || {};

(function($){

  // USE STRICT
  "use strict";

  SEMICOLON.initialize = {

    init: function(){

      SEMICOLON.initialize.responsiveClasses();
      SEMICOLON.initialize.lightbox();

    },

    responsiveClasses: function(){

      if( typeof jRespond === 'undefined' ) {
        console.log('responsiveClasses: jRespond not Defined.');
        return true;
      }

      var jRes = jRespond([
        {
          label: 'smallest',
          enter: 0,
          exit: 575
        },{
          label: 'handheld',
          enter: 576,
          exit: 767
        },{
          label: 'tablet',
          enter: 768,
          exit: 991
        },{
          label: 'laptop',
          enter: 992,
          exit: 1199
        },{
          label: 'desktop',
          enter: 1200,
          exit: 10000
        }
      ]);
      jRes.addFunc([
        {
          breakpoint: 'desktop',
          enter: function() { $body.addClass('device-xl'); },
          exit: function() { $body.removeClass('device-xl'); }
        },{
          breakpoint: 'laptop',
          enter: function() { $body.addClass('device-lg'); },
          exit: function() { $body.removeClass('device-lg'); }
        },{
          breakpoint: 'tablet',
          enter: function() { $body.addClass('device-md'); },
          exit: function() { $body.removeClass('device-md'); }
        },{
          breakpoint: 'handheld',
          enter: function() { $body.addClass('device-sm'); },
          exit: function() { $body.removeClass('device-sm'); }
        },{
          breakpoint: 'smallest',
          enter: function() { $body.addClass('device-xs'); },
          exit: function() { $body.removeClass('device-xs'); }
        }
      ]);
    },

    lightbox: function(){

      if( !$().magnificPopup ) {
        console.log('lightbox: Magnific Popup not Defined.');
        return true;
      }

      var $lightboxImageEl = $('[data-lightbox="image"]'),
        $lightboxGalleryEl = $('[data-lightbox="gallery"]'),
        $lightboxIframeEl = $('[data-lightbox="iframe"]'),
        $lightboxInlineEl = $('[data-lightbox="inline"]'),
        $lightboxAjaxEl = $('[data-lightbox="ajax"]'),
        $lightboxAjaxGalleryEl = $('[data-lightbox="ajax-gallery"]');

      if( $lightboxImageEl.length > 0 ) {
        $lightboxImageEl.magnificPopup({
          type: 'image',
          closeOnContentClick: true,
          closeBtnInside: false,
          fixedContentPos: true,
          mainClass: 'mfp-no-margins mfp-fade', // class to remove default margin from left and right side
          image: {
            verticalFit: true
          }
        });
      }

      if( $lightboxGalleryEl.length > 0 ) {
        $lightboxGalleryEl.each(function() {
          var element = $(this);

          if( element.find('a[data-lightbox="gallery-item"]').parent('.clone').hasClass('clone') ) {
            element.find('a[data-lightbox="gallery-item"]').parent('.clone').find('a[data-lightbox="gallery-item"]').attr('data-lightbox','');
          }

          if( element.find('a[data-lightbox="gallery-item"]').parents('.cloned').hasClass('cloned') ) {
            element.find('a[data-lightbox="gallery-item"]').parents('.cloned').find('a[data-lightbox="gallery-item"]').attr('data-lightbox','');
          }

          element.magnificPopup({
            delegate: 'a[data-lightbox="gallery-item"]',
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'mfp-no-margins mfp-fade', // class to remove default margin from left and right side
            image: {
              verticalFit: true
            },
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            }
          });
        });
      }

      if( $lightboxIframeEl.length > 0 ) {
        $lightboxIframeEl.magnificPopup({
          disableOn: 600,
          type: 'iframe',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
      }

      if( $lightboxInlineEl.length > 0 ) {
        $lightboxInlineEl.magnificPopup({
          type: 'inline',
          mainClass: 'mfp-no-margins mfp-fade',
          closeBtnInside: false,
          fixedContentPos: true,
          overflowY: 'scroll'
        });
      }

      if( $lightboxAjaxEl.length > 0 ) {
        $lightboxAjaxEl.magnificPopup({
          type: 'ajax',
          closeBtnInside: false,
          callbacks: {
            ajaxContentAdded: function(mfpResponse) {
              SEMICOLON.initialize.resizeVideos();
              SEMICOLON.widget.masonryThumbs();
            },
            open: function() {
              $body.addClass('ohidden');
            },
            close: function() {
              $body.removeClass('ohidden');
            }
          }
        });
      }

      if( $lightboxAjaxGalleryEl.length > 0 ) {
        $lightboxAjaxGalleryEl.magnificPopup({
          delegate: 'a[data-lightbox="ajax-gallery-item"]',
          type: 'ajax',
          closeBtnInside: false,
          gallery: {
            enabled: true,
            preload: 0,
            navigateByImgClick: false
          },
          callbacks: {
            ajaxContentAdded: function(mfpResponse) {
              SEMICOLON.initialize.resizeVideos();
              SEMICOLON.widget.masonryThumbs();
            },
            open: function() {
              $body.addClass('ohidden');
            },
            close: function() {
              $body.removeClass('ohidden');
            }
          }
        });
      }
    }
  };

  SEMICOLON.widget = {

    init: function(){

      SEMICOLON.widget.extras();

    },



    navTree: function(){
      var $navTreeEl = $('.nav-tree');
      if( $navTreeEl.length > 0 ){
        $navTreeEl.each( function(){
          var element = $(this),
            elementSpeed = element.attr('data-speed'),
            elementEasing = element.attr('data-easing');

          if( !elementSpeed ) { elementSpeed = 250; }
          if( !elementEasing ) { elementEasing = 'swing'; }

          element.find( 'ul li:has(ul)' ).addClass('sub-menu');
          element.find( 'ul li:has(ul) > a' ).append( ' <i class="icon-angle-down"></i>' );

          if( element.hasClass('on-hover') ){
            element.find( 'ul li:has(ul):not(.active)' ).hover( function(e){
              $(this).children('ul').stop(true, true).slideDown( Number(elementSpeed), elementEasing);
            }, function(){
              $(this).children('ul').delay(250).slideUp( Number(elementSpeed), elementEasing);
            });
          } else {
            element.find( 'ul li:has(ul) > a' ).click( function(e){
              var childElement = $(this);
              childElement.parent().children('ul').slideToggle( Number(elementSpeed), elementEasing, function(){
                $(this).find('ul').hide();
                $(this).find('li.active').removeClass('active');
              });
              element.find( 'ul li > ul' ).not(childElement.parent().children('ul')).not(childElement.parents('ul')).slideUp( Number(elementSpeed), elementEasing );
              childElement.parent('li:has(ul)').toggleClass('active');
              e.preventDefault();
            });
          }
        });
      }
    },

    extras: function(){

      $('.style-msg').on( 'click', '.close', function(e){
        $( this ).parents( '.style-msg' ).slideUp();
        e.preventDefault();
      });

      $('#primary-menu-trigger,#overlay-menu-close').click(function() {
        if( $('#primary-menu').find('ul.mobile-primary-menu').length > 0 ) {
          $( '#primary-menu > ul.mobile-primary-menu, #primary-menu > div > ul.mobile-primary-menu' ).toggleClass('d-block');
        } else {
          $( '#primary-menu > ul, #primary-menu > div > ul' ).toggleClass('d-block');
        }
        $body.toggleClass("primary-menu-open");
        return false;
      });
      if( SEMICOLON.isMobile.any() ){
        $body.addClass('device-touch');
      }

    }

  };

  SEMICOLON.isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (SEMICOLON.isMobile.Android() || SEMICOLON.isMobile.BlackBerry() || SEMICOLON.isMobile.iOS() || SEMICOLON.isMobile.Opera() || SEMICOLON.isMobile.Windows());
    }
  };

  SEMICOLON.documentOnResize = {

    init: function(){

      windowWidth = $window.width();

    }

  };

  SEMICOLON.documentOnReady = {

    init: function(){
      SEMICOLON.initialize.init();
      SEMICOLON.widget.init();
    },

  };

  SEMICOLON.documentOnLoad = {

    init: function(){}

  };

  var $window = $(window),
    $body = $('body'),
    $wrapper = $('#wrapper'),
    $content = $('#content'),
    $footer = $('#footer'),
    windowWidth = $window.width()

  $(document).ready( SEMICOLON.documentOnReady.init );
  $window.on( 'load', SEMICOLON.documentOnLoad.init );
  $window.on( 'resize', SEMICOLON.documentOnResize.init );

})(jQuery);
