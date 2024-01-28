import { Text } from "react-hexgrid";

const Tile = ({hex, twoTwelve}) => {
    const calculatePips = (number) => {
        switch (number) {
            case 2:
            case 12:
                return {
                    'numOfPips': 1,
                    'cy': 0.1
                };
            case 3:
            case 11:
                return {
                    'numOfPips': 2,
                    'cy': -0.4
                };
            case 4:
            case 10:
                return {
                    'numOfPips': 3,
                    'cy': -1
                };
            case 5:
            case 9:
                return {
                    'numOfPips': 4,
                    'cy': -1.35
                };
            case 6:
            case 8:
                return {
                    'numOfPips': 5,
                    'cy': -1.85
                };
            default:
                return {
                    'numOfPips': 0,
                    'cy': 0
                };
        }
    }

    const pips = calculatePips(hex.number);

    const renderPips = () => {
        console.log(`twoTwelve = ${twoTwelve}`)
        let pipElements = [];
        for (let i = 0; i < pips.numOfPips; i++) {
            
            pipElements.push(
                <circle
                    key={i}
                    cx={2}
                    cy={pips.cy + i}
                    r={0.3}
                    stroke="none"
                    fill={hex.number === 8 || hex.number === 6 ? "#8b0000" : "black"}
                />
            )
        }
        return pipElements;
    }

    return (
        <g>
            <Text
                fontFamily="Sriracha"
                fontSize={(twoTwelve && (hex.number === 12 || hex.number === 2)) ? 2.5 : 3.5}
                stroke="none"
                fill={hex.number === 8 || hex.number === 6 ? "#8b0000" : "black"}
                style={{ transform: "rotate(270deg)" }}
            >
                {(twoTwelve && (hex.number === 12 || hex.number === 2)) ? "2/12" : hex.number}
            </Text>
            {renderPips()}
        </g>
    );
}

export default Tile;