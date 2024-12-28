import { useEffect, useState } from "react";

const Timer = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [remainingTime, setRemainingTime] = useState(Timer);

  // Decrease remainingTime every 10 ms
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval); // Clear interval when time reaches 0
          return 0;
        }
        return prevTime - 10;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Call onConfirm after 3000 ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      onConfirm();
    }, Timer);

    return () => {
      clearTimeout(timeout);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      {/* Display progress bar */}
      <progress value={Timer - remainingTime} max={Timer} />
    </div>
  );
}
