# -*- coding: utf-8 -*-
# Copyright (c) 2015, Alec Ruiz-Ramon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class BoardColumn(Document):
    def get_docs_in_column(self):
        filters = {
            self.field_name: self.field_option,
        }
        # add'l filters not used, can be used for server-side filtering,
        # react filtering is better for non-sensitive data though.
        # for key, value in addl_filters.iteritems():
        #    filters[key] = value

        # TODO find way (if possible) to also get comms in query
        docs = frappe.db.sql(
            """
                SELECT *, "{0}" as "doctype"
                FROM `tab{0}`
                WHERE `{1}` = "{2}"
            """.format(self.dt, self.field_name.lower(), self.field_option),
            as_dict=True)

        full_list = []
        for doc in docs:
            doc['communications'] = self.get_communication_feed(self.dt, doc['name'])
            full_list.append(doc)
        return full_list

    def get_column_filter(self):
        meta = frappe.desk.form.meta.get_meta(self.dt)
        field = [field for field in meta.fields if field.label == self.field_name][0]
        return {'fieldname': field.fieldname, 'option': self.field_option}

    def get_display_fields(self):
        display_fields = [
            "title_field", "first_subtitle", "second_subtitle",
            "field_one", "field_two", "field_three", "field_four"
        ]
        doc_fields = self.get_associated_doc_fields()
        column_fields = frappe.client.get(self)
        board_fields = { k:v for k, v in column_fields.iteritems() if
                         k in display_fields }

        return {k: {'label': doc_fields[v].label,
                    'fieldname': doc_fields[v].fieldname,
                    'fieldtype': doc_fields[v].fieldtype
                    }
                for k, v in board_fields.iteritems()}

    def get_associated_doc_fields(self):
        meta = frappe.desk.form.meta.get_meta(self.dt)
        return {field.label: field for field in meta.fields}


# old methods
#    def get_display_fields(self):
#        """ Gets dict of display_field: doc_field pairs.
#        Gets Label:fieldname pairs from document spec'd in column,
#        and 'zips' with pairs of display_field:Label from board column"""
#
#        display_fields = [
#            "title_field", "first_subtitle", "second_subtitle",
#            "field_one", "field_two", "field_three"
#            ]
#        doc_fields = { field.label:field.fieldname for field in
#                       self.get_associated_doc_fields()}
#        col_dict = frappe.client.get(self)
#        board_fields = { k:v for k, v in col_dict.iteritems() if
#                         k in display_fields }
#        ret = {}
#        for k, v in board_fields.iteritems():
#            ret[k] = doc_fields[v]
#        return ret

#    def get_associated_doc_fields(self):
#        meta = frappe.desk.form.meta.get_meta(self.dt)
#        return [field for field in meta.fields]

    def get_communication_feed(self, doctype, docname):
        communications = frappe.client.get_list(
            "Communication",
            fields=["user", "creation", "content", "subject", "communication_date", "communication_type", "comment_type"],
            filters={
                "reference_doctype": doctype,
                "reference_name": docname}
        )
        return communications

    def get_subtitle(self):
        if self.column_subheading != "":
            meta = frappe.desk.form.meta.get_meta(self.dt)
            return [field for field in meta.fields if
                    field.label == self.column_subheading][0]
        else:
            return None

    def get_subtitle_label(self):
        return self.column_subheading
