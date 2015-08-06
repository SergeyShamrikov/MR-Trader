;(function($){

	"use strict";

	var Core = {

		DOMReady: function(){

			var self = this;

			self.dropdown();
			self.responsiveHorizontalNavigation.init();

		},

		windowLoad: function(){

			var self = this;

			// self.checkSubmenu();
			
		},

		windowScroll: function(){

			var self = this;
			
			// self.goUp();
		},

		windowResize: function(){

			var self = this;

			// self.additionalMenuItem();
			self.responsiveHorizontalNavigation.init();

		},

		/**
		**	Dropdown
		**/

		dropdown : function(){

		    $('.languages_dropdown>a').on('click',function(){

		    	$(this).parents('.languages_dropdown').toggleClass('active');

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
				self.isStickyInit = $('.sticky_part');

				if(Core.ISTOUCH || self.w.width() < 768){																
					
					self.checkViewPort();

					self.w.on('resize.responsiveNav', function(){

						self.checkViewPort();

					});
				
				};


			},

			generateList : function(){

				var self = this;

				self.mList = $('<div></div>', {
					html: '<button>Other</button><ul class="additional_menu"></ul>',
				class: 'additional_menu_box'
				}).insertAfter(self.nav);

			},

			additionalMenu : function(){

				var maxWidth = $('.navWrap').width()-303,
					itemWidth = 0,
					additionalBtn = $('.additional_menu_box>').width();

				$('.additional_menu>li').each(function(){

					$(this).appendTo(".navigation");

				});

				$(".main_menu>li").each(function(){

					var $this = $(this);

					itemWidth += $(this).width();

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
		**	Main menu
		**/

		mainMenu : function(){


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