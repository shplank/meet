import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => getData());
    }, [events]);

  const getData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre)=>{
      const value = events.filter(({ summary }) =>
        summary.split(' ').includes(genre)
        ).length;
        return { name: genre, value };
    });
    return data;
  };

  const colors = ['#F6511D', '#FFB400', '#00A6ED', '#7FB800', '#0D2C54'];

  return (
    <ResponsiveContainer height={200} >
      <PieChart width={200} height={200}>
        <Pie data={data} cx="50%" cy="50%" labelLine={false}
          outerRadius={40}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
        {
          data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} name={entry.name} />
          ))
        }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;
