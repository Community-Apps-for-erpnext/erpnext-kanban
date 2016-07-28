# -*- coding: utf-8 -*-
# Copyright (c) 2015, Alec Ruiz-Ramon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

import datetime
import json


class Board(Document):
    def get_board_columns(self):
        children = self.get_all_children()
        columns = [self.make_list(entry) for entry in children if
                   entry.doctype == "Board Column"]
        return sorted(columns, key=lambda column: column['idx'])

    def get_board_filters(self):
        children = self.get_all_children()
        filters = [{'id': entry.field_name,
                    'title': entry.filter_title,
                    'type': entry.filter_type,
                    'options': [],
                    'values': []
                    } for entry in children if entry.doctype == "Board Filter"]
        return filters

    def get_board_data(self):
        """ Returns a list of columns and cards in a Board document. """
        # get children (built-in from Document). since there are two child
        #     les, use a list comprehension to filter into columns and filters
        columns = [entry for entry in self.get_all_children() if
                   entry.doctype == "Board Column"]
        filters = self.get_board_filters()
        lists = []
        cards = []

        for idx, column in enumerate(columns):
            doclist = column.get_docs_in_column()
            lists.append(self.make_list(column))
            for doc in doclist:
                cards.append(self.make_card(lists[idx], doc))

        # same speed here vs in columns loop
        for my_filter in filters:
            for card in cards:
                try:
                    option = str(card['doc'][my_filter['id']])
                    if option not in my_filter['options']:
                        my_filter['options'].append(option)
                except KeyError:
                    pass
        return { 'cards': cards, 'filters': filters, 'lists': lists }

    def make_list(self, column):
        return {
            'id': column.name,
            'idx': column.idx,
            'dt': column.dt,
            'title': column.column_title,
            'description': column.get_subtitle(),
            'display': column.get_display_fields()
        }

    def make_card(self, column_info, doc):
        display = column_info['display']
        return {
            'key': doc['name'],
            'doc': doc,
            'parentList': column_info['id'],
            # +8 seconds here
            'display': {
                'titleFieldLabel': display['title_field']['label'],
                'titleField': doc[display['title_field']['fieldname']],
                'titleFieldType': display['title_field']['fieldtype'],
                'subOneLabel': display['first_subtitle']['label'],
                'subOne': doc[display['first_subtitle']['fieldname']],
                'subOneType': display['first_subtitle']['fieldtype'],
                'subTwoLabel': display['second_subtitle']['label'],
                'subTwo': doc[display['second_subtitle']['fieldname']],
                'subTwoType': display['second_subtitle']['fieldtype'],
                'fieldOneLabel': display['field_one']['label'],
                'fieldOne': doc[display['field_one']['fieldname']],
                'fieldOneType': display['field_one']['fieldtype'],
                'fieldTwoLabel': display['field_two']['label'],
                'fieldTwo': doc[display['field_two']['fieldname']],
                'fieldTwoType': display['field_two']['fieldtype'],
                'fieldThreeLabel': display['field_three']['label'],
                'fieldThree': doc[display['field_three']['fieldname']],
                'fieldThreeType': display['field_three']['fieldtype'],
                'fieldFourLabel': display['field_four']['label'],
                'fieldFour': doc[display['field_four']['fieldname']],
                'fieldFourType': display['field_four']['fieldtype']
            },
            'url': "desk#Form/" + column_info['dt'] + '/' + doc['name'],
        }

    def update_card(self, doc):
        children = self.get_all_children()
        columns = [entry for entry in children if
                   entry.doctype == "Board Column" and
                   entry.dt == doc['doctype']]
        for column in columns:
            col_filter = column.get_column_filter()
            if doc[col_filter['fieldname']] == col_filter['option']:
                # making a list so that I can re-use make_card
                list_info = self.make_list(column)
                card = self.make_card(list_info, doc)
                card['doc']['communications'] = column.get_communication_feed(
                        doc.doctype, doc.name
                        )
                card['doc'] = date_hook(card['doc'])
                return (emit_card(card))
        else:
            card = {
                'key': doc['name'],
                'doc': doc,
                'url': "desk#Form/" + doc['doctype'] + '/' + doc['name'],
                'delete': True
            }
            emit_card(card)


def emit_card(card):
    """Prototype to emit js to window to update card. better in websocket."""
    command = "updateCard("
    command += json.dumps(card)
    command += ")"
    frappe.emit_js(command)


def date_hook(dictionary):
    for key, value in dictionary.iteritems():
        if str(type(value)) == "<type 'datetime.datetime'>":
            dictionary[key] = datetime.datetime.strftime(value, "%m-%d-%Y %H:%M:%S")
        elif str(type(value)) == "<type 'datetime.date'>":
            dictionary[key] = datetime.datetime.strftime(value, "%m-%d-%Y")
        elif str(type(value)) == "<type 'list'>":
            dictionary[key] = [date_hook(entry) for entry in value]
        elif type(value) == "<type 'dict'>":
            dictionary[key] = date_hook(value)
    return dictionary


def get_field_meta(label, doctype):
    """Get meta-info of a field.
    Helpful to convert/compare field label (i.e. Person Name) to fieldname
    (person_name), get field type (date, data, select), and so on"""
    meta = frappe.desk.form.meta.get_meta(doctype)
    try:
        field = [field for field in meta.fields if field.label == label][0]
    except:
        field = None
    return field
