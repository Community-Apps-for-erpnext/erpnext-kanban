from frappe import _
from frappe.client import get_list

def get_data():
    # default...list of documents
    data = [
    	{
    	"label": _("Documents"),
    	"icon": "icon-star",
    	"items": [
    		{   "type": "doctype",
    			"name": "Board",
    			"description": _("List of current Kanban boards."),
    		},
            ]
        }
    ]
    # Kanbans column with board in each.
    boards = get_list("Board", fields=['board_name'],
                      limit_page_length=None)
    board_append = {
        "label": "Kanbans",
        "icon": "icon-star",
        }
    items = []
    for board in boards:
        items.append(
            {   "type": "page",
                "name": "test",
                "description": board['board_name'],
            }
        )
    board_append['items'] = items
    board_append = [board_append]
    return data + board_append
