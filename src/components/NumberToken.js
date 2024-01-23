const NumberToken = ({ x, y, number }) => {
    return (
      <div className="number-token" style={{ left: x, top: y }}>
        {number}
      </div>
    );
  };
  
  export default NumberToken