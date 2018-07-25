$('#signup').hide();

$(document).ready(function(){
	/* Default Settings */
	$('input').prev('label').addClass('inactive');

	$('.tab a').on('click', function(e){
		e.preventDefault(); /* to stop default action */

		/* To activate login or signup tab */
		$(this).addClass('activate');
		$(this).parent().siblings().children().removeClass('activate');

		/* To hide or show the login and signup form */
		target = $(this).attr('href');
		$('#tab_content > div').not(target).hide();
		$(target).fadeIn(600);
	});

     /* Form elements */
	$('input').focus(function(){
		$(this).prev('label').addClass('active');
	});/* input focus function */

	$('input').blur(function(){
		var $this = $(this);
		if ( $this.val() === '' ) {
			$(this).prev('label').removeClass('active');
			$(this).prev('label').addClass('inactive');
		}
		else {
			$(this).prev('label').removeClass('inactive');
			$(this).prev('label').addClass('active');
		}
	});/* input blur function */
});/* document.ready */
