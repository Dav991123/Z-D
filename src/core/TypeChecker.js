class TypeChecker {
    static isNumber(value) {
        return typeof value === 'number';
    }
    static isEmptyString(val) {
        return val === '';
    }
    static isString(val) {
        return typeof val === 'string';
    }
    static isArray(val) {
        return Array.isArray(val);
    }
    static isNull(val) {
        return val === null;
    }
    static isUndefined(val) {
        return val === undefined
    }
}
export default TypeChecker;