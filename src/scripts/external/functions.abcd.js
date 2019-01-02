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
      SEMICOLON.initialize.fullScreen();
      SEMICOLON.initialize.lightbox();
      SEMICOLON.initialize.dataResponsiveClasses();
      SEMICOLON.initialize.dataResponsiveHeights();

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

    fullScreen: function(){
      if( $fullScreenEl.length > 0 ) {
        $fullScreenEl.each( function(){
          var element = $(this),
            scrHeight = window.innerHeight ? window.innerHeight : $window.height(),
            negativeHeight = element.attr('data-negative-height');

          if( element.parents('.full-screen').length > 0 ) { scrHeight = element.parents('.full-screen').height(); }

          if( $body.hasClass('device-sm') || $body.hasClass('device-xs') ) {
            if( !element.hasClass('force-full-screen') ){ scrHeight = 'auto'; }
          }

          if( negativeHeight ){ scrHeight = scrHeight - Number(negativeHeight); }

          element.css('height', scrHeight);
        });
      }
    },

    maxHeight: function(){
      if( $commonHeightEl.length > 0 ) {
        if( $commonHeightEl.hasClass('customjs') ) { return true; }
        $commonHeightEl.each( function(){
          var element = $(this);
          if( element.find('.common-height').length > 0 ) {
            SEMICOLON.initialize.commonHeight( element.find('.common-height:not(.customjs)') );
          }

          SEMICOLON.initialize.commonHeight( element );
        });
      }
    },

    commonHeight: function( element ){
      var maxHeight = 0;
      element.children('[class*=col-]').each( function(){
        var elementChild = $(this).children();
        if( elementChild.hasClass('max-height') ){
          maxHeight = elementChild.outerHeight();
        } else {
          if (elementChild.outerHeight() > maxHeight)
            maxHeight = elementChild.outerHeight();
        }
      });

      element.children('[class*=col-]').each(function() {
        $(this).height(maxHeight);
      });
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
    },

    topScrollOffset: function() {
      var topOffsetScroll = 0;

      if( ( $body.hasClass('device-xl') || $body.hasClass('device-lg') ) && !SEMICOLON.isMobile.any() ) {
        if( $header.hasClass('sticky-header') ) {
          if( $pagemenu.hasClass('dots-menu') ) { topOffsetScroll = 100; } else { topOffsetScroll = 144; }
        } else {
          if( $pagemenu.hasClass('dots-menu') ) { topOffsetScroll = 140; } else { topOffsetScroll = 184; }
        }

        if( !$pagemenu.length ) {
          if( $header.hasClass('sticky-header') ) { topOffsetScroll = 100; } else { topOffsetScroll = 140; }
        }
      } else {
        topOffsetScroll = 40;
      }

      return topOffsetScroll;
    },

    defineColumns: function( element ){
      var column = 4,
        xlCol = element.attr('data-xl-col'),
        lgCol = element.attr('data-lg-col'),
        mdCol = element.attr('data-md-col'),
        smCol = element.attr('data-sm-col'),
        xsCol = element.attr('data-xs-col');

      if( element.hasClass('portfolio-full') ) {
        if( element.hasClass('portfolio-3') ) column = 3;
        else if( element.hasClass('portfolio-5') ) column = 5;
        else if( element.hasClass('portfolio-6') ) column = 6;
        else column = 4;

        if( $body.hasClass('device-md') && ( column == 4 || column == 5 || column == 6 ) ) {
          column = 3;
        } else if( $body.hasClass('device-sm') && ( column == 3 || column == 4 || column == 5 || column == 6 ) ) {
          column = 2;
        } else if( $body.hasClass('device-xs') ) {
          column = 1;
        }

      } else if( element.hasClass('masonry-thumbs') ) {

        if( element.hasClass('grid-2') ) column = 2;
        else if( element.hasClass('grid-3') ) column = 3;
        else if( element.hasClass('grid-5') ) column = 5;
        else if( element.hasClass('grid-6') ) column = 6;
        else column = 4;

      }

      if( $body.hasClass('device-xl') ) {
        if( xlCol ) { column = Number(xlCol); }
      } else if( $body.hasClass('device-lg') ) {
        if( lgCol ) { column = Number(lgCol); }
      } else if( $body.hasClass('device-md') ) {
        if( mdCol ) { column = Number(mdCol); }
      } else if( $body.hasClass('device-sm') ) {
        if( smCol ) { column = Number(smCol); }
      } else if( $body.hasClass('device-xs') ) {
        if( xsCol ) { column = Number(xsCol); }
      }

      return column;
    },

    setFullColumnWidth: function( element ){

      if( !$().isotope ) {
        console.log('setFullColumnWidth: Isotope not Defined.');
        return true;
      }

      element.css({ 'width': '' });

      if( element.hasClass('portfolio-full') ) {
        var columns = SEMICOLON.initialize.defineColumns( element ),
          containerWidth = element.width(),
          postWidth = Math.floor(containerWidth/columns);
        if( $body.hasClass('device-xs') ) { var deviceSmallest = 1; } else { var deviceSmallest = 0; }
        element.find(".portfolio-item").each(function(index){
          if( deviceSmallest == 0 && $(this).hasClass('wide') ) { var elementSize = ( postWidth*2 ); } else { var elementSize = postWidth; }
          $(this).css({"width":elementSize+"px"});
        });
      } else if( element.hasClass('masonry-thumbs') ) {
        var columns = SEMICOLON.initialize.defineColumns( element ),
          containerWidth = element.innerWidth();

        if( containerWidth == windowWidth ){
          containerWidth = windowWidth*1.005;
          element.css({ 'width': containerWidth+'px' });
        }

        var postWidth = (containerWidth/columns);

        postWidth = Math.floor(postWidth);

        if( ( postWidth * columns ) >= containerWidth ) { element.css({ 'margin-right': '-1px' }); }

        element.children('a').css({"width":postWidth+"px"});

        var firstElementWidth = element.find('a:eq(0)').outerWidth();

        element.isotope({
          masonry: {
            columnWidth: firstElementWidth
          }
        });

        var bigImageNumbers = element.attr('data-big');
        if( bigImageNumbers ) {
          bigImageNumbers = bigImageNumbers.split(",");
          var bigImageNumber = '',
            bigi = '';
          for( bigi = 0; bigi < bigImageNumbers.length; bigi++ ){
            bigImageNumber = Number(bigImageNumbers[bigi]) - 1;
            element.find('a:eq('+bigImageNumber+')').css({ width: firstElementWidth*2 + 'px' });
          }
          var t = setTimeout( function(){
            element.isotope('layout');
          }, 1000 );
        }
      }

    },

    aspectResizer: function(){
      var $aspectResizerEl = $('.aspect-resizer');
      if( $aspectResizerEl.length > 0 ) {
        $aspectResizerEl.each( function(){
          var element = $(this),
            elementW = element.inlineStyle('width'),
            elementH = element.inlineStyle('height'),
            elementPW = element.parent().innerWidth();
        });
      }
    },

    dataResponsiveClasses: function(){
      var $dataClassXs = $('[data-class-xs]'),
        $dataClassSm = $('[data-class-sm]'),
        $dataClassMd = $('[data-class-md]'),
        $dataClassLg = $('[data-class-lg]'),
        $dataClassXl = $('[data-class-xl]');

      if( $dataClassXs.length > 0 ) {
        $dataClassXs.each( function(){
          var element = $(this),
            elementClass = element.attr('data-class-xs'),
            elementClassDelete = element.attr('data-class-sm') + ' ' + element.attr('data-class-md') + ' ' + element.attr('data-class-lg') + ' ' + element.attr('data-class-xl');

          if( $body.hasClass('device-xs') ) {
            element.removeClass( elementClassDelete );
            element.addClass( elementClass );
          }
        });
      }

      if( $dataClassSm.length > 0 ) {
        $dataClassSm.each( function(){
          var element = $(this),
            elementClass = element.attr('data-class-sm'),
            elementClassDelete = element.attr('data-class-xs') + ' ' + element.attr('data-class-md') + ' ' + element.attr('data-class-lg') + ' ' + element.attr('data-class-xl');

          if( $body.hasClass('device-sm') ) {
            element.removeClass( elementClassDelete );
            element.addClass( elementClass );
          }
        });
      }

      if( $dataClassMd.length > 0 ) {
        $dataClassMd.each( function(){
          var element = $(this),
            elementClass = element.attr('data-class-md'),
            elementClassDelete = element.attr('data-class-xs') + ' ' + element.attr('data-class-sm') + ' ' + element.attr('data-class-lg') + ' ' + element.attr('data-class-xl');

          if( $body.hasClass('device-md') ) {
            element.removeClass( elementClassDelete );
            element.addClass( elementClass );
          }
        });
      }

      if( $dataClassLg.length > 0 ) {
        $dataClassLg.each( function(){
          var element = $(this),
            elementClass = element.attr('data-class-lg'),
            elementClassDelete = element.attr('data-class-xs') + ' ' + element.attr('data-class-sm') + ' ' + element.attr('data-class-md') + ' ' + element.attr('data-class-xl');

          if( $body.hasClass('device-lg') ) {
            element.removeClass( elementClassDelete );
            element.addClass( elementClass );
          }
        });
      }

      if( $dataClassXl.length > 0 ) {
        $dataClassXl.each( function(){
          var element = $(this),
            elementClass = element.attr('data-class-xl'),
            elementClassDelete = element.attr('data-class-xs') + ' ' + element.attr('data-class-sm') + ' ' + element.attr('data-class-md') + ' ' + element.attr('data-class-lg');

          if( $body.hasClass('device-xl') ) {
            element.removeClass( elementClassDelete );
            element.addClass( elementClass );
          }
        });
      }
    },

    dataResponsiveHeights: function(){
      var $dataHeightXs = $('[data-height-xs]'),
        $dataHeightSm = $('[data-height-sm]'),
        $dataHeightMd = $('[data-height-md]'),
        $dataHeightLg = $('[data-height-lg]'),
        $dataHeightXl = $('[data-height-xl]');

      if( $dataHeightXs.length > 0 ) {
        $dataHeightXs.each( function(){
          var element = $(this),
            elementHeight = element.attr('data-height-xs');

          if( $body.hasClass('device-xs') ) {
            if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
          }
        });
      }

      if( $dataHeightSm.length > 0 ) {
        $dataHeightSm.each( function(){
          var element = $(this),
            elementHeight = element.attr('data-height-sm');

          if( $body.hasClass('device-sm') ) {
            if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
          }
        });
      }

      if( $dataHeightMd.length > 0 ) {
        $dataHeightMd.each( function(){
          var element = $(this),
            elementHeight = element.attr('data-height-md');

          if( $body.hasClass('device-md') ) {
            if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
          }
        });
      }

      if( $dataHeightLg.length > 0 ) {
        $dataHeightLg.each( function(){
          var element = $(this),
            elementHeight = element.attr('data-height-lg');

          if( $body.hasClass('device-lg') ) {
            if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
          }
        });
      }

      if( $dataHeightXl.length > 0 ) {
        $dataHeightXl.each( function(){
          var element = $(this),
            elementHeight = element.attr('data-height-xl');

          if( $body.hasClass('device-xl') ) {
            if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
          }
        });
      }
    },

    stickFooterOnSmall: function(){
      $footer.css({ 'margin-top': '' });
      var windowH = $window.height(),
        wrapperH = $wrapper.height();

      if( !$body.hasClass('sticky-footer') && $footer.length > 0 && $wrapper.has('#footer') ) {
        if( windowH > wrapperH ) {
          $footer.css({ 'margin-top': ( windowH - wrapperH ) });
        }
      }
    },

    stickyFooter: function(){
      if( $body.hasClass('sticky-footer') && $footer.length > 0 && ( $body.hasClass('device-xl') || $body.hasClass('device-lg') ) ) {
        var stickyFooter = $footer.outerHeight();
        $content.css({ 'margin-bottom': stickyFooter });
      } else {
        $content.css({ 'margin-bottom': 0 });
      }
    }

  };

  SEMICOLON.header = {

    init: function(){

      SEMICOLON.header.menufunctions();
      SEMICOLON.header.fullWidthMenu();
      SEMICOLON.header.overlayMenu();
      SEMICOLON.header.stickyMenu();
      SEMICOLON.header.stickyPageMenu();
      SEMICOLON.header.sideHeader();
      SEMICOLON.header.sidePanel();
      SEMICOLON.header.onePageScroll();
      SEMICOLON.header.onepageScroller();
      SEMICOLON.header.logo();

    },

    menuInvert: function() {

      $('#primary-menu .mega-menu-content, #primary-menu ul ul').each( function( index, element ){
        var $menuChildElement = $(element),
          menuChildOffset = $menuChildElement.offset(),
          menuChildWidth = $menuChildElement.width(),
          menuChildLeft = menuChildOffset.left;

        if(windowWidth - (menuChildWidth + menuChildLeft) < 0) {
          $menuChildElement.addClass('menu-pos-invert');
        }
      });

    },

    menufunctions: function(){

      $( '#primary-menu ul li:has(ul)' ).addClass('sub-menu');
      $( '.top-links ul li:has(ul) > a, #primary-menu.with-arrows > ul > li:has(ul) > a > div, #primary-menu.with-arrows > div > ul > li:has(ul) > a > div, #page-menu nav ul li:has(ul) > a > div' ).append( '<i class="icon-angle-down"></i>' );
      $( '.top-links > ul' ).addClass( 'clearfix' );

      if( $body.hasClass('device-xl') || $body.hasClass('device-lg') ) {
        $('#primary-menu.sub-title > ul > li').hover(function() {
          $(this).prev().css({ backgroundImage : 'none' });
        }, function() {
          $(this).prev().css({ backgroundImage : 'url("images/icons/menu-divider.png")' });
        });

        $('#primary-menu.sub-title').children('ul').children('.current').prev().css({ backgroundImage : 'none' });
      }

      $('#primary-menu.on-click li:has(ul) > a').on( 'click', function(e){
        $(this).parents('.sub-menu').siblings().find('ul,.mega-menu-content').removeClass('d-block');
        $(this).parent('li').children('ul,.mega-menu-content').toggleClass('d-block');
        e.preventDefault();
      });

      // var responsiveThreshold = $header.attr('data-responsive-under');
      // if( !responsiveThreshold ) { responsiveThreshold = 992; }

      // if( windowWidth < Number( responsiveThreshold ) ) {
      // 	$body.addClass('mobile-header-active');
      // } else {
      // 	$body.removeClass('mobile-header-active');
      // }

      if( SEMICOLON.isMobile.Android() ) {
        $( '#primary-menu ul li.sub-menu' ).children('a').on('touchstart', function(e){
          if( !$(this).parent('li.sub-menu').hasClass('sfHover') ) {
            e.preventDefault();
          }
        });
      }

      if( SEMICOLON.isMobile.Windows() ) {
        if( $().superfish ){
          $('#primary-menu > ul, #primary-menu > div > ul,.top-links > ul').superfish('destroy').addClass('windows-mobile-menu');
        } else {
          $('#primary-menu > ul, #primary-menu > div > ul,.top-links > ul').addClass('windows-mobile-menu');
          console.log('menufunctions: Superfish not defined.');
        }

        $( '#primary-menu ul li:has(ul)' ).append('<a href="#" class="wn-submenu-trigger"><i class="icon-angle-down"></i></a>');

        $( '#primary-menu ul li.sub-menu' ).children('a.wn-submenu-trigger').click( function(e){
          $(this).parent().toggleClass('open');
          $(this).parent().find('> ul, > .mega-menu-content').stop(true,true).toggle();
          return false;
        });
      }

    },

    fullWidthMenu: function(){
      if( $body.hasClass('stretched') ) {
        if( $header.find('.container-fullwidth').length > 0 ) { $('.mega-menu .mega-menu-content').css({ 'width': $wrapper.width() - 120 }); }
        if( $header.hasClass('full-header') ) { $('.mega-menu .mega-menu-content').css({ 'width': $wrapper.width() - 60 }); }
      } else {
        if( $header.find('.container-fullwidth').length > 0 ) { $('.mega-menu .mega-menu-content').css({ 'width': $wrapper.width() - 120 }); }
        if( $header.hasClass('full-header') ) { $('.mega-menu .mega-menu-content').css({ 'width': $wrapper.width() - 80 }); }
      }
    },

    overlayMenu: function(){
      if( $body.hasClass('overlay-menu') ) {
        var overlayMenuItem = $('#primary-menu').children('ul').children('li'),
          overlayMenuItemHeight = overlayMenuItem.outerHeight(),
          overlayMenuItemTHeight = overlayMenuItem.length * overlayMenuItemHeight,
          firstItemOffset = ( $window.height() - overlayMenuItemTHeight ) / 2;

        $('#primary-menu').children('ul').children('li:first-child').css({ 'margin-top': firstItemOffset+'px' });
      }
    },

    stickyMenu: function( headerOffset ){
      if ($window.scrollTop() > headerOffset) {
        if( $body.hasClass('device-xl') || $body.hasClass('device-lg') ) {
          $('body:not(.side-header) #header:not(.no-sticky)').addClass('sticky-header');
          if( !$headerWrap.hasClass('force-not-dark') ) { $headerWrap.removeClass('not-dark'); }
          SEMICOLON.header.stickyMenuClass();
        } else if( $body.hasClass('device-sm') || $body.hasClass('device-xs') || $body.hasClass('device-md') ) {
          if( $body.hasClass('sticky-responsive-menu') ) {
            $('#header:not(.no-sticky)').addClass('responsive-sticky-header');
            SEMICOLON.header.stickyMenuClass();
          }
        }
      } else {
        SEMICOLON.header.removeStickyness();
      }
    },

    stickyPageMenu: function( pageMenuOffset ){
      if ($window.scrollTop() > pageMenuOffset) {
        if( $body.hasClass('device-xl') || $body.hasClass('device-lg') ) {
          $('#page-menu:not(.dots-menu,.no-sticky)').addClass('sticky-page-menu');
        } else if( $body.hasClass('device-sm') || $body.hasClass('device-xs') || $body.hasClass('device-md') ) {
          if( $body.hasClass('sticky-responsive-pagemenu') ) {
            $('#page-menu:not(.dots-menu,.no-sticky)').addClass('sticky-page-menu');
          }
        }
      } else {
        $('#page-menu:not(.dots-menu,.no-sticky)').removeClass('sticky-page-menu');
      }
    },

    removeStickyness: function(){
      if( $header.hasClass('sticky-header') ){
        $('body:not(.side-header) #header:not(.no-sticky)').removeClass('sticky-header');
        $header.removeClass().addClass(oldHeaderClasses);
        $headerWrap.removeClass().addClass(oldHeaderWrapClasses);
        if( !$headerWrap.hasClass('force-not-dark') ) { $headerWrap.removeClass('not-dark'); }
      }
      if( $header.hasClass('responsive-sticky-header') ){
        $('body.sticky-responsive-menu #header').removeClass('responsive-sticky-header');
      }
      if( ( $body.hasClass('device-sm') || $body.hasClass('device-xs') || $body.hasClass('device-md') ) && ( typeof responsiveMenuClasses === 'undefined' ) ) {
        $header.removeClass().addClass(oldHeaderClasses);
        $headerWrap.removeClass().addClass(oldHeaderWrapClasses);
        if( !$headerWrap.hasClass('force-not-dark') ) { $headerWrap.removeClass('not-dark'); }
      }
    },

    sideHeader: function(){
      $("#header-trigger").click(function(){
        $('body.open-header').toggleClass("side-header-open");
        return false;
      });
    },

    sidePanel: function(){
      $(".side-panel-trigger").click(function(){
        $body.toggleClass("side-panel-open");
        if( $body.hasClass('device-touch') && $body.hasClass('side-push-panel') ) {
          $body.toggleClass("ohidden");
        }
        return false;
      });
    },

    onePageScroll: function(){
      if( $onePageMenuEl.length > 0 ){
        var onePageSpeed = $onePageMenuEl.attr('data-speed'),
          onePageOffset = $onePageMenuEl.attr('data-offset'),
          onePageEasing = $onePageMenuEl.attr('data-easing');

        if( !onePageSpeed ) { onePageSpeed = 1000; }
        if( !onePageEasing ) { onePageEasing = 'easeOutQuad'; }

        $onePageMenuEl.find('a[data-href]').click(function(){
          var element = $(this),
            divScrollToAnchor = element.attr('data-href'),
            divScrollSpeed = element.attr('data-speed'),
            divScrollOffset = element.attr('data-offset'),
            divScrollEasing = element.attr('data-easing');

          if( $( divScrollToAnchor ).length > 0 ) {

            if( !onePageOffset ) {
              var onePageOffsetG = SEMICOLON.initialize.topScrollOffset();
            } else {
              var onePageOffsetG = onePageOffset;
            }

            if( !divScrollSpeed ) { divScrollSpeed = onePageSpeed; }
            if( !divScrollOffset ) { divScrollOffset = onePageOffsetG; }
            if( !divScrollEasing ) { divScrollEasing = onePageEasing; }

            if( $onePageMenuEl.hasClass('no-offset') ) { divScrollOffset = 0; }

            onePageGlobalOffset = Number(divScrollOffset);

            $onePageMenuEl.find('li').removeClass('current');
            $onePageMenuEl.find('a[data-href="' + divScrollToAnchor + '"]').parent('li').addClass('current');

            if( windowWidth < 768 || $body.hasClass('overlay-menu') ) {
              if( $('#primary-menu').find('ul.mobile-primary-menu').length > 0 ) {
                $('#primary-menu > ul.mobile-primary-menu, #primary-menu > div > ul.mobile-primary-menu').toggleClass('d-block', false);
              } else {
                $('#primary-menu > ul, #primary-menu > div > ul').toggleClass('d-block', false);
              }
              $pagemenu.toggleClass('pagemenu-active', false);
              $body.toggleClass('primary-menu-open', false);
            }

            $('html,body').stop(true).animate({
              'scrollTop': $( divScrollToAnchor ).offset().top - Number(divScrollOffset)
            }, Number(divScrollSpeed), divScrollEasing);

            onePageGlobalOffset = Number(divScrollOffset);
          }

          return false;
        });
      }
    },

    onepageScroller: function(){
      $onePageMenuEl.find('li').removeClass('current');
      $onePageMenuEl.find('a[data-href="#' + SEMICOLON.header.onePageCurrentSection() + '"]').parent('li').addClass('current');
    },

    onePageCurrentSection: function(){
      var currentOnePageSection = 'home',
        headerHeight = $headerWrap.outerHeight();

      if( $body.hasClass('side-header') ) { headerHeight = 0; }

      return currentOnePageSection;
    },

    logo: function(){
      if( ( $header.hasClass('dark') || $body.hasClass('dark') ) && !$headerWrap.hasClass('not-dark') ) {
        if( defaultDarkLogo ){ defaultLogo.find('img').attr('src', defaultDarkLogo); }
        if( retinaDarkLogo ){ retinaLogo.find('img').attr('src', retinaDarkLogo); }
      } else {
        if( defaultLogoImg ){ defaultLogo.find('img').attr('src', defaultLogoImg); }
        if( retinaLogoImg ){ retinaLogo.find('img').attr('src', retinaLogoImg); }
      }
      if( $header.hasClass('sticky-header') ) {
        if( defaultStickyLogo ){ defaultLogo.find('img').attr('src', defaultStickyLogo); }
        if( retinaStickyLogo ){ retinaLogo.find('img').attr('src', retinaStickyLogo); }
      }
      if( $body.hasClass('device-sm') || $body.hasClass('device-xs') ) {
        if( defaultMobileLogo ){ defaultLogo.find('img').attr('src', defaultMobileLogo); }
        if( retinaMobileLogo ){ retinaLogo.find('img').attr('src', retinaMobileLogo); }
      }
    },

    stickyMenuClass: function(){
      if( stickyMenuClasses ) { var newClassesArray = stickyMenuClasses.split(/ +/); } else { var newClassesArray = ''; }
      var noOfNewClasses = newClassesArray.length;

      if( noOfNewClasses > 0 ) {
        var i = 0;
        for( i=0; i<noOfNewClasses; i++ ) {
          if( newClassesArray[i] == 'not-dark' ) {
            $header.removeClass('dark');
            $headerWrap.addClass('not-dark');
          } else if( newClassesArray[i] == 'dark' ) {
            $headerWrap.removeClass('not-dark force-not-dark');
            if( !$header.hasClass( newClassesArray[i] ) ) {
              $header.addClass( newClassesArray[i] );
            }
          } else if( !$header.hasClass( newClassesArray[i] ) ) {
            $header.addClass( newClassesArray[i] );
          }
        }
      }
    },

    responsiveMenuClass: function(){
      if( $body.hasClass('device-sm') || $body.hasClass('device-xs') || $body.hasClass('device-md') ){
        if( responsiveMenuClasses ) { var newClassesArray = responsiveMenuClasses.split(/ +/); } else { var newClassesArray = ''; }
        var noOfNewClasses = newClassesArray.length;

        if( noOfNewClasses > 0 ) {
          var i = 0;
          for( i=0; i<noOfNewClasses; i++ ) {
            if( newClassesArray[i] == 'not-dark' ) {
              $header.removeClass('dark');
              $headerWrap.addClass('not-dark');
            } else if( newClassesArray[i] == 'dark' ) {
              $headerWrap.removeClass('not-dark force-not-dark');
              if( !$header.hasClass( newClassesArray[i] ) ) {
                $header.addClass( newClassesArray[i] );
              }
            } else if( !$header.hasClass( newClassesArray[i] ) ) {
              $header.addClass( newClassesArray[i] );
            }
          }
        }
        SEMICOLON.header.logo();
      }
    },

  };

  SEMICOLON.widget = {

    init: function(){

      SEMICOLON.widget.navTree();
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
              element.find( 'ul li' ).not(childElement.parents()).removeClass('active');
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
      $('#page-submenu-trigger').click(function() {
        $body.toggleClass('top-search-open', false);
        $pagemenu.toggleClass("pagemenu-active");
        return false;
      });
      $pagemenu.find('nav').click(function(e){
        $body.toggleClass('top-search-open', false);
        $topCart.toggleClass('top-cart-open', false);
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

      var t = setTimeout( function(){
        SEMICOLON.header.fullWidthMenu();
        SEMICOLON.header.overlayMenu();
        SEMICOLON.initialize.fullScreen();
        SEMICOLON.initialize.maxHeight();
        SEMICOLON.initialize.dataResponsiveClasses();
        if( $body.hasClass('device-xl') || $body.hasClass('device-lg') ) {
          $('#primary-menu').find('ul.mobile-primary-menu').removeClass('d-block');
        }
      }, 500 );

      windowWidth = $window.width();

    }

  };

  SEMICOLON.documentOnReady = {

    init: function(){
      SEMICOLON.initialize.init();
      SEMICOLON.header.init();
      SEMICOLON.widget.init();
      SEMICOLON.documentOnReady.windowscroll();
    },

    windowscroll: function(){

      var headerOffset = 0,
        headerWrapOffset = 0,
        pageMenuOffset = 0;

      if( $header.length > 0 ) { headerOffset = $header.offset().top; }
      if( $header.length > 0 ) { headerWrapOffset = $headerWrap.offset().top; }
      if( $pagemenu.length > 0 ) {
        if( $header.length > 0 && !$header.hasClass('no-sticky') ) {
          if( $header.hasClass('sticky-style-2') || $header.hasClass('sticky-style-3') ) {
            pageMenuOffset = $pagemenu.offset().top - $headerWrap.outerHeight();
          } else {
            pageMenuOffset = $pagemenu.offset().top - $header.outerHeight();
          }
        } else {
          pageMenuOffset = $pagemenu.offset().top;
        }
      }

      var headerDefinedOffset = $header.attr('data-sticky-offset');
      if( typeof headerDefinedOffset !== 'undefined' ) {
        if( headerDefinedOffset == 'full' ) {
          headerWrapOffset = $window.height();
          var headerOffsetNegative = $header.attr('data-sticky-offset-negative');
          if( typeof headerOffsetNegative !== 'undefined' ) { headerWrapOffset = headerWrapOffset - headerOffsetNegative - 1; }
        } else {
          headerWrapOffset = Number(headerDefinedOffset);
        }
      }

      SEMICOLON.header.stickyMenu( headerWrapOffset );
      SEMICOLON.header.stickyPageMenu( pageMenuOffset );

      $window.on( 'scroll', function(){

        $('body.open-header.close-header-on-scroll').removeClass("side-header-open");
        SEMICOLON.header.stickyMenu( headerWrapOffset );
        SEMICOLON.header.stickyPageMenu( pageMenuOffset );
        SEMICOLON.header.logo();

      });

      if( $onePageMenuEl.length > 0 ){
        if( $().scrolled ) {
          $window.scrolled(function() {
            SEMICOLON.header.onepageScroller();
          });
        } else {
          console.log('windowscroll: Scrolled Function not defined.');
        }
      }
    }

  };

  SEMICOLON.documentOnLoad = {

    init: function(){
      SEMICOLON.initialize.maxHeight();
      SEMICOLON.initialize.stickFooterOnSmall();
      SEMICOLON.initialize.stickyFooter();
      SEMICOLON.header.responsiveMenuClass();
    }

  };

  var $window = $(window),
    $body = $('body'),
    $wrapper = $('#wrapper'),
    $header = $('#header'),
    $headerWrap = $('#header-wrap'),
    $content = $('#content'),
    $footer = $('#footer'),
    windowWidth = $window.width(),
    oldHeaderClasses = $header.attr('class'),
    oldHeaderWrapClasses = $headerWrap.attr('class'),
    stickyMenuClasses = $header.attr('data-sticky-class'),
    responsiveMenuClasses = $header.attr('data-responsive-class'),
    defaultLogo = $('#logo').find('.standard-logo'),
    defaultLogoWidth = defaultLogo.find('img').outerWidth(),
    retinaLogo = $('#logo').find('.retina-logo'),
    defaultLogoImg = defaultLogo.find('img').attr('src'),
    retinaLogoImg = retinaLogo.find('img').attr('src'),
    defaultDarkLogo = defaultLogo.attr('data-dark-logo'),
    retinaDarkLogo = retinaLogo.attr('data-dark-logo'),
    defaultStickyLogo = defaultLogo.attr('data-sticky-logo'),
    retinaStickyLogo = retinaLogo.attr('data-sticky-logo'),
    defaultMobileLogo = defaultLogo.attr('data-mobile-logo'),
    retinaMobileLogo = retinaLogo.attr('data-mobile-logo'),
    $pagemenu = $('#page-menu'),
    $onePageMenuEl = $('.one-page-menu'),
    onePageGlobalOffset = 0,
    swiperSlider = '',
    $pageTitle = $('#page-title'),
    $fullScreenEl = $('.full-screen'),
    $commonHeightEl = $('.common-height');

  $(document).ready( SEMICOLON.documentOnReady.init );
  $window.on( 'load', SEMICOLON.documentOnLoad.init );
  $window.on( 'resize', SEMICOLON.documentOnResize.init );

})(jQuery);
