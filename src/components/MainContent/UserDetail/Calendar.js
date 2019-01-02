import React, { Component } from "react";

import moment from "moment";

import {
    Tooltip,
    OverlayTrigger,
    ButtonToolbar,
    Button
} from "react-bootstrap";

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weeks: [],
            dates: [
                {
                    label: "Mon",
                    id: "Monday"
                },
                {
                    label: "Tue",
                    id: "Tuesday"
                },
                {
                    label: "Wed",
                    id: "Wednesday"
                },
                {
                    label: "Ths",
                    id: "Thursday"
                },
                {
                    label: "Fri",
                    id: "Friday"
                },
                {
                    label: "Sat",
                    id: "Saturday"
                },
                {
                    label: "Sun",
                    id: "Sunday"
                }
            ]
        };
    }

    componentDidMount() {
        this._getDaysInCurrentMonth();
    }

    _getDaysInCurrentMonth() {
        let days = [];

        let currentDate = new Date();

        let date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );

        while (date.getMonth() === currentDate.getMonth()) {
            days.push({
                date: date.getDate(),
                dayName: date.getDay(),
                display: true
            });
            date.setDate(date.getDate() + 1);
        }

        let firstDay = days[0].dayName;

        if (firstDay > 0) {
            date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                0
            );
            for (let i = 0; i < firstDay; i++) {
                days.unshift({
                    date: date.getDate(),
                    dayName: date.getDay(),
                    display: false
                });
                date.setDate(date.getDate() - 1);
            }
        }

        let w = days.length / 7;
        let weeks = [];

        for (let i = 0; i < w; i++) {
            weeks.push(days.slice(i * 7, i * 7 + 7));
        }

        this.setState({
            weeks: weeks
        });
    }

    render() {
        let { duties } = this.props;

        return (
            <div className="my-calendar">
                <table style={{ flex: 1 }}>
                    <thead style={{}}>
                        <tr style={{}}>
                            {this.state.dates.map(d => {
                                return <th key={d.id}>{d.label}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.weeks.map((w, i) => {
                            return (
                                <tr key={i}>
                                    {w.map((d, index) => {
                                        if (d.display === true) {
                                            if (
                                                d.date === new Date().getDate()
                                            ) {
                                                if (duties[d.date]) {
                                                    return (
                                                        <OverlayTrigger
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip id="tooltip">
                                                                    <span>
                                                                        {
                                                                            duties[
                                                                                d
                                                                                    .date
                                                                            ]
                                                                                .time
                                                                        }
                                                                    </span>
                                                                    <br />
                                                                    <span>
                                                                        {
                                                                            duties[
                                                                                d
                                                                                    .date
                                                                            ]
                                                                                .title
                                                                        }
                                                                    </span>
                                                                </Tooltip>
                                                            }
                                                            key={index}
                                                        >
                                                            <td className="today-have-duty">
                                                                {d.date}
                                                            </td>
                                                        </OverlayTrigger>
                                                    );
                                                }
                                                return (
                                                    <td
                                                        className="current-day"
                                                        key={index}
                                                    >
                                                        {d.date}
                                                    </td>
                                                );
                                            } else {
                                                if (duties[d.date]) {
                                                    return (
                                                        <OverlayTrigger
                                                            placement="left"
                                                            overlay={
                                                                <Tooltip id="tooltip">
                                                                    <span>
                                                                        {
                                                                            duties[
                                                                                d
                                                                                    .date
                                                                            ]
                                                                                .time
                                                                        }
                                                                    </span>
                                                                    <br />
                                                                    <span>
                                                                        {
                                                                            duties[
                                                                                d
                                                                                    .date
                                                                            ]
                                                                                .title
                                                                        }
                                                                    </span>
                                                                </Tooltip>
                                                            }
                                                            key={index}
                                                        >
                                                            <td className="on-duty">
                                                                {d.date}
                                                            </td>
                                                        </OverlayTrigger>
                                                    );
                                                }
                                                return (
                                                    <td key={index}>
                                                        {d.date}
                                                    </td>
                                                );
                                            }
                                        } else {
                                            return <td key={index} />;
                                        }
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calendar;
