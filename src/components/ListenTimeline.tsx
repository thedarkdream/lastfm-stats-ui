import { Line } from "react-chartjs-2";
import { LineChartProps } from "../dto/LineChartProps";
import { Chart, registerables } from 'chart.js';
import Spinner from '../puff.svg';

Chart.register(...registerables);

function ListenTimeline( props: LineChartProps ) {

    return <div className="listenTimeline">
        {props.loading && <img src={Spinner} alt="Loading..." width="100px"/>}
        {props.data && <Line data={props.data.data} options={props.data.options} />}
    </div>
}

export default ListenTimeline;