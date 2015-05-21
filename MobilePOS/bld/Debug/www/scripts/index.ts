// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

/// <reference path="jquery.d.ts"/>

module MobilePOS {
    "use strict";

    export module Application {

        export function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }

        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);

            document.getElementById("deviceName").innerHTML = " Device: " + device.name;
            document.getElementById("devicePlatform").innerHTML = " Platform: " + device.platform;
            document.getElementById("deviceModel").innerHTML =  "Model: " + device.model;

            navigator.geolocation.getCurrentPosition(onSuccess, onError);
            
            // navigator.splashscreen.show();

            document.getElementById("scanBtn").addEventListener("click", scanAndShow);

            document.getElementById("btnCheckOut").addEventListener("click", processPayment);

            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        }

        var onSuccess = function (position) {
            document.getElementById("lattitude").innerHTML = " Latitude: " + position.coords.latitude;
            document.getElementById("longitude").innerHTML = " Longitude: " + position.coords.longitude;
            document.getElementById("altitude").innerHTML = " Altitude: " +position.coords.altitude;
        };

        function onError(error) {
            document.getElementById("lattitude").innerHTML = " Latitude: " + 0;
            document.getElementById("longitude").innerHTML = " Longitude: " + 0;
            document.getElementById("altitude").innerHTML = " Altitude: " + 0;
        }


        function scanAndShow() {
            cordova.plugins.barcodeScanner.scan(
                // success callback function
                function (result) {
                    // wrapping in a timeout so the dialog doesn't free the app
                    setTimeout(function () {
                        //alert("We have a barcode\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled:" + result.cancelled);
                        if ((result.cancelled == false) || (result.cancelled == 0)) {

                            //only works in android. iPad has no vibration
                            navigator.notification.vibrate(1000);

                            if (document.getElementById(result.text)) {
                                document.getElementById(result.text).style.background = '#92B9DD';

                                var item = $("<li />");
                                item.append("<span class='product-name' >" + document.getElementById(result.text).childNodes[2].textContent + "</span>")
                                item.append("<span class='qty' > 1x </span>");
                                item.append("<div class='price'>" + document.getElementById(result.text).childNodes[4].textContent + "</div>");
                                item.append("<a href='#' class='item-remove img-replace'></a>");

                                $("#cartItems").append(item);

                                var notficationMsg = result.text + " added to your cart!";
                                notificationAlert(notficationMsg, "Success");

                                $('html, body').animate({
                                    scrollTop: $("#" + result.text).offset().top
                                }, 500);

                                var total = 0.0;
                                $("#cartItems li").each(function (index) {
                                    var price = $(this).children('.price').text();
                                    total += parseFloat(price.substring(1, price.length - 1));
                                });

                                $("#cart_Total").text("$" + parseFloat(total.toString()).toFixed(2));

                            }
                            else {
                                notificationAlert("No matching product found!", "Info");
                            }
                        }
                        else {
                            notificationAlert("Scanning Cancelled!", "Info");
                        }
                    }, 0);
                },
                // error callback function
                function (error) {
                    notificationAlert("Scanning failed!", "Error");
                });
        }
        function notificationAlert(notficationMsg, notificationTitle) {
            navigator.notification.alert(
                notficationMsg,  // message
                alertDismissed,         // callback
                notificationTitle,            // title
                'Done'                  // buttonName
                );
        }
        function alertDismissed() {
            // do something
        }

        function processPayment() {
            var xmlData = "<Payment>" + 
                          "<PaymentInvoices>" +
                            "<PaymentInvoice>" + 
                                 "<InvoiceId>" +
                                      "186808" +
                                "</InvoiceId>" +
                                 "<PaymentAmount>" +
                                        "20" + 
                                 "</PaymentAmount>" +
                            "</PaymentInvoice>" + 
                        "</PaymentInvoices>" +
                     "</Payment> ";

            $.ajax({
                type: 'POST',
                data: xmlData,
                contentType: 'text/xml',
                accept: 'version_1.0',
                url: 'http://192.168.193.197/wholesaleapi/Payments/?requestPersonId=28946&requestCustomerId=3681',
                success: function (data) {
                    notificationAlert("Payment ID: "  + JSON.stringify(data).substr(24, 3), "Success");
                }
            });
        }



        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }

        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }

    }

    window.onload = function () {
        Application.initialize();
    }
}
