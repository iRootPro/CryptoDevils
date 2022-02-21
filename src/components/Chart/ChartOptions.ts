import {Options} from "highcharts";
import {Dispatch, SetStateAction} from "react";
import {TCoinByIdOHLC} from "../../types/ICoinByIdOHLC";

export type TChartOptions = {
    setDays: Dispatch<SetStateAction<number | string>>,
    data: TCoinByIdOHLC[],
    name: string,
    averagePrice?: number,
}

export const configureOptions = ({data, name, setDays, averagePrice}: TChartOptions): Options => ({
    yAxis: {
        opposite: true,
        offset: 30,
        plotLines: [{
            value: averagePrice,
            width: 1,
            color: 'green',
            dashStyle: 'Dash',
            label: {
                text: 'Buy',
                align: 'right',
                y: 12,
                x: 0
            }
        }]
    },
    chart: {
        height: 500,
        marginRight: 30,
        marginLeft: 20,
        zoomType: 'xy'
    },
    rangeSelector: {
        buttons: [{
            type: 'day',
            count: 7,
            text: '7d',
            title: 'View 7 days',
        }, {
            type: 'day',
            count: 14,
            text: '14d',
            title: 'View 14 days',
            events: {
                click: function () {
                    setDays(30);
                }
            }
        }, {
            type: 'month',
            count: 6,
            text: '6m',
            title: 'View 6 months'
        }, {
            type: 'month',
            count: 12,
            text: '12m',
            title: 'View 12 months'
        }, {
            type: 'year',
            count: 3,
            text: '3y',
            title: 'View 3 year'
        }, {
            type: 'ytd',
            text: 'YTD',
            title: 'View year to date',
            events: {
                click: function () {
                    setDays(365);
                }
            }
        }, {
            type: 'ytd',
            text: 'Full',
            title: 'View for full data',
            events: {
                click: function () {
                    setDays('max');
                }
            }
        }, {
            type: 'all',
            text: 'All',
            title: 'View all'
        }],
        buttonTheme: {
            fill: 'none',
            stroke: 'none',
            'stroke-width': 0,
            r: 8,
            style: {
                color: '#039',
                fontWeight: 'bold'
            },
            states: {
                hover: {},
                select: {
                    fill: '#039',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: 'gray',
        inputBoxWidth: 120,
        inputBoxHeight: 18,
        inputStyle: {
            color: '#039',
            fontWeight: 'bold'
        },
        labelStyle: {
            color: 'silver',
            fontWeight: 'bold'
        },
        selected: 1
    },
    stockTools: {
        gui: {
            buttons: ['indicators', 'simpleShapes', 'lines', 'measure', 'advanced', 'separator', 'verticalLabels', 'flags', 'zoomChange', 'typeChange', 'fullScreen', 'separator'],
            definitions: {
                typeChange: {
                    items: ['typeOHLC', 'typeLine', 'typeCandlestick'],
                }
            }
        }
    },
    plotOptions: {
        sma: {
            marker: {
                symbol: 'circle'
            }
        }
    },
    series: [{
        type: 'candlestick',
        id: 'main',
        name,
        data,
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                chart: {
                    height: 400
                },
                navigator: {
                    enabled: false
                }
            }
        }]
    },
});
