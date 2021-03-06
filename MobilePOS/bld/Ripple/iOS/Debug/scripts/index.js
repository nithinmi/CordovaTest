﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
/// <reference path="jquery.d.ts"/>
var MobilePOS;
(function (MobilePOS) {
    "use strict";

    (function (Application) {
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;

        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);

            window.StatusBar.overlaysWebView(false);
            window.StatusBar.backgroundColorByName("black");
            window.StatusBar.styleBlackOpaque();

            navigator.splashscreen.show();

            setTimeout(function () {
                navigator.splashscreen.hide();

                // checking 3g/wifi connection
                checkConnection();

                document.getElementById("devicePlatform").innerHTML = " Platform: " + device.platform;
                document.getElementById("deviceModel").innerHTML = "Model: " + device.model;

                navigator.geolocation.getCurrentPosition(onGPSuccess, onGPError);

                document.getElementById("scanBtn").addEventListener("click", scanAndShow);

                document.getElementById("btnCheckOut").addEventListener("click", processPayment);

                document.getElementById("customerList").addEventListener("click", displayContacts);
                // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            }, 3000);
        }

        function displayContacts() {
            var options = new ContactFindOptions();
            options.filter = "";
            options.multiple = true;
            var fields = ["name", "displayName", "phoneNumbers"];
            navigator.contacts.find(fields, onSuccess, onError, options);

            function onSuccess(contacts) {
                var str = "";
                var num = 0;
                if (contacts.length > 5) {
                    num = 5;
                } else {
                    num = contacts.length;
                }
                for (var i = 0; i < num; i++) {
                    if (contacts[i].name.formatted) {
                        str = str + "\n" + contacts[i].name.formatted;
                    } else {
                        str = str + "\n" + contacts[i].displayName;
                    }

                    var phones = " ";
                    for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                        phones += " Ph# " + contacts[i].phoneNumbers[j].value;
                    }
                    str += phones;
                }
                notificationAlert(str, "Contacts");
            }

            // onError: Failed to get the contacts
            function onError(contactError) {
                alert('onError!');
            }
        }

        var onGPSuccess = function (position) {
            document.getElementById("lattitude").innerHTML = " Latitude: " + position.coords.latitude;
            document.getElementById("longitude").innerHTML = " Longitude: " + position.coords.longitude;
            document.getElementById("altitude").innerHTML = " Altitude: " + position.coords.altitude;
        };

        function onGPError(error) {
            document.getElementById("lattitude").innerHTML = " Latitude: " + 0;
            document.getElementById("longitude").innerHTML = " Longitude: " + 0;
            document.getElementById("altitude").innerHTML = " Altitude: " + 0;
        }

        function scanAndShow() {
            cordova.plugins.barcodeScanner.scan(function (result) {
                // wrapping in a timeout so the dialog doesn't free the app
                setTimeout(function () {
                    if ((result.cancelled == false) || (result.cancelled == 0)) {
                        //only works in android. iPad has no vibration
                        navigator.notification.vibrate(1000);

                        if (document.getElementById(result.text)) {
                            document.getElementById(result.text).style.background = '#92B9DD';

                            if ($("#cartItems #C_" + result.text).length) {
                                var item = $("#cartItems #C_" + result.text);
                                var qtyx = item.children('.qty');
                                var qty = parseInt(qtyx.text().trim().substring(2));
                                qty = qty + 1;
                                qtyx.text("x " + qty);
                            } else {
                                var item = $("<li />");
                                item.attr('id', 'C_' + result.text);
                                item.append("<span class='product-name' >" + document.getElementById(result.text).childNodes[2].textContent + "</span>");
                                item.append("<span class='qty'>x 1</span>");
                                item.append("<div class='price'>" + document.getElementById(result.text).childNodes[4].textContent + "</div>");
                                item.append("<a href='#' class='item-remove img-replace'></a>");

                                $("#cartItems").append(item);
                            }
                            var notficationMsg = result.text + " added to your cart!";
                            notificationAlert(notficationMsg, "Success");

                            $('html, body').animate({
                                scrollTop: $("#" + result.text).offset().top
                            }, 500);

                            var total = 0.0;
                            $("#cartItems li").each(function (index) {
                                var pricex = $(this).children('.price');
                                var price = parseFloat(pricex.text().trim().substring(1));
                                var qtyx = $(this).children('.qty');
                                var qty = parseInt(qtyx.text().trim().substring(2));
                                total += (qty * price);
                            });

                            $("#cart_Total").text("$" + parseFloat(total.toString()).toFixed(2));
                        } else {
                            notificationAlert("No matching product found!", "Info");
                        }
                    } else {
                        notificationAlert("Scanning Cancelled!", "Info");
                    }
                }, 0);
            }, function (error) {
                notificationAlert("Scanning failed!", "Error");
            });
        }
        function notificationAlert(notficationMsg, notificationTitle) {
            navigator.notification.alert("\n" + notficationMsg + "\n", alertDismissed, notificationTitle, 'Done');
        }
        function alertDismissed() {
            // do something
        }

        function processPayment() {
            var xmlData = "<Payment>" + "<PaymentInvoices>" + "<PaymentInvoice>" + "<InvoiceId>" + "186808" + "</InvoiceId>" + "<PaymentAmount>" + "20" + "</PaymentAmount>" + "</PaymentInvoice>" + "</PaymentInvoices>" + "</Payment> ";

            $.ajax({
                type: 'POST',
                data: xmlData,
                contentType: 'text/xml',
                accept: 'version_1.0',
                url: 'http://192.168.193.197/wholesaleapi/Payments/?requestPersonId=28946&requestCustomerId=3681',
                success: function (data) {
                    setTimeout(function () {
                        $('.loader').hide();
                        notificationAlert("Reference No: " + JSON.stringify(data).substr(24, 3), "Payment Accepted");
                    }, 2000);
                },
                error: function () {
                    setTimeout(function () {
                        $('.loader').hide();
                        notificationAlert("Payment was not successful!", "Error");
                    }, 2000);
                },
                beforeSend: function () {
                    $('.loader').show();
                },
                complete: function () {
                }
            });
        }

        function checkConnection() {
            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN] = 'Unknown';
            states[Connection.ETHERNET] = 'Ethernet';
            states[Connection.WIFI] = 'WiFi';
            states[Connection.CELL_2G] = 'Cell 2G';
            states[Connection.CELL_3G] = 'Cell 3G';
            states[Connection.CELL_4G] = 'Cell 4G';
            states[Connection.CELL] = 'Cell Generic';
            states[Connection.NONE] = 'No Network';
            notificationAlert(states[networkState], "Network Connection");
        }

        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }

        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }
    })(MobilePOS.Application || (MobilePOS.Application = {}));
    var Application = MobilePOS.Application;

    window.onload = function () {
        Application.initialize();
    };
})(MobilePOS || (MobilePOS = {}));
//# sourceMappingURL=index.js.map
