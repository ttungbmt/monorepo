/**
 * @render utils
 * @name toRoman
 * @param num
 * @returns {string}
 * @description Convert number to roman.
 * https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-roman-numeral-converter/16044
 * @example
 * toRoman(1); // -> I
 * toRoman(2); // -> II
 */
import {lowerCase} from "lodash-es";

function toRoman(num, isLowercase) {
    if (typeof num !== 'number') return false

    let digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman_num = "",
        i = 3;
    while (i--)
        roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num

    let romanStr = Array(+digits.join("") + 1).join("M") + roman_num

    return isLowercase ? lowerCase(romanStr) :  romanStr;
}

export default toRoman