import moment from 'moment';

function DateComponent(props) {
    const date = props.date;
    const dateObj = moment(date);
    const dateN = dateObj.date();
    const dayName = dateObj.format('ddd');
    const month = dateObj.format('MMM');


    return <p>{`${dayName}, ${dateN} ${month}`}</p>;
}

export default DateComponent;