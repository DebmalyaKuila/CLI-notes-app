const fs = require("fs");
const chalk=require("chalk");

const addnote = (title, body)=> {
  const notes = loadnotes();

  // integrating a functionality so that notes of same title doesn't get added
  const dublicatenotes=notes.filter( (note)=>{
      if (note.title.trim()===title.trim()) {
        return true;
      }
      else{
        return false;
      }
  } );

  if (dublicatenotes.length===0) {

    const newnote={
      title:title,
      body:body
    };
    // pushing "newnote" object in the "notes" array
    notes.push(newnote);
    // savenotes overwrites the old data in "notes" array to be replaced by new data
    savenotes(notes);

    console.log(chalk.green("New note added !!!"));
  } else {
    console.log(chalk.red("Note title is already taken !!!"))
  }

 
};

// a function to load existing notes-data
const loadnotes =()=> {
  // if data exists it  will return the data array ,if no data exists it will return empty array
  try {
    const dataBuffer = fs.readFileSync("notes_data.json");
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (e) {
    const emptyarray = [];
    return emptyarray;
  }
  
};

// function to save the data after pushing "newnote" in the "notes" array
const savenotes=(notesarray)=>{
    const dataJSON=JSON.stringify(notesarray);
    fs.writeFileSync("notes_data.json",dataJSON);
};

// function to remove data 
const removenote = (title)=>{

const notes = loadnotes();
  
const removenote=notes.filter( (note)=>{
  return note.title===title ;
});

if (removenote.length!==0) {
  const newnotes=notes.filter( (note)=>{
    return note.title !== title ;
  });
  savenotes(newnotes);
  console.log(chalk.bgGreen("Removed the note"));
} else {
  console.log(chalk.bold.red.inverse("No such note is present"));
}
  
};

// function to list all the notes title
const list =()=>{
  console.log(chalk.bgCyanBright.bold("Your Notes-"));
  const notes =loadnotes();
  notes.map( (note)=>{
    console.log(chalk.blue("*"+note.title));
  })

};

// function to read note of given title
const read =(title)=>{
    const notes=loadnotes();
    const readnote=notes.find( (note)=>note.title===title );
    if (readnote) {
    const content =readnote.body;
    console.log(chalk.blue(readnote.title));
    console.log(content);
    } else {
      console.log(chalk.red.inverse("No note found !!"));
    }
    
};

// exporting functions addnote,removenote as an object
module.exports={
  addnote:addnote,
  removenote:removenote,
  list:list,
  read:read
} 