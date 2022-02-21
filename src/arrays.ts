/**
 * Consume an array of numbers, and return a new array containing
 * JUST the first and last number. If there are no elements, return
 * an empty array. If there is one element, the resulting list should
 * the number twice.
 */
export function bookEndList(numbers: number[]): number[] {
    if (numbers.length === 0) {
        return numbers;
    }

    const return_array: number[] = [];
    return_array.push(numbers[0]);
    return_array.push(numbers[numbers.length - 1]);
    return return_array;
}

/**
 * Consume an array of numbers, and return a new array where each
 * number has been tripled (multiplied by 3).
 */
export function tripleNumbers(numbers: number[]): number[] {
    const tripled_numbers = numbers.map((value: number): number => value * 3);
    return tripled_numbers;
}

/**
 * Consume an array of strings and convert them to integers. If
 * the number cannot be parsed as an integer, convert it to 0 instead.
 */
export function stringsToIntegers(numbers: string[]): number[] {
    const numbersOnly = numbers.map((value: string): number =>
        isNaN(Number(value)) ? 0 : Number(value)
    );
    return numbersOnly;
}

/**
 * Consume an array of strings and return them as numbers. Note that
 * the strings MAY have "$" symbols at the beginning, in which case
 * those should be removed. If the result cannot be parsed as an integer,
 * convert it to 0 instead.
 */
// Remember, you can write functions as lambdas too! They work exactly the same.
export const removeDollars = (amounts: string[]): number[] => {
    amounts = amounts.map((values: string): string => values.replace("$", ""));
    const intValues = amounts.map((value: string): number =>
        isNaN(+value) ? 0 : +value
    );
    return intValues;
};

/**
 * Consume an array of messages and return a new list of the messages. However, any
 * string that ends in "!" should be made uppercase. Also, remove any strings that end
 * in question marks ("?").
 */
export const shoutIfExclaiming = (messages: string[]): string[] => {
    messages = messages.filter(
        (value: string): boolean => !value.endsWith("?")
    );
    const exclaimedMessages = messages.map((value: string): string =>
        value.endsWith("!") ? value.toUpperCase() : value
    );
    return exclaimedMessages;
};

/**
 * Consumes an array of words and returns the number of words that are LESS THAN
 * 4 letters long.
 */
export function countShortWords(words: string[]): number {
    words = words.filter((words: string): boolean => words.length < 4);
    return words.length;
}

/**
 * Consumes an array of colors (e.g., 'red', 'purple') and returns true if ALL
 * the colors are either 'red', 'blue', or 'green'. If an empty list is given,
 * then return true.
 */
export function allRGB(colors: string[]): boolean {
    if (colors.length === 0) {
        return true;
    }

    let newArray = [...colors];
    newArray = newArray.filter(
        (value: string): boolean =>
            value === "red" || value === "blue" || value === "green"
    );

    return colors.length === newArray.length;
}

/**
 * Consumes an array of numbers, and produces a string representation of the
 * numbers being added together along with their actual sum.
 *
 * For instance, the array [1, 2, 3] would become "6=1+2+3".
 * And the array [] would become "0=0".
 */
export function makeMath(addends: number[]): string {
    if (addends.length === 0) {
        return "0=0";
    }

    const sum = addends.reduce(
        (currentTotal: number, num: number) => currentTotal + num,
        0
    );

    const math = addends.join("+");

    return sum + "=" + math;
}

/**
 * Consumes an array of numbers and produces a new array of the same numbers,
 * with one difference. After the FIRST negative number, insert the sum of all
 * previous numbers in the list. If there are no negative numbers, then append
 * the sum to the list.
 *
 * For instance, the array [1, 9, -5, 7] would become [1, 9, -5, 10, 7]
 * And the array [1, 9, 7] would become [1, 9, 7, 17]
 */
export function injectPositive(values: number[]): number[] {
    //Gets index of first negative number
    const firstNegativeIndex = values.findIndex(
        (value: number): boolean => value < 0
    );

    //Hard Copy
    const beforeNegative = [...values];
    const afterMutation = [...values];

    console.log(values);

    if (firstNegativeIndex === -1) {
        const sum = beforeNegative.reduce(
            (currentTotal: number, num: number) => currentTotal + num,
            0
        );
        beforeNegative.push(sum);
        return beforeNegative;
    }

    console.log(values);

    //Remove first negative index and all elements after.
    beforeNegative.splice(
        firstNegativeIndex,
        beforeNegative.length - firstNegativeIndex,
        0
    );

    console.log(values);

    //Get total of numbers before the first negative
    const sum = beforeNegative.reduce(
        (currentTotal: number, num: number) => currentTotal + num,
        0
    );

    afterMutation.splice(firstNegativeIndex + 1, 0, sum);
    console.log(values);

    return afterMutation;
}