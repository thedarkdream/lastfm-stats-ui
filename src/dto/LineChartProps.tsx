import type { ChartData, ChartOptions, LineHoverOptions } from 'chart.js';
import internal from 'stream';

export interface LineChartProps {
    data: LineChartData | undefined
    loading: Boolean
}

export interface LineChartData {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
}
