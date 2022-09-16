var cast = {
    "characters": [
        {
            "name": "Jon Snow",
            // "shortCode": "jon-snow", 
            "actor": "Kit Harrington",
            "house": "Stark",
            "location": "The Wall"
        },
        {
            "name": "Bob Snow",
            // "shortCode": "bob-snow",
            "actor": "Nick Harrington",
            "house": "Shark",
            "location": "The Ceiling"
        },
        {
            "name": "Joe Snow",
            // "shortCode": "joe-snow",
            "actor": "Bill Harrington",
            "house": "Blark",
            "location": "The Window"
        },
        {
            "name": "Steve Snow",
            // "shortCode": "steve-snow",
            "actor": "Jill Harrington",
            "house": "Tart",
            "location": "The Floor"
        },

    ]
}

$(document).ready(function() {
    var characterTemplate = $("#character-template").html();
    var compiledCharacterTemplate = Handlebars.compile(characterTemplate);
    $(".character-list-container").html(compiledCharacterTemplate(cast.characters));
});