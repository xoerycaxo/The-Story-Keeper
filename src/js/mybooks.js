function fill_template() {
    var data = {
        title: "test title",
        list: [
            {name: "test name list"}
        ]
    };
    var template = Handlebars.compile(document.querySelector("#template").innerHTML);
    var filled = template(data, {
        noEscape: true
    })
    document.querySelector("#output").innerHTML = filled;
}