// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
var MobilePOS;
(function (MobilePOS) {
    "use strict";

    (function (Application) {
        var scannedBarcodes = [];

        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;

        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);

            document.getElementById("scanBtn").addEventListener("click", scanAndShow);
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        }

        function scanAndShow() {
            cordova.plugins.barcodeScanner.scan(function (result) {
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
            }, function (error) {
                notificationAlert("Scanning failed!", "Error");
            });

            function notificationAlert(notficationMsg, notificationTitle) {
                navigator.notification.alert(notficationMsg, alertDismissed, notificationTitle, 'Done');
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
    })(MobilePOS.Application || (MobilePOS.Application = {}));
    var Application = MobilePOS.Application;

    window.onload = function () {
        Application.initialize();
    };
})(MobilePOS || (MobilePOS = {}));
//# sourceMappingURL=index.js.map
