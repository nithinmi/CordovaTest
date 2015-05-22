$(document).ready(function($){
	//Breakpoint --- need to match the breakpoint in the ap21.css
	var $L = 1200,
		$cart_trigger = $('#cart-trigger'),
		$lateral_cart = $('#cart'),
		$shadow_layer = $('#shadow-layer');

	//open cart
	$cart_trigger.on('click', function(event){
		event.preventDefault();
		//close lateral menu (if it's open)
		toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
	});

	//close lateral cart or lateral menu
	$shadow_layer.on('click', function(){
		$lateral_cart.removeClass('speed-in');
		$shadow_layer.removeClass('is-visible');
		$('body').removeClass('overflow-hidden');
	});

});

function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
	if( $lateral_panel.hasClass('speed-in') ) {
		$lateral_panel.removeClass('speed-in');
		$background_layer.removeClass('is-visible');
		$body.removeClass('overflow-hidden');
	} else {
		$lateral_panel.addClass('speed-in');
		$background_layer.addClass('is-visible');
		$body.addClass('overflow-hidden');
	}
}