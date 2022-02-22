/* eslint-disable import/extensions */
/* eslint-disable camelcase */
import { FC } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { Options } from 'highcharts/highstock';

import Indicators from 'highcharts/indicators/indicators';
import acceleration_bands from 'highcharts/indicators/acceleration-bands.js';
import AO from 'highcharts/indicators/ao.js';
import APO from 'highcharts/indicators/apo.js';
import aroon from 'highcharts/indicators/aroon.js';
import aroon_oscillator from 'highcharts/indicators/aroon-oscillator.js';
import atr from 'highcharts/indicators/atr.js';
import bollinger_bands from 'highcharts/indicators/bollinger-bands.js';
import cci from 'highcharts/indicators/cci.js';
import dema from 'highcharts/indicators/dema.js';
import dpo from 'highcharts/indicators/dpo';
import ikh from 'highcharts/indicators/ichimoku-kinko-hyo.js';
import keltner_channels from 'highcharts/indicators/keltner-channels.js';
import macd from 'highcharts/indicators/macd.js';
import momentum from 'highcharts/indicators/momentum.js';
import natr from 'highcharts/indicators/natr.js';
import pivot_points from 'highcharts/indicators/pivot-points.js';
import ppo from 'highcharts/indicators/ppo.js';
import price_channel from 'highcharts/indicators/price-channel.js';
import price_envelopes from 'highcharts/indicators/price-envelopes.js';
import psar from 'highcharts/indicators/psar.js';
import regressions from 'highcharts/indicators/regressions.js';
import roc from 'highcharts/indicators/roc.js';
import rsi from 'highcharts/indicators/rsi.js';
import stochastic from 'highcharts/indicators/stochastic.js';
import supertrend from 'highcharts/indicators/supertrend.js';
import tema from 'highcharts/indicators/tema.js';
import trendline from 'highcharts/indicators/trendline.js';
import trix from 'highcharts/indicators/trix.js';
import williams from 'highcharts/indicators/williams-r.js';
import wma from 'highcharts/indicators/wma.js';
import zigzag from 'highcharts/indicators/zigzag.js';

import DragPanes from 'highcharts/modules/drag-panes.js';
import AnnotationsAdvanced from 'highcharts/modules/annotations-advanced.js';
import PriceIndicator from 'highcharts/modules/price-indicator.js';
import FullScreen from 'highcharts/modules/full-screen.js';
import Exporting from 'highcharts/modules/exporting.js';
import OfflineExporting from 'highcharts/modules/offline-exporting.js';
import StockTools from 'highcharts/modules/stock-tools.js';
import './styles/index.css';

Indicators(Highcharts);
acceleration_bands(Highcharts);
AO(Highcharts);
APO(Highcharts);
aroon(Highcharts);
aroon_oscillator(Highcharts);
atr(Highcharts);
bollinger_bands(Highcharts);
cci(Highcharts);
dema(Highcharts);
dpo(Highcharts);
ikh(Highcharts);
keltner_channels(Highcharts);
macd(Highcharts);
momentum(Highcharts);
natr(Highcharts);
pivot_points(Highcharts);
ppo(Highcharts);
price_channel(Highcharts);
price_envelopes(Highcharts);
psar(Highcharts);
regressions(Highcharts);
roc(Highcharts);
rsi(Highcharts);
stochastic(Highcharts);
supertrend(Highcharts);
tema(Highcharts);
trendline(Highcharts);
trix(Highcharts);
williams(Highcharts);
wma(Highcharts);
zigzag(Highcharts);

DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
FullScreen(Highcharts);
Exporting(Highcharts);
OfflineExporting(Highcharts);
StockTools(Highcharts);

type TPropsChart = {
    options: Options;
};

const Chart: FC<TPropsChart> = ({ options }) => (
    <div id="container">
        <HighchartsReact
            highcharts={Highcharts}
            constructorType="stockChart"
            options={options}
            immutable
        />
    </div>
);

export default Chart;
