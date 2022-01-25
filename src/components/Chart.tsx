import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

interface NestedArray {
  ages: number[][]
}

const Chart = ({ ages }:NestedArray) => {


  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ['20-29', '30-39', '40-49', '50-59', '60-69', '70-79'],
    datasets: [
      {
        label: '# of Votes',
        data: [ages[0]?.length, ages[1]?.length, ages[2]?.length, ages[3]?.length, ages[4]?.length, ages[5]?.length],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <div>
    <Doughnut data={ data }/>
  </div>;
};

export default Chart;
