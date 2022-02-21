import React, {FC} from 'react';
import PieChartReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

export type ItemDataTypePie = {
    name: string,
    y: number
}

export const PieChart = ({data}: {data: ItemDataTypePie[]}) => {

    const options = {
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %'
                }
            }
        },
        title: {
            text: 'Diversification',
        },
        chart: {
            type: "pie",
        },
        series: [
            {
                data
            }
        ]
    };

    return (
        <div>
            <PieChartReact highcharts={Highcharts} options={options} ></PieChartReact>
        </div>
    );
};
