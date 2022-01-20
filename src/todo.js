import parse from "date-fns/parse";

const ToDo = (title, notes, date, priority) => {
  let done = false;
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
    if (done) {
      done = false;
    } else {
      done = true;
    }
    console.log(done);
  }
  return {getTitle, updateTitle, getNotes, updateNotes, 
    getDate, updateDate, getPriority, updatePriority, markDone, title, notes, date, priority };
}

export default ToDo;