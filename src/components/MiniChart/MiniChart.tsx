import { FC, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { Options } from 'highcharts';

interface TMiniChartProps {
    data: [number[]];
    color: string;
}

const MiniChart: FC<TMiniChartProps> = ({ data, color }) => {
    const [options] = useState<Options>({
        chart: {
            type: 'area',
            height: 54,
            width: 164,
            margin: [2, 0, 2, 0],
            borderWidth: 0,
            backgroundColor: undefined,
            style: {
                overflow: 'visible',
            },
        },
        title: {
            text: undefined,
        },
        yAxis: {
            visible: false,
            minPadding: 0,
            maxPadding: 0,
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false,
            },
            title: {
                text: null,
            },
            tickPositions: [0],
        },
        xAxis: {
            visible: false,
            labels: {
                enabled: false,
            },
            title: {
                text: null,
            },
            minPadding: 0,
            maxPadding: 0,
            startOnTick: false,
            endOnTick: false,
            tickPositions: [],
        },
        tooltip: {
            enabled: false,
        },
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                type: 'area',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            radius: 2,
                        },
                    },
                },
                shadow: false,
                lineWidth: 2,
                color,
                threshold: null,
                data,
                fillOpacity: 0.25,
            },
        ],
    });

    return (
        <div id="conteinerMiniChart">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default MiniChart;
