import parse from "date-fns/parse";

const ToDo = (title, notes, date, priority) => {
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
  return {getTitle, updateTitle, getNotes, updateNotes, 
    getDate, updateDate, getPriority, updatePriority, title, notes, date, priority };
}

export default ToDo;