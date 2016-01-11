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
    if (Colors.isNumber(H) && Colors.betweenInclusive(H, 0, 360)) validH = true;
    if (Colors.isNumber(S) && Colors.betweenInclusive(S, 0, 1)) validS = true;
    if (Colors.isNumber(V) && Colors.betweenInclusive(V, 0, 1)) validV = true;
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
        if (Colors.betweenInclusive(HH, 5, 6)) {
            R1 = C;
            G1 = 0;
            B1 = X;
        } else if (Colors.betweenLowerInclusive(HH, 4, 5)) {
            R1 = X;
            G1 = 0;
            B1 = C;
        } else if (Colors.betweenLowerInclusive(HH, 3, 4)) {
            R1 = 0;
            G1 = X;
            B1 = C;
        } else if (Colors.betweenLowerInclusive(HH, 2, 3)) {
            R1 = 0;
            G1 = C;
            B1 = X;
        } else if (Colors.betweenLowerInclusive(HH, 1, 2)) {
            R1 = X;
            G1 = C;
            B1 = 0;
        }
        else if (Colors.betweenInclusive(HH, 0, 1)) {
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
Colors.leadingZero = function(value){
    var v = "00" + value;
  return v.substring(v.length - 2, v.length);
};
Colors.RGBtoHEX = function(R,G,B){
  return "#" + Colors.leadingZero(R.toString(16)) + Colors.leadingZero(G.toString(16)) + Colors.leadingZero(B.toString(16));
};
Colors.HSLtoRGB = function (H, S, L) {
    var validH = false, validS = false, validV = false;
    if (Colors.isNumber(H) && Colors.betweenInclusive(H, 0, 360)) validH = true;
    if (Colors.isNumber(S) && Colors.betweenInclusive(S, 0, 1)) validS = true;
    if (Colors.isNumber(L) && Colors.betweenInclusive(L, 0, 1)) validV = true;
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
        if (Colors.betweenInclusive(HH, 5, 6)) {
            R1 = C;
            G1 = 0;
            B1 = X;
        } else if (Colors.betweenLowerInclusive(HH, 4, 5)) {
            R1 = X;
            G1 = 0;
            B1 = C;
        } else if (Colors.betweenLowerInclusive(HH, 3, 4)) {
            R1 = 0;
            G1 = X;
            B1 = C;
        } else if (Colors.betweenLowerInclusive(HH, 2, 3)) {
            R1 = 0;
            G1 = C;
            B1 = X;
        } else if (Colors.betweenLowerInclusive(HH, 1, 2)) {
            R1 = X;
            G1 = C;
            B1 = 0;
        }
        else if (Colors.betweenInclusive(HH, 0, 1)) {
            R1 = C;
            G1 = X;
            B1 = 0;
        }
    }


    var m = L - (.5*C);
    var rgb = {"R": Math.round(R1*255), "G": Math.round((G1 + m) *255), "B": Math.round((B1 + m)*255)};
    console.log(JSON.stringify(rgb));
    return rgb;

};