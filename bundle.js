(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//var _ = require("underscore");
//Formulas taken from https://en.wikipedia.org/wiki/HSL_and_HSV
//


/***
 *
 * @param H  hue (degrees from color circle) value between 0 and 360
 * @param S  saturation (% from center of color circle to edge) value between 0 and 1
 * @param V  value (brightness % from top to bottom of cylinder) value between 0 and 1
 * @constructor
 */
betweenLowerInclusive = function (value, lower, upper) {
    return (value >= lower) && (value < upper);
};
betweenInclusive = function (value, lower, upper) {
    return (value >= lower) && (value <= upper);
};
isNumber = function (value) {
    return value ===0 || (value && !isNaN(value));
}

HSVtoRGB = function (H, S, V) {
    var validH = false, validS = false, validV = false;
    if (isNumber(H) && betweenInclusive(H, 0, 360)) validH = true;
    if (isNumber(S) && betweenInclusive(S, 0, 1)) validS = true;
    if (isNumber(V) && betweenInclusive(V, 0, 1)) validV = true;
    if (!(validH && validS && validV)) {
        return {"Error": "Not valid"}
    }

    var R, G, B, R1, G1, B1; //values between 0 and 255

    var C = V * S;
    if (H!=0 && !H) {
        R1 = 0;
        G1 = 0;
        B1 = 0;
    } else {
        var HH = H / 60; //degrees
        var X = C * (1 - Math.abs(HH % 2 - 1));
        if (betweenInclusive(HH, 5, 6)) {
            R1 = C;
            G1 = 0;
            B1 = X;
        } else if (betweenLowerInclusive(HH, 4, 5)) {
            R1 = X;
            G1 = 0;
            B1 = C;
        } else if (betweenLowerInclusive(HH, 3, 4)) {
            R1 = 0;
            G1 = X;
            B1 = C;
        } else if (betweenLowerInclusive(HH, 2, 3)) {
            R1 = 0;
            G1 = C;
            B1 = X;
        } else if (betweenLowerInclusive(HH, 1, 2)) {
            R1 = X;
            G1 = C;
            B1 = 0;
        }
        else if (betweenInclusive(HH, 0, 1)) {
            R1 = C;
            G1 = X;
            B1 = 0;
        }
    }


    var m = V - C;
    var rgb = {"R": Math.round((R1 + m)*255), "G": Math.round((G1 + m) *255), "B": Math.round((B1 + m)*255)};
    console.log(JSON.stringify(rgb));
    return rgb;

};
leadingZero = function(value){
    var v = "00" + value;
  return v.substring(v.length - 2, v.length);
};
RGBtoHEX = function(R,G,B){
  return "#" + leadingZero(R.toString(16)) + leadingZero(G.toString(16)) + leadingZero(B.toString(16));
};
HSLtoRGB = function (H, S, L) {
    var validH = false, validS = false, validV = false;
    if (isNumber(H) && betweenInclusive(H, 0, 360)) validH = true;
    if (isNumber(S) && betweenInclusive(S, 0, 1)) validS = true;
    if (isNumber(L) && betweenInclusive(L, 0, 1)) validV = true;
    if (!(validH && validS && validV)) {
        return {"Error": "Not valid"}
    }

    var R, G, B, R1, G1, B1; //values between 0 and 255

    var C = (1 - Math.abs(2*L - 1))*S;
    if (H!=0 && !H) {
        R1 = 0;
        G1 = 0;
        B1 = 0;
    } else {
        var HH = H / 60; //degrees
        var X = C * (1 - Math.abs(HH % 2 - 1));
        if (betweenInclusive(HH, 5, 6)) {
            R1 = C;
            G1 = 0;
            B1 = X;
        } else if (betweenLowerInclusive(HH, 4, 5)) {
            R1 = X;
            G1 = 0;
            B1 = C;
        } else if (betweenLowerInclusive(HH, 3, 4)) {
            R1 = 0;
            G1 = X;
            B1 = C;
        } else if (betweenLowerInclusive(HH, 2, 3)) {
            R1 = 0;
            G1 = C;
            B1 = X;
        } else if (betweenLowerInclusive(HH, 1, 2)) {
            R1 = X;
            G1 = C;
            B1 = 0;
        }
        else if (betweenInclusive(HH, 0, 1)) {
            R1 = C;
            G1 = X;
            B1 = 0;
        }
    }


    var m = L - (.5*C);
    var rgb = {"R": Math.round(R1*255), "G": Math.round((G1 + m) *255), "B": Math.round((B1 + m)*255)};
    //console.log(JSON.stringify(rgb));
    return rgb;

};
HSLtoHEX = function(H, S, L){
    var rgb = HSLtoRGB(H, S, L);
   return RGBtoHEX(rgb.R, rgb.G, rgb.B);
}

/***
 * degree between 0 and 360 of color wheel returns #Hex value of color
 * @param degree
 * @returns string with hex value like #FF0000
 * @constructor
 */
module.exports = function(degree) {
    if (!isNaN(degree) || degree < 0 || degree > 360) return "Degree must be between 0 and 360";
    var hex = HSLtoHEX(degree, 1,.5);
    return hex;
}

},{}]},{},[1]);
