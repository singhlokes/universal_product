(function ($) {
	"use strict";
	var G5PlusGoogleMap = {
		init: function() {
			var mapStyleArr = [];
			mapStyleArr['none'] = [];
			mapStyleArr['gray_scale'] = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
			mapStyleArr['icy_blue'] = [{"stylers":[{"hue":"#2c3e50"},{"saturation":250}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":50},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]}];
			mapStyleArr['mono_green'] = [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#8dcaaa"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#8dcaaa"},{"lightness":"60"},{"saturation":"20"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#8dcaaa"},{"lightness":"-40"},{"weight":"3"},{"saturation":"10"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":"-20"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":"-15"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":"-35"}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":"-10"}]}];
			$('.wolverine-google-map ').each(function () {
				var locationX = $(this).attr('data-location-x');
				var locationY = $(this).attr('data-location-y');
				var layout = $(this).attr('data-layout-style');
				var markerTitle = $(this).attr('data-marker-title');
				var markerIcon = $(this).attr('data-marker-icon');
				var mapZoom = $(this).attr('data-map-zoom');
				var mapStyle = $(this).attr('data-map-style');
				var infoHtml = $(this).attr('data-info-html');
				var infoMaxWidth = $(this).attr('data-info-max-width');
				var infoBg = $(this).attr('data-info-bg');
				var infoColor = $(this).attr('data-info-color');
				if (locationX == '') {
					locationX = 0;
				}
				if (locationY == '') {
					locationY = 0;
				}
				if (mapZoom == '') {
					mapZoom = 11;
				}
				mapZoom = parseInt(mapZoom, 10);
				if (typeof (mapStyleArr[mapStyle]) == "undefined") {
					mapStyle = 'none';
				}

				// Basic options for a simple Google Map
				// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
				var location=new google.maps.LatLng(locationX, locationY);
				var mapOptions = {
					// How zoomed in you want the map to start at (always required)
					zoom: mapZoom,
					scrollwheel: false,

					// The latitude and longitude to center the map (always required)
					center: location, // New York

					// How you would like to style the map.
					// This is where you would paste any style found on Snazzy Maps.
					styles: mapStyleArr[mapStyle]
				};

				// Get the HTML DOM element that will contain your map
				// We are using a div with id="map" seen below in the <body>
				var mapElement = this;

				// Create the Google Map using our element and options defined above
				var map = new google.maps.Map(mapElement, mapOptions);
				if(layout=='infowindow')
				{
					var infoWindow = new google.maps.InfoWindow({maxWidth: infoMaxWidth});
					infoWindow.setContent(infoHtml);
					infoWindow.setPosition(location);
					infoWindow.open(map);
					map.addListener('zoom_changed', function() {
						infoWindow.setContent(infoHtml);
						infoWindow.open(map);
					});
					google.maps.event.addListener(map, 'tilesloaded', function() {
						$('.gm-style-iw',mapElement).css('color',infoColor);
						$('.gm-style-iw',mapElement).prev().children().last().css('background-color',infoBg);
						$('.gm-style-iw',mapElement).prev().children().last().prev().children().children().css('background-color',infoBg);
					});
				}
				else
				{
					var marker = new google.maps.Marker({
						position: location,
						map: map,
						title: markerTitle,
						icon: markerIcon
					});
				}
			});
		}
	};
	$(document).ready(G5PlusGoogleMap.init);
})(jQuery);