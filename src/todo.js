import parse from "date-fns/parse";

const ToDo = (title, notes, date, priority) => {
  date = parse(date, 'yyyy-MM-dd', new Date());
  const getTitle = () => title;
  const updateTitle = (newTitle) => {
    title = newTitle;
  }
  const getNotes = () => notes;
  const updateNotes = (newNotes) => {
    notes = newNotes;
  }
  const getDate = () => date;
  const updateDate = (newDate) => {
    date = newDate;
  }
  const getPriority = () => priority;
  const updatePriority = (newPriority) => {
    priority = newPriority;
  }
  return {getTitle, updateTitle, getNotes, updateNotes, 
    getDate, updateDate, getPriority, updatePriority};
}

export default ToDo;