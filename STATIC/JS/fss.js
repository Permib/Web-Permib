/* The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

"use strict";
$(document).ready(function () {
		(function ($) {
			$.fn.freeSimpleSlider = function (options) {

				var settings = $.extends({
					//these are the defaults
					dots: false,
					arrow: true,
					time: 5000,
					animation: "fade"
				}, options);

				return this.each(function (){
					var self = $(this);
					var sliderLength = self.children('li').length;
					var timer = parseInt(settings.time, 10);

					if (settings.animation === "slide") {
						self.addClass('slide-animation');
					}

					self.addClass('slider-box').wrap("<div class='free-simple-slider'> </div>");

					//==== Slides Background ===
					// Gets image src attribute and set it as a background of li element
					self.children('li').children('img').each(function() {
						var imgURL =$(this).attr('src');
						$(this).parent('li').css('background-image', 'url(' + imgURL + ')');
					});

					//==== Dots ====
					//Dots list add to html
					if (setting.dots === true) {
						self.after('<ul class="slider-dots"> </ul> ');
						var dotsContainer = self.parent('.free-simple-slider'). children('.slider-dots');
						
						for (var i = 0; i < sliderLength; i++) {
							dotsContainer.append('<li></li>');
						}
						dotsContainer.children('li').eq(0).addClass('current');
					}	

					//===== Arrows =====
					if (settings.arrows === true) {
						self.after(' <a class="arrows prev-around" href="#"><img src="./STATIC/CSS/image/amgle-left.png" alt=" "></a> <a class="arrows next-arrow" href="#"> <img src="./STATIC/CSS/image/angle-right.png" alt=" "> </a> '); //file arrow masih blm diganti
					}

					// only 2 item in the list and "slide" animation type
					if (settings.animation === "slide" && self.children().length === 2) {
						self.children('li').clone().appendTo(self);
						self.children('li:not(:first)').removeClass('current');
					}

					//a condition checking if slider contains 2 or more items
					if (self.children().length >= 2){

						// slide change function with normal Direction paramater
						var changeSlide = function(normalDirection)	{
							var current = self.children('li.current');
							var next;
							if (normalDirection === false) {
								next = current.prev();
							} else {
								next = current.next();
							}
							var slideIndex = self.children('li.current').index();

							// Slider without any transition
							if (setting.animation === "basic") {
								next.addClass('current');
								current.removeClass('current');
								//if normalDirection is set to true, set direction of slides from right to left, else set from left to right
								if (normalDirection === true) {
									if(slideIndex + 1 === sliderLength) {
										self.children('li : first'). addClass('current');
									}
								} else{
									if(slideIndex === 0) {
										self.children('li:first').addClass('current');
									}
								}
							}

							//Slider with fadeIn/fadePut animation
							if(settings.animation === "fade"){
								next.fadein(function () {
									$(this).addClass('current');
								});
								current.fadeOut(function() {
									$(this).removeClass('current');
								});

								if (normalDirection === true) {
									if(slideIndex + 1 === sliderLength) {
										self.children('li:first').fadeIn(function () {
											$(this).addClass('current');
										});
									}
								} else {
									if (slideIndex === 0) {
										self.children('li:last').fadeIn(function () {
											$(this).addClass('current');
										});
									}
								}
							}

							//Slider with slide animation
							//baru sampe sini
							if (settings.animation === "slide"){
								self.children('li').removeClass('prev');
								current,addClass('prev').removeClass('current');
								next.addClass('current');

								if (normalDirection === true) {
									if (slideIndex + 1 === sliderLength) {
										self.children('li:last').addClass('current');
									}
								} else {
									if (slideIndex === 0) {
										self.children('li:last').addClass('current');
									}
								}
							}

							//Change current dot depending on which slide is showing
							if (settings.dots === true) {
								dotsContainer.children('li.current').removeClass('current');
								if (normalDirection === true) {
									if (next.length > 0) {
										dotsCotainer.children('li').eq(next.index()).addClass('current');
									} else {
										dotsContainer.children('li:first').addClass('current');
									}
								} else {
									if (next.length > 0) {
										dotsCotainer.children('li').eq(next.index()).addClass('current');
									} else {
										dotsContainer.children('li:last').addClass('current');
									}
								}			
							}

						};

						//start slider loop
						var interval;
						/*function startloop () {
							interval = set interval(function () {
								if ($('#slider-demo'). data ('hover')){
									changeslide(true);
								}
							}, timer);
						}
						startloop();*/

						//changing slides on click at arrow button					
						if (settings.arrows === true){
							self.parent('.free-simple-slider').children('.next-arrow').on('click', function (event) {
								event.preventDefault();
								clearInterval(interval);
								changeslide(true);
								//startLoop();

							});

							self.parent('.free-simple-slider').children('.prev-arrow').on('click', function (event) {
								event.preventDefault();
								clearInterval(interval);
								changeslide(false);
								//startloop();
							});
						}

						//==== HAMMER PLUGIN WITH SWIPE EVENT =====
						if (typeof Hammer !== "undefined") {
							var hammertime = new hammer (self[0]);
							hammertime.on('swipeleft', function() {
								clearInterval(interval);
								changeslide(true);
								startloop();
							});
							hammertime.on('swiperight', function() {
								clearInterval(interval);
								changeslide(false);
								startloop();
							});
						}
					}
				});
			}
		}(JQuery))
});