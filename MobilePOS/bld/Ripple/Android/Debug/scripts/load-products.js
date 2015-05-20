"use strict";
$(document).ready(function () {

    alert("LOADING PRODUCTS");

    var json = [
        { "brand": "Dream Monstar", "product": "Bodycon dress", "color": "Goldenrod", "price": "$157.73", "image": "08173_RD5619_m.jpg", "barcode": "9788366620049" },
        { "brand": "Black By Geng", "product": "Wrap skirt dress", "color": "Red", "price": "$188.95", "image": "22511_NA6814_m.jpg", "barcode": "9788366620063" },
        { "brand": "Fate", "product": "Bodycon dress", "color": "Teal", "price": "$232.11", "image": "41752_BL8133_m.jpg", "barcode": "9788366620025" },
        { "brand": "Embody Denim", "product": "Fitted dress", "color": "Orange", "price": "$240.57", "image": "66737_GY6529_m.jpg", "barcode": "97883666200432" },
        { "brand": "Harlow", "product": "Fitted dress", "color": "Purple", "price": "$218.69", "image": "03446_RD6160_m.jpg", "barcode": "9788366620087" },
        { "brand": "Cooper St", "product": "Fitted dress", "color": "Puce", "price": "$131.25", "image": "65251_BL7442_m.jpg", "barcode": "9788366620049" },
        { "brand": "Black By Geng", "product": "Fitted dress", "color": "Pink", "price": "$143.66", "image": "07199_BK0001_m.jpg", "barcode": "9788366620049" },
        { "brand": "Cameo Collective", "product": "Laced midi dress", "color": "Fuscia", "price": "$190.48", "image": "07210_WD9684_m.jpg", "barcode": "9788366620025" },
        { "brand": "By Weave", "product": "Draped lux dress", "color": "Pink", "price": "$113.07", "image": "04948_BL8133_m.jpg", "barcode": "9788366620025" },
        { "brand": "Decjuba", "product": "Mesh stripe fit and flare dress", "color": "Turquoise", "price": "$131.11", "image": "08578_BK0001_m.jpg", "barcode": "9788366620025" },
        { "brand": "Finders Keepers", "product": "Cocktail dress", "color": "Goldenrod", "price": "$143.76", "image": "07450_WO0921_m.jpg", "barcode": "9788366620025" },
        { "brand": "Casa Kuma", "product": "Mesh stripe fit and flare dress", "color": "Mauv", "price": "$240.28", "image": "12167_OR5631_m.jpg", "barcode": "9788366620025" },
        { "brand": "D-ID", "product": "Bodycon dress", "color": "Indigo", "price": "$171.18", "image": "07458_PK5695_m.jpg", "barcode": "9788366620049" },
        { "brand": "Cameo Collective", "product": "Shirt dress", "color": "Pink", "price": "$199.94", "image": "08577_BK0001_m.jpg", "barcode": "97883666200432" },
        { "brand": "Coco Ribbon", "product": "Shirt dress", "color": "Maroon", "price": "$164.13", "image": "06246_BL7491_m.jpg", "barcode": "97883666200432" },
        { "brand": "Finery London", "product": "Mesh insert body-con dress", "color": "Aquamarine", "price": "$147.60", "image": "02982_BL6669_m.jpg", "barcode": "97883666200432" },
        { "brand": "Cheap Monday", "product": "Cocktail dress", "color": "Indigo", "price": "$178.03", "image": "24155_BK0001_m.jpg", "barcode": "9788366620087" },
        { "brand": "By Weave", "product": "Party dress", "color": "Goldenrod", "price": "$238.27", "image": "04171_WP0658_m.jpg", "barcode": "9788366620087" },
        { "brand": "Dorothy Perkins", "product": "Low back flare dress", "color": "Red", "price": "$163.15", "image": "28841_BR6390_m.jpg", "barcode": "9788366620025" }
    ];

    var product;
    for (var i = 0; i < json.length; i++) {
        product = $("<product />");
        product.append("<img src='images/products/" + json[i].image + "' />");
        product.append("<h4>" + json[i].brand + "</h4>");
        product.append("<p class='name'>" + json[i].product + "</p>");
        product.append("<p class='color'>" + json[i].color + "</p>");
        product.append("<p class='price'>" + json[i].price + "</p>");
        product.append("<p><small>" + json[i].barcode + "</small></p>");
        product.append("<a href='#' class='button--primary'><i class='icon icon-plus'></i> ADD</a>");
        product.attr("id", json[i].barcode);
        $("product-list").append(product);
    }


});
