$(document).ready(function(){
	/** Language **/
	$('.show-all').click(function(){
		$('.all-language').show();
	});
	
	$('.hide-all-lan').click(function(){
		$('.all-language').hide();
		//$('.dropdown-menu').show();
	});
	
	/** Selected MSG **/
	$('.msg').click(function(){
		$('.msg-icon').show();
		$('.email-icon').hide();
		$('.ph-icon').hide();
	});
	
	$('.ph').click(function(){
		$('.ph-icon').show();
		$('.msg-icon').hide();
		$('.email-icon').hide();
	});
	
	$('.email').click(function(){
		$('.email-icon').show();
		$('.ph-icon').hide();
		$('.msg-icon').hide();
		$('.message').show();
	});
	
	
	/** Pop up **/
	$('.succes-password').click(function(){
		$('.popup-section').show();
	});
	$('.close').click(function(){
		$('.popup-section').hide();
	});
	
	
	/** Menu **/
	$('.mobile_sub_menu').click(function(){
		var getDiv = $('.sub_menu');
		if(getDiv.is(':visible')){
			getDiv.slideUp();
			$(this).addClass('down_arrow').removeClass('top_arrow');
		}else{
			getDiv.slideDown();
			$(this).addClass('top_arrow').removeClass('down_arrow');
		}
	});
	
	$('.toggle_menu').click(function(){
		$('.mobile_section').toggleClass('nav-wrapper-opened');
	});
	$('.succes-password').click(function(){
		$('.popup-section').show();
	});
	
	$('.succes-password').click(function(){
		$('.popup-section').show();
	});
	$('.closed').click(function(){
		$('.mobile_section').removeClass('nav-wrapper-opened');
	});
	
	/** Study information **/
	$('.skip').click(function(){
		$('.letter').hide();
	});
	
	$('.show-video').click(function(){
		$('.video-column').show();
	});
});