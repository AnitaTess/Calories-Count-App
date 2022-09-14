// Calories Count

$(document).ready(function(){
	
	//setup a listener on the form for the submit event
	$('#noteForm').on('submit', function(e){
		
		//let allows you to declare variables that are limited to scope to the block, statement,
		//or expression on whitch it is used
		
		let note ={
			
			id: guidGenerator(),
			mealtitle: $('#mealtitle').val(),
			mealtype: $('#mealtype').val(),
			date: $('#date').val(),
			calories: $('#calories').val(),
			mealdescription: $('#mealdescription').val(),
		}
		
		//addNote function
		
		addNote(note);
		
		//prevents the form from submitting to a file
		e.preventDefault();	  
	});
	
});

		//////////////// Before The Home Page loads ////////////////

$(document).on('pagebeforeshow', '#home', function(){
	
	getNotes();
	getNumberofNotes();
	
});

		/////////////// Before The Meals Page Loads ////////////////////

$(document).on('pagebeforeshow', '#notes', function(){
	
	getNote(); 
	
});


		///////////////function giving each meal it's own unique id//////////////////

// Generate ID

function guidGenerator(){
	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		
	};
	
	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}


//End of Generate meal ID


////////////////////addNote function taking in the note object and savimg the meal to Local Storage /////////////////////////////

function addNote(note){
	
	// checking if a note array already exists in local stoarge
	if (localStorage.getItem('notes') === null){
		
		// if the notes array doesn't exists in creae and empty array 
		let notes = [];
		// taking the notes array and pushing onto it the note which is passed into the function
		notes.push(note);
		// setting the LS value
		localStorage.setItem('notes', JSON.stringify(notes));
	}else // if the notes array does exist
		{
			// pulling it out and passing it to the variable called notes
			let notes = JSON.parse(localStorage.getItem('notes'));
			notes.push(note);
			
			localStorage.setItem('notes', JSON.stringify(notes));
		}
		// clearing the add meal page
		$('#mealtitle').val(''),
		$('#mealtype').val(''),
		$('#date').val(''),
		$('#calories').val(''),
		$('#mealdescription').val(''),
	
		//changing the page back to home
		$.mobile.changePage('#home');
	
}

////////////////////getNotes function will get all of our meals from Local Storage/////////////

function getNotes(){
	
	let outputStoredNotes = '';
	if(localStorage.getItem('notes') == null || localStorage.getItem('notes') == '[]' ){
		
		//assigning the outputStoredNotes variable to a <li> tag
		outputStoredNotes = '<li> No Notes Found </li>';
		$('#notes').html(outputStoredNotes).listview('refresh');
		
		//if the notes are already in local storage
	}else {
		
		let notes = JSON.parse(localStorage.getItem('notes'));
		//loop through local storage with the jQuery each loop
		$.each(notes, function(index, note){
		//append each meal to our outputStoredNotes variable
			
			outputStoredNotes += `
			
			<li>
				<a onclick="noteClicked('${note.id}')">${note.mealtitle}</a>
			</li>

			`;
	});
		
		//output our stored meals once the loop ends
		
		$('#notes').html(outputStoredNotes).listview('refresh'); //Test at this point
	}
}

///////////////////// noteClicked function to click on the chosen meal /////////////////////////////

function noteClicked(noteId){
	
	sessionStorage.setItem('noteId', noteId);
	$.mobile.changePage('#notes');
}

//////////////////// getNote function //////////////////////////////////

function getNote(){
	
	if (sessionStorage.getItem('noteId') === null){
		
		$.mobile.changePage('#home');
	}else {
		
		let notes = JSON.parse(localStorage.getItem('notes'));
		$.each(notes, function(index, note){
			
			if (note.id === sessionStorage.getItem('noteId')){
				
				let outputStoredNotes = `
					
					<h2>${note.mealtitle}</h2>
					<h4>${note.mealtype}</h4>
					<h4>${note.date}</h4>
					<h4>${note.calories}</h4>
					<h4>${note.mealdescription}</h4>

					
					<button onclick="deleteNote('${note.id}')"  class="ui-btn">Delete Note</a>

					`;
					
					$('#noteDetails').html(outputStoredNotes);
			}
			
		});
	}
}

//////////////////////// deleting meal function //////////////////////////

function deleteNote(noteId){
	
	let notes = JSON.parse(localStorage.getItem('notes'));
	$.each(notes, function(index, note){
		
		if (note.id === noteId){
			
			notes.splice(index, 1);
		}
		
	});
	
	localStorage.setItem('notes', JSON.stringify(notes));
	$.mobile.changePage('#home');
}

/////////////////// getting number of calories ////////////////////////////////////

	function getNumberofNotes(){
		let output = '';
		if(localStorage.getItem('notes') === null){
		  output = '<li style="text-align:center">Total Calores: 0</li>';
		  $('#noteCount').html(output).listview('refresh');
		} else {
		  let notes = JSON.parse(localStorage.getItem('notes'));
		  let calories = 0;
		  $.each(notes,function(index, note){
			calories = calories + parseInt(note.calories);
		  });
		  output = '<li style="text-align:center">Total Calores: '+calories+'</li>';
		  $('#noteCount').html(output).listview('refresh');
		}
	  }

	 /////////////////// getting uses's message and details to localStorage //////////////////////////////////// 
	 $(document).ready(function(){
	
		//setup a listener on the form for the submit event
		$('#contactForm').on('submit', function(){
	 
	 let name = document.getElementById("name").value;
	 let email = document.getElementById("email").value;
	 let subject = document.getElementById("subject").value;
	 let message = document.getElementById("message").value;

	 localStorage.setItem("name",name);
	 localStorage.setItem("email",email);
	 localStorage.setItem("subject",subject);
	 localStorage.setItem("message",message); }) })