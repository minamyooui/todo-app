import parse from "date-fns/parse";

const ToDo = (title, notes, date, priority, done = false) => {
  const getTitle = () => title;
  const updateTitle = (newTitle) => {
    title = newTitle;
  }
  const getNotes = () => notes;
  const updateNotes = (newNotes) => {
    notes = newNotes;
  }
  const getDate = () => parse(date, 'yyyy-MM-dd', new Date());
  const updateDate = (newDate) => {
    date = newDate;
  }
  const getPriority = () => priority;
  const updatePriority = (newPriority) => {
    priority = newPriority;
  }
  const markDone = () => {
    done = true;
    console.log('marked done: ', done);
  }
  const getDone = () => {
    return done;
  };

  return {getTitle, updateTitle, getNotes, updateNotes, 
    getDate, updateDate, getPriority, updatePriority, markDone, getDone, title, notes, date, priority, done };
}

export default ToDo;