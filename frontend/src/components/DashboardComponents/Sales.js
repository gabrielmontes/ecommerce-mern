import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chart, registerables } from 'chart.js';
import { getOrdersCountByDate } from '../../actions/orderActions';
import { Bar } from 'react-chartjs-2';
import {
  Card, CardContent, CardHeader, Divider, useTheme, MenuItem, Select,
  FormControl, InputLabel
} from '@mui/material';

Chart.register(...registerables);

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('es-US', { month: 'long' });
};

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril',
  'Mayo', 'Junio', 'Julio', 'Agosto',
  'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

export const Sales = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const currentMonth = new Date().getMonth() + 1;

  const [month, setMonth] = useState('');

  const orderListCount = useSelector((state) => state.orderCountByDate);
  const { orders } = orderListCount;

  useEffect(() => {
    dispatch(getOrdersCountByDate(month));
  }, [dispatch, month]);

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const countByDay = orders?.map((order) => {
    return order.count;
  });

  const day = orders?.map((order) => {
    return `${getMonthName(order._id.month)} ${order._id.day}`;
  });

  const data = {
    labels: day,
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        maxBarThickness: 10,
        data: countByDay,
        label: month?  
          `Ventas de ${getMonthName(month + 1)}` : `Ventas de ${getMonthName(currentMonth)}`
      },
    ],
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader title="Total de compras del mes."
        action={(
          <FormControl sx={{ width: 150 }}>
            <InputLabel id="open-select-label">Mes</InputLabel>
            <Select
              labelId="open-select-label"
              label="Mes"
              value={month}
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              {months.map((month, index) => {
                return <MenuItem key={index} value={index}>{month}</MenuItem>
              })}
            </Select>
          </FormControl>
        )} />
      <Divider />
      <CardContent>
        <Bar data={data}
          height={450}
          options={options}
        />
      </CardContent>
    </Card>
  );
};