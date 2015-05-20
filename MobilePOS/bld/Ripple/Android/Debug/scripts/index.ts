// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
module MobilePOS {
    "use strict";

    export module Application {

        var scannedBarcodes = [];

        export function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }

        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);

            document.getElementById("scanBtn").addEventListener("click", scanAndShow);

            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        }

        function scanAndShow() {
            cordova.plugins.barcodeScanner.scan(
                // success callback function
                function (result) {
                    // wrapping in a timeout so the dialog doesn't free the app
                    setTimeout(function () {
                        //alert("We got a barcode\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled:" + result.cancelled);
                        if (result.cancelled === false) {
                            scannedBarcodes.push(result.text);

                            document.getElementById(result.text).style.background = '#92B9DD';
                            document.getElementById('itemsInCart').innerHTML = scannedBarcodes.length + " items in cart";

                            var notficationMsg = result.text + " added to your cart!";

                            notificationAlert(notficationMsg, "Success");
                        }
                    }, 0);
                },
                // error callback function
                function (error) {
                    notificationAlert("Scanning failed!", "Error");
                });

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
