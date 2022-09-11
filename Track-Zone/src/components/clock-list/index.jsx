import ClockListItem from './clock-list-item';

const ClockList = ({ localClock, clocks, updateClock, deleteClock }) => {
  return (
    <div>
      <h3>Other Clocks</h3>
      <hr />
      {clocks.length === 0 ? (
        <p>There is no clock, please create one</p>
      ) : (
        <div>
          {clocks.map((clock) => (
            <ClockListItem
              key={clock.id}
              localClock={localClock}
              clock={clock}
              updateClock={updateClock}
              deleteClock={deleteClock}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default ClockList;
