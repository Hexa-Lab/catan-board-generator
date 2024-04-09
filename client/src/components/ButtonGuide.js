export const ButtonGuide = () => {
  return (
    <div className="z-[100] flex flex-col items-center absolute left-[40%] top-1/4 bg-white p-4 rounded-2xl">
      <h1>Button Guide</h1>
      <div className="w-80 border-[2px] border-black" />
      <div className="self-start">
        <div className="flex items-center m-8 h-[10px]">
          <h2 className="mr-4">M: </h2>
          <h4>Toggle Button Guide Menu</h4>
        </div>
        <div className="flex items-center m-8 h-[10px]">
          <h2 className="mr-4">1: </h2>
          <h4>Shuffle Base Game</h4>
        </div>
        <div className="flex items-center m-8 h-[10px]">
          <h2 className="mr-4">2: </h2>
          <h4>Shuffle Base Game Extended</h4>
        </div>
        <div className="flex items-center m-8 h-[10px]">
          <h2 className="mr-4">3: </h2>
          <h4>Shuffle Four Islands Game</h4>
        </div>
        <div className="flex items-center m-8 h-[10px]">
          <h2 className="mr-4">4: </h2>
          <h4>Shuffle Black Forest Game</h4>
        </div>
        <div className="flex items-center m-8 h-[10px]">
          <h2 className="mr-4">D: </h2>
          <h4>Roll Dice</h4>
        </div>
        <div className="flex items-center m-8 h-[10px]">
          <h2 className="mr-4">T: </h2>
          <h4>Toggle 2/12 Number Tokens</h4>
        </div>
        <div className="flex items-center m-8 h-[10px]">
          <h2 className="mr-4">S: </h2>
          <h4>Toggle Dice Stats</h4>
        </div>
        <div className="flex items-center m-8 h-[10px]">
          <h2 className="mr-4">B: </h2>
          <h4>Toggle Barbarian Tracker</h4>
        </div>
      </div>
    </div>
  );
};
