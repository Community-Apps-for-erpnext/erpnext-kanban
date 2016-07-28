# -*- coding: utf-8 -*-
from __future__ import unicode_literals

app_name = "kanban"
app_title = "Kanban"
app_publisher = "Alec Ruiz-Ramon"
app_description = "Kanban views for ERPNext"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "alec.ruizramon@me.com"
app_version = "0.0.1"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = "/assets/kanban/prius/node_modules/react-selectize/themes/index.css"
app_include_js = "/assets/kanban/prius/dist/bundle.js"

# include js, css files in header of web template
# web_include_css = "/assets/kanban/css/kanban.css"
# web_include_js = "/assets/kanban/js/kanban.js"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "kanban.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "kanban.install.before_install"
# after_install = "kanban.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "kanban.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
    "*": {
 		"on_update": "kanban.kanban.board_methods.update_card"
	}
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"kanban.tasks.all"
# 	],
# 	"daily": [
# 		"kanban.tasks.daily"
# 	],
# 	"hourly": [
# 		"kanban.tasks.hourly"
# 	],
# 	"weekly": [
# 		"kanban.tasks.weekly"
# 	]
# 	"monthly": [
# 		"kanban.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "kanban.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "kanban.event.get_events"
# }
