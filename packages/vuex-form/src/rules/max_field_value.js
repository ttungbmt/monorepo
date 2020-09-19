const validate = (value, { target }) => {
    return value <= target
};

const params = [{
    name: 'target',
    isTarget: true
}]

export { validate, params };

export default {
    validate,
    params,
};