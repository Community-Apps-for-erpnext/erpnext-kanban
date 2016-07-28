frappe.pages['lead-pipeline'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Lead Pipeline',
		single_column: true
	});

  wrapper.lead_pipeline = new Kanban(page, wrapper);

  frappe.breadcrumbs.add("Kanban");
}

this.Kanban = Class.extend({
init: function(page, wrapper) {
	var me = this;
	frappe.call({
		freeze: true,
		method: "kanban.kanban.board_methods.get_data",
		args: {
			"page_name": "lead-pipeline"
		},
		callback: function(r){
			load_my_kanban(r.message);
			// console.log(r.message)
		}
	});
		$(".offcanvas-container").append("<div id='canvas'></div>")
		//$("#canvas").replaceWith(frappe.render_template("/assets/kanban/prius/index.html"));
	},
});
