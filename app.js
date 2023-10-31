const yargs=require("yargs");

const { addnote,removenote,list,read }=require("./notes.js")

// creating add command for notes-app
yargs.command({
    command:"add",
    describe:"this command adds a new note",
    builder:{
        title:{
            describe:"title of the note to be added",
            demandOption:true,
            type:"string"
        },
        body:{
            describe:"body of the note to be added",
            demandOption:true,
            type:"string"
        }
    },
    handler: function(argv) {
      addnote(argv.title,argv.body)
    }
});
// creating remove command for notes-app
yargs.command({
    command:"remove",
    describe:"this command removes a note",
    builder:{
        title:{
            describe:"Title of the note to be removed",
            demandOption:true,
            type:"string"
        }
    },
    handler: function (argv) {
       removenote(argv.title);
    }
});
// creating read command for notes-app
yargs.command({
    command:"read",
    describe:"this command shows context of the note",
    builder:{
        title:{
            describe:"title of the note to be read",
            demandOption:true,
            type:"string"
        }
    },
    handler: function (argv) {
        read(argv.title)
    }
});
// creating list command for notes-app
yargs.command({
    command:"list",
    describe:"this command lists the stored notes",
    handler: () =>{
       list();
    }
});

yargs.parse();
