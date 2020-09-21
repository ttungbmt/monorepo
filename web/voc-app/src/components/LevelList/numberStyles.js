import {range} from "lodash-es";
import {toLetter, toRoman} from "@ttungbmt/utils";

const ints = range(1, 26+1)

const numberStyles = [
    Array(26),
    ints,
    ints.map(int => toRoman(int)),
    ints.map(int => toRoman(int, true)),
    ints.map(int => toLetter(int)),
    ints.map(int => toLetter(int, true))
]

export default numberStyles

