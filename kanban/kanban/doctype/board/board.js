// Copyright (c) 2016, Alec Ruiz-Ramon and contributors
// For license information, please see license.txt

//frappe.ui.form.on("Board Column", "test", function(doc, cdt, cdn){
//	var doc = locals[cdt][cdn]
//	frappe.call({
//		method: "kanban.kanban.board_methods.get_docs_in_column",
//		args: {
//			"board_column": doc
//		},
//		callback: function(r){
//			frappe.msgprint(r.message);
//		}
//	})
//});


// Long function here...had to nest prompts.
frappe.ui.form.on("Board Column", "set_up_column", function(doc, cdt, cdn){
	var doc = locals[cdt][cdn]
	// First prompt - user selects which doctype will be referenced in col.
	// Callback uses selected doc to get fields with type 'Select' in doc meta
	frappe.prompt(
		{label: "Doctype for Column", fieldtype: "Link", options: "DocType"},
		function(data) {
			doc.dt = data.doctype_for_column;
			cur_frm.refresh();
			frappe.call({
				method: "kanban.kanban.board_methods.get_select_fields",
				args: {
					"doc": doc
				},
				// Callback prompts user to choose one of the fields to use for column
				callback: function(r){
					var chosen_field = frappe.prompt(
						{label: "Field Name", fieldtype: "Select", options: r.message},
					function(data) {
					  console.log(data.field_name)
				    doc.field_name = data.field_name;
						cur_frm.refresh();
						frappe.call({
							method: "kanban.kanban.board_methods.get_field_options",
							args: {
								"doc": doc,
								"chosen_field": doc.field_name
						},
						// Callback prompts user to select which field option will be used
						// in the column
						callback: function(r){
							console.log(r.message)
							var chosen_option = frappe.prompt(
								{label: "Field Option", fieldtype: "Select",
								options: r.message},
								function(data) {
									console.log(data.field_option);
									doc.field_option = data.field_option;
									cur_frm.refresh();
								}
							)
						}
						})
					});
				}
			})
		});
});


// Prompt to give user fields to choose for title, card fields, etc.
frappe.ui.form.on("Board Column", "set_up_fields", function(doc, cdt, cdn){
	var doc = locals[cdt][cdn]
	frappe.call({
		method: "kanban.kanban.board_methods.get_all_fields",
		args: {
			"doc": doc
		},
		callback: function(r){
			var fields_dict = frappe.prompt([
				{ label: "Title Field", fieldtype: "Select",
				  name: "title_field", options: r.message },
				{ label: "First Subtitle", fieldtype: "Select",
				  name: "first_subtitle", options: r.message },
				{ label: "Second Subtitle", fieldtype: "Select",
				  name: "second_subtitle", options: r.message },
				{ label: "Field One", fieldtype: "Select",
				  name: "field_one", options: r.message },
				{ label: "Field Two", fieldtype: "Select",
			  	name: "field_two", options: r.message },
				{ label: "Field Three", fieldtype: "Select",
				  name: "field_three", options: r.message }
				],
			function(data) {
				console.log(data);
				doc.title_field = data.title_field;
				doc.first_subtitle = data.first_subtitle;
				doc.second_subtitle = data.second_subtitle;
				doc.field_one = data.field_one;
				doc.field_two = data.field_two;
				doc.field_three = data.field_three;
				cur_frm.refresh();
				}
			)
		}
	})
});

frappe.ui.form.on("Board Filter", "set_up_filter", function(doc, cdt, cdn){
	var doc = locals[cdt][cdn]
	doc.dt = "Lead"

// get all fields, not just select
	frappe.call({
		method: "kanban.kanban.board_methods.get_select_fields",
		args: {
			"doc": doc
		},
		callback: function(r){
			var chosen_field = frappe.prompt(
				{label: "Filter Name", fieldtype: "Select", options: r.message},
				function(data) {
					cur_frm.refresh();
			    doc.filter_name = data.filter_name;
					cur_frm.refresh();
					var chosen_option = frappe.prompt(
						{label: "Filter Type", fieldtype: "Select",
						options: ["Select", "Multiselect", "Date"]},
						function(data) {
							doc.filter_type = data.filter_type;
							cur_frm.refresh();
						}
					)
			})
		}
	})
});
