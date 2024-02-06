import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts';
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

const DiceStats = ({ numberStats, eventStats, isCitiesAndKnights }) => {
    const [group, setGroup] = useState('numbers')

    useEffect(() => {
        if (!isCitiesAndKnights) {
            setGroup("numbers")
        }
    }, [isCitiesAndKnights])

    const handleChange = (event, newGroup) => {
        if (newGroup !== null) {
            setGroup(newGroup)
        }
    }

    return (
        <div style={{ position: 'absolute', top: 30, right: 30, width: "470px", height: "max-content", backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "30px" }}>
            {isCitiesAndKnights &&
                <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", marginTop: 0 }}>
                        <ToggleButtonGroup
                            exclusive
                            onChange={handleChange}
                            value={group}
                            style={{ width: "100%", borderTopLeftRadius: "30px", borderTopRightRadius: "30px"}}
                        >
                            <ToggleButton style={{flex: 1, borderTopLeftRadius: "30px", borderBottomLeftRadius: "0px"}} value="numbers">Numbers</ToggleButton>
                            <ToggleButton style={{flex: 1, borderTopRightRadius: "30px", borderBottomRightRadius: "0px"}} value="event">Event Die</ToggleButton>
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
