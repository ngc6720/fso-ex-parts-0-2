#### 0.4: New note diagram
```mermaid
sequenceDiagram
	participant browser
	participant server
	Note right of browser: user writes in input field and then clicks the form's button,<br/> triggering the form's action (passing the note in the req body)
	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note 
	activate server
	Note left of server: server extracts the new note from the body of the request,<br/> creates a note object with it and a timestamp<br/> and pushes the object to a notes array,<br/> then redirects the browser to /exampleapp/notes
	server-->>browser: redirects to https://studies.cs.helsinki.fi/exampleapp/notes
	deactivate server
	Note right of browser: browser reloads /exampleapp/notes page<br/> which shows the changes to the note array
```
#### 0.5: Single page app diagram
```mermaid
sequenceDiagram
	participant browser
	participant server
	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: JS file
    deactivate server
    Note right of browser: browser starts executing the JS code<br/> that fetches the JSON from the server
     browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server
    Note right of browser: browser parses the data, assigns it to "notes" <br/> and updates the dom from the notes array
```
#### 0.6: New note in Single page app diagram
```mermaid
sequenceDiagram
	participant browser
	participant server
	Note right of browser: user writes in input field and then clicks the form's button,<br/> triggering the form's event of type "submit".<br/> the submit handler creates a new object with the note and a timestamp,<br/> pushes it to the client side notes array,<br/> and updates the dom with from the array before stringifying<br/> the object and sending it to the server
	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa 
	activate server
	Note right of browser: the request has "application/json" as Content-Type
	Note left of server: server appends the new note to data.json
	deactivate server
```