import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts';
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

const DiceStats = ({ numberStats, eventStats, isCitiesAndKnights }) => {
    const [group, setGroup] = useState('numbers')

    useEffect(() => {
        if(!isCitiesAndKnights) {
            setGroup("numbers")
        }
    }, [isCitiesAndKnights])

    const handleChange = (event, newGroup) => {
        setGroup(newGroup)
    }

    return (
        <div style={{ position: 'absolute', top: 30, right: 30, width: "max-content", height: "max-content", backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "30px" }}>
            {isCitiesAndKnights &&
            <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", marginTop: 10 }}>
                <ToggleButtonGroup
                    exclusive
                    onChange={handleChange}
                    value={group}
                >
                    <ToggleButton value="numbers">Numbers</ToggleButton>
                    <ToggleButton value="event">Event Die</ToggleButton>
                </ToggleButtonGroup>
            </div>
            }
            {group === "numbers" &&
                <div>
                    <BarChart
                        dataset={numberStats}
                        xAxis={[{ scaleType: 'band', dataKey: "number", label: "Number" }]}
                        yAxis={[{ label: "Amount Rolled" }]}
                        series={[
                            { dataKey: 'value', color: "rgb(60, 60, 60)" }
                        ]}
                        width={500}
                        height={300}
                    />
                </div>
            }
            {group === "event" &&
                <div>
                    <BarChart
                        dataset={eventStats}
                        xAxis={[{ scaleType: 'band', dataKey: "side", label: "Event" }]}
                        yAxis={[{ label: "Amount Rolled" }]}
                        series={[
                            { dataKey: 'value', color: "rgb(60, 60, 60)" }
                        ]}
                        width={500}
                        height={300}
                    />
                </div>
            }
        </div>
    );
};

export default DiceStats;
