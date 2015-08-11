;(function($){

	"use strict";

	var Core = {

		DOMReady: function(){

			var self = this;

			self.dropdown();
			self.tabs();
			self.stickyHeader.init();
			self.responsiveHorizontalNavigation.init();
			self.backToTopBtn();

		},

		windowLoad: function(){

			var self = this;

			// self.stickyHeader.init();
			
		},

		windowScroll: function(){

			var self = this;
			
			// self.sticky();
		},

		windowResize: function(){

			var self = this;

			self.responsiveHorizontalNavigation.init();

		},

		/**
		**	Dropdown
		**/

		dropdown : function(){

		    $('.languages_dropdown>a').on('click',function(){

		    	$(this).parents('.languages_dropdown').toggleClass('active');

		    });

	    	$(document).click(function(event) {

				if ($(event.target).closest(".languages_dropdown").length) return;
				$(".languages_dropdown").removeClass('active');
				event.stopPropagation();

			});

		},


		/**
		**	Responsive menu
		**/

		responsiveHorizontalNavigation: {

			init: function(){

				var self = this;

				self.nav = $('.navigation');
				self.w = $(window);
				self.d = $(document);
				self.mButton = $('.toggle_menu_btn');
				self.aButton = $('.additional_btn');
				self.isStickyInit = $('.sticky_part');

				self.checkWidthMenu();

				if(Core.ISTOUCH || self.w.width() < 768){																
					
					self.checkViewPort();
				
				};

				self.w.on('resize.responsiveNav', function(){

					if(Core.ISTOUCH || self.w.width() < 768){

						self.checkViewPort();
						
					}

				});

			},

			checkWidthMenu : function(){

				var self = this,
					fullWidh = 0,
					navWrap = $('.nav_wrap').width();

				$(".navigation>li").each(function(){

					fullWidh += $(this).width();

				});


				if(fullWidh > (navWrap-303) && self.w.width() > 767){


					if(!self.aButton.length){

						self.generateList();

					}

					setTimeout(function(){

						self.additionalMenu();
					
					},100);
				}

				else if(self.w.width() < 768){

					$('.additional_menu>li').each(function(){

						$(this).appendTo(".navigation");

					});

				}

			},

			generateList : function(){

				var self = this;

				self.mList = $('<div></div>', {
					html: '<button class="additional_btn">Other <i class="fa fa-angle-down"></i></button><ul class="additional_menu"></ul>',
				class: 'additional_menu_box'
				}).insertAfter(self.nav);

				$('.additional_btn').on('click', function(){

					var $this = $(this);

					$this.toggleClass('active');

					$this.parent('.additional_menu_box').toggleClass('active');

				});

				self.d.click(function(event) {

					if ($(event.target).closest(".additional_menu_box").length) return;
					$(".additional_menu_box").removeClass('active');
					$(".additional_btn").removeClass('active');
					event.stopPropagation();

				});

			},

			additionalMenu : function(){

				var maxWidth = $('.nav_wrap').width()-303,
					itemWidth = 0;

				$('.additional_menu>li').each(function(){

					$(this).appendTo(".navigation");

				});

				$(".navigation>li").each(function(){

					var $this = $(this);

					itemWidth += $this.width();

					if(itemWidth > maxWidth){

						$this.appendTo(".additional_menu");

					}				

				});

			},

			checkViewPort: function(){

				var self = this;

				self.unbindEvents();
				self.closeOpenedMenus();

				// tablets
				if(self.w.width() > 767 && self.w.width() < 1200){
					self.initTabletEvents();
				}
				// mobile
				else if(self.w.width() < 768){

					self.initMobileEvents();

					if(!self.mButton.length){

						self.generateBtn();

					}

				}

			},

			unbindEvents: function(){

				var self = this;

				self.nav.off('click', 'a');
				self.d.off('.navFocusOut');

			},

			closeOpenedMenus: function(){

				var self = this;

				if(self.w.width() < 768){

					self.nav.find('.t_active').removeClass('t_active').children('.dropdown').slideUp(function(){

						if(self.isStickyInit.data('stickyInit')) Core.stickyHeader.initHeaderParameters();

					});

					self.nav.slideUp(function(){

						if(self.isStickyInit.data('stickyInit')) Core.stickyHeader.initHeaderParameters();

					});

					self.mButton.removeClass('active');

				}
				else{
				
					self.nav.find('.t_active').removeClass('t_active');

				}

				self.nav.find('.prevented').removeClass('prevented');

			},

			initTabletEvents: function(){

				var self = this;

				self.nav.on('click.tablet', 'a', function(e){

					var $this = $(this),
						hasSubmenu = $this.parent().hasClass('has_submenu') || 
						$this.parent().hasClass('has_megamenu') ||
						$this.next('.dropdown').length;

					if(hasSubmenu && !$this.hasClass('prevented')){

						$this.addClass('prevented')
						.parent()
						.addClass('t_active')
						.siblings()
						.removeClass('t_active')
						.children('a')
						.removeClass('prevented');

						e.preventDefault();

					}

				});

				self.d.on('click.navFocusOut', function(event){

					if(!$(event.target).closest(self.nav).length) self.closeOpenedMenus();

				});

			},

			initMobileEvents: function(){

				var self = this;

				self.nav.on('click.mobile', 'a', function(e){

					var $this = $(this),
						hasSubmenu = $this.parent().hasClass('has_submenu') || 
						$this.parent().hasClass('has_megamenu') ||
						$this.next('.dropdown').length;

					if(hasSubmenu && !$this.hasClass('prevented')){

						$this.addClass('prevented')
						.next()
						.slideDown(function(){

							if(self.isStickyInit.data('stickyInit')) Core.stickyHeader.initHeaderParameters();

						})
						.parent()
						.addClass('t_active')
						.siblings()
						.removeClass('t_active')
						.children('a')
						.removeClass('prevented')
						.next()
						.slideUp(function(){

							if(self.isStickyInit.data('stickyInit')) Core.stickyHeader.initHeaderParameters();

						});

						e.preventDefault();

					}

				});

			},

			generateBtn: function(){

				var self = this;

				self.mButton = $('<button></button>', {
				html: '<i class="fa fa-bars"></i>',
				class: 'toggle_menu_btn'
				}).insertBefore(self.nav);

				self.mButton.on('click', function(){

					var $this = $(this);

					$this.toggleClass('active');

					$this.next().slideToggle(function(){

						if(self.isStickyInit.data('stickyInit')) Core.stickyHeader.initHeaderParameters();

					});

				});

			}

		},


		/**
		**	Back to top
		**/

		backToTopBtn: function(config){

			config = $.extend({
				offset: 350,
				transitionIn: 'bounceInRight',
				transitionOut: 'bounceOutRight'
			}, config);

			var btn = $('<button></button>', {
				class: 'back_to_top icon_only rd-grey animated hide',
				html: '<i class="fa fa-angle-up"></i>'
			}).appendTo($('body')),

			$wd = $(window),
			$html = $('html'),
			$body = $('body');

			$wd.on('scroll.back_to_top', function(){

				if($wd.scrollTop() > config.offset){

					btn.removeClass('hide '+config.transitionOut).addClass(config.transitionIn);

				}
				else{

					btn.removeClass(config.transitionIn).addClass(config.transitionOut);

				}

			});

			btn.on('click', function(){

				$html.add($body).animate({

					scrollTop: 0

				});

			});

	   	},



		/**
		**	Sticky
		**/

		stickyHeader: {

			init: function(){

				this.sticky = $('.sticky_part');
				this.w = $(window);
				this.body = $('body');

				this.initHeaderParameters();
				this.toggleSticky();
				this.bindEvents();

			},

			initHeaderParameters: function(){

				var self = this;

				self.hHeight = self.sticky.outerHeight();
				self.hOffset = self.sticky.offset().top;
				self.sticky.data('stickyInit', true);

			},

			toggleSticky: function(){

				var self = this;

				if(self.w.scrollTop() > self.hOffset && !self.sticky.hasClass('sticky_enabled')){
					self.sticky.addClass('sticky_enabled');
					self.disableEmptyArea(true);
				}
				else if(self.w.scrollTop() <= self.hOffset){
					self.sticky.removeClass('sticky_enabled');
					self.disableEmptyArea(false);
				}

			},

			bindEvents: function(){

				var self = this;

				self.w.on('scroll.sticky', function(){

					self.toggleSticky();

				});

				self.w.on('resize.sticky', self.initHeaderParameters.bind(self));

			},

			disableEmptyArea: function(isNeed){

				var self = this;

				if(isNeed){
					self.body.css('padding-top', self.hHeight);
				}
				else{
					self.body.css('padding-top', 0);
				}

			}

		},

		// sticky : function(){

		// 	var windowScroll = $(window).scrollTop(),
		// 		offset = $('.sticky_part').offset().top,
		// 		sticky = $('.sticky_part').width(),
		// 		nav = $(".nav_wrap");

		// 	nav.width(sticky);

		// 	if(windowScroll>offset){
				
		// 		nav.addClass('fix_menu');				
		// 	}

		// 	else{

		// 		nav.removeClass('fix_menu');

		// 	}

		// },



		/**
		**	Tabs
		**/

		tabs : function(){

			$('.tabs_list li').on('click',function(){

				var $this = $(this),
					index = $this.index(),
					parent = $this.parents('.tabs_box');

				$this.addClass('active').siblings().removeClass('active');

				parent.find('.tabs_content>div').eq(index).addClass('active').siblings().removeClass('active');

			});

		}

	}


	$(function(){

		Core.DOMReady();

	});

	$(window).load(function(){

		Core.windowLoad();

	});

	$(window).scroll(function(){

		Core.windowScroll();
		
	});

	$(window).on("resize",function(){

		Core.windowResize();
		
	});


})(jQuery);