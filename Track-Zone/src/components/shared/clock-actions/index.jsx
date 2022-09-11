import { useState } from 'react';
import ClockForm from '../clock-form';

const ClockActions = ({
  local = false,
  clock,
  updateClock,
  createClock,
  deleteClock,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const handleClock = (values) => {
    createClock(values);
  };

  return (
    <div>
      <button onClick={() => setIsEdit(!isEdit)}>Edit Clock</button>
      {local ? (
        <button onClick={() => setIsCreate(!isCreate)}>Create New Clock</button>
      ) : (
        <button onClick={() => deleteClock(clock.id)}>Delete</button>
      )}
      {isEdit && (
        <>
          <h3>Edit Clock</h3>
          <ClockForm
            values={clock}
            handleClock={updateClock}
            title={!local}
            edit={true}
          />
        </>
      )}

      {isCreate && (
        <>
          <h3>Create A New Clock</h3>
          <ClockForm handleClock={handleClock} />
        </>
      )}
    </div>
  );
};

export default ClockActions;
