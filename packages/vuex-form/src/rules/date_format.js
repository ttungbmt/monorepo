import moment from 'moment'

const validate = (value, { date }) => {
    let formatDate = 'YYYY-MM-DD',
        today = moment().format(formatDate),
        valueDate = moment(value, 'DD/MM/YYYY').format(formatDate)

    return moment(valueDate).isAfter(today)
};

const params = ['date']

export { validate, params };

export default {
    validate,
    params,
    message: (fieldName, placeholders) => {
        let date = placeholders.date
        if(placeholders.date === 'today') date = 'ngày hiện tại'
        return `${fieldName} phải sau ngày ${date}`;
    }
};