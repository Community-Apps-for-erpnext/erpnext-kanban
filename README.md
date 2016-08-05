## Kanban

Modular Kanban views for Frappe Framework. Built to integrate in a generic
way.

Create `Boards` (similar to Trello or WeKan) and add any ERPNext Document to it.
All Documents in a Board can be moved around the (to be defined) colums
A simple example for such would be Scrum-like `due` > `work in progress` > `done`

### Installation
In frappe-bench folder, run:
`bench get-app kanban https://github.com/aruizramon/erpnext-kanban.git`

`bench install-app kanban`

 cd into `kanban/public/prius`

 `npm install`

Then, in ERPNext, open the Kanban app and create a "Board" with docs, etc, as well as a page (Lead Pipeline is provided as a page).

The page must be created with "glue code" to initialize the React app with the initial state coming from the server. See "Lead Pipeline".

Open the page, wait for it to load, enjoy.


### Usage
WIP

### License

MIT
