import React from 'react';
import { BarChart } from '@mui/x-charts';

const DiceStats = ({ stats }) => {

    return (
        <div style={{ position: 'absolute', top: 30, right: 150, width: 300, height: 300 }}>
            <BarChart
                dataset={stats}
                xAxis={[{ scaleType: 'band', dataKey: "number" }]}
                series={[
                    {dataKey: 'value', label: "value",}
                ]}
                width={500}
                height={300}
            />
        </div>
    );
};

export default DiceStats;
