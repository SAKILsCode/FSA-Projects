import { formatDistance } from 'date-fns';
import useClock from '../../hooks/useClock';
import useTimer from '../../hooks/useTimer';
import ClockActions from '../shared/clock-actions';
import ClockDisplay from '../shared/clock-display';

const ClockListItem = ({ localClock, clock, updateClock, deleteClock }) => {
  const { date } = useClock(clock.timezone, clock.offset);

  const timer = useTimer(date);

  if (!date || !timer) return null;

  return (
    <div>
      <ClockDisplay
        date={timer}
        title={clock.title}
        timezone={clock.timezone}
        offset={clock.offset}
      />
      {<h4>{formatDistance(localClock, timer)}</h4>}
      <ClockActions
        clock={clock}
        updateClock={updateClock}
        deleteClock={deleteClock}
      />
    </div>
  );
};

export default ClockListItem;
