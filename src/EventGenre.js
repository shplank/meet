import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {

  const [data, setData] = useState([]);

  const colors = ['#A37800', '#537817', '#156CA2', '#6A4C93', '#B80006'];

  const getData = () => {
    const genres = ['Node', 'JavaScript', 'React', 'AngularJS', 'jQuery'];
    const data = genres.map((genre)=>{
      const value = events.filter(({ summary }) =>
        summary.split(' ').includes(genre)
        ).length;
        return { name: genre, value };
    });
    return data;
  };

  useEffect(() => {
    setData(() => getData());
    }, [events]);

  return (
    <ResponsiveContainer height={200} >
      <PieChart width={200} height={200}>
        <Pie data={data} cx="50%" cy="50%" labelLine={false}
          outerRadius={50}
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
