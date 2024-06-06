import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

interface TodoProps {
  task: {
    id: string;
    task: string;
    deadline?: number; // Opcjonalny deadline
    completed: boolean;
  };
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  plugWeekly: (task: string) => void;
}

const Todo: React.FC<TodoProps> = ({ task, deleteTodo, editTodo, toggleComplete, plugWeekly }) => {
  const [initialTime, setInitialTime] = useState<number>(Date.now()); // Pierwotny czas
  const [intervalDuration, setIntervalDuration] = useState<number>(1000); // Długość interwału
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>(
    calculateTimeLeft(task.deadline, initialTime)
  ); // Początkowy czas

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(task.deadline, initialTime));
    }, intervalDuration);

    return () => clearInterval(timer);
  }, [task.deadline, initialTime, intervalDuration]);

  function calculateTimeLeft(deadline: number | undefined, initialTime: number): { days: number; hours: number; minutes: number; seconds: number } {
    if (!deadline) return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Jeśli nie ma deadline'u, zwracamy czas zerowy

    const difference = deadline - (initialTime + intervalDuration);
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Jeśli czas upłynął, zwracamy czas zerowy

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  const handlePlugWeekly = () => {
    plugWeekly(task.task);
  };

  const handleReset = () => {
    if (task.deadline) {
      if (task.task === 'Weekly Task') {
        plugWeekly(task.task);
      } else {
        toggleComplete(task.id);
      }
    }
  };

  return (
    <div className="Todo">
      <p className={`${task.completed ? 'completed' : 'incompleted'}`} onClick={() => toggleComplete(task.id)}>
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
      {task.completed ? (
        <span>Completed</span>
      ) : (
        <>
          <span>{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</span>
          <button onClick={handleReset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Todo;
