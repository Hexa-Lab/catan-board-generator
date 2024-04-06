export const ButtonGuide = () => {
    return (
        <div style={{zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", position: "absolute", left: "40%", top: "25%", backgroundColor: "white", padding: "1rem", borderRadius: "1rem"}}>
        <h1>Button Guide</h1>
        <div style={{width: "20rem", border: "2px solid black"}}/>
        <div style={{alignSelf: "flex-start"}}>
          <div style={{display: "flex", alignItems: "center", margin: "2rem", height: "10px"}}>
            <h2 style={{marginRight: "1rem"}}>M: </h2>
            <h4>Toggle Button Guide Menu</h4>
          </div>
          <div style={{display: "flex", alignItems: "center", margin: "2rem", height: "10px"}}>
            <h2 style={{marginRight: "1rem"}}>1: </h2>
            <h4>Shuffle Base Game</h4>
          </div>
          <div style={{display: "flex", alignItems: "center", margin: "2rem", height: "10px"}}>
            <h2 style={{marginRight: "1rem"}}>2: </h2>
            <h4>Shuffle Base Game Extended</h4>
          </div>
          <div style={{display: "flex", alignItems: "center", margin: "2rem", height: "10px"}}>
            <h2 style={{marginRight: "1rem"}}>3: </h2>
            <h4>Shuffle Four Islands Game</h4>
          </div>
          <div style={{display: "flex", alignItems: "center", margin: "2rem", height: "10px"}}>
            <h2 style={{marginRight: "1rem"}}>4: </h2>
            <h4>Shuffle Black Forest Game</h4>
          </div>
          <div style={{display: "flex", alignItems: "center", margin: "2rem", height: "10px"}}>
            <h2 style={{marginRight: "1rem"}}>D: </h2>
            <h4>Roll Dice</h4>
          </div>
          <div style={{display: "flex", alignItems: "center", margin: "2rem", height: "10px"}}>
            <h2 style={{marginRight: "1rem"}}>T: </h2>
            <h4>Toggle 2/12 Number Tokens</h4>
          </div>
          <div style={{display: "flex", alignItems: "center", margin: "2rem", height: "10px"}}>
            <h2 style={{marginRight: "1rem"}}>S: </h2>
            <h4>Toggle Dice Stats</h4>
          </div>
          <div style={{display: "flex", alignItems: "center", margin: "2rem", height: "10px"}}>
            <h2 style={{marginRight: "1rem"}}>B: </h2>
            <h4>Toggle Barbarian Tracker</h4>
          </div>
        </div>
        </div>
    )
}