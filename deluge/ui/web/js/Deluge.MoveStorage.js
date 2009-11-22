/*
Script: Deluge.MoveStorage.js
    Contains the move storage window.

Copyright:
	(C) Damien Churchill 2009 <damoxc@gmail.com>
	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 3, or (at your option)
	any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, write to:
		The Free Software Foundation, Inc.,
		51 Franklin Street, Fifth Floor
		Boston, MA  02110-1301, USA.

    In addition, as a special exception, the copyright holders give
    permission to link the code of portions of this program with the OpenSSL
    library.
    You must obey the GNU General Public License in all respects for all of
    the code used other than OpenSSL. If you modify file(s) with this
    exception, you may extend this exception to your version of the file(s),
    but you are not obligated to do so. If you do not wish to do so, delete
    this exception statement from your version. If you delete this exception
    statement from all source files in the program, then also delete it here.
*/

Ext.namespace('Ext.deluge');
Ext.deluge.MoveStorage = Ext.extend(Ext.Window, {
	
	constructor: function(config) {
		config = Ext.apply({
			title: _('Move Storage'),
			width: 375,
			height: 110,
			layout: 'fit',
			buttonAlign: 'right',
			closeAction: 'hide',
			closable: true,
			iconCls: 'x-deluge-move-storage',
			plain: true,
			resizable: false
		}, config);
		Ext.deluge.MoveStorage.superclass.constructor.call(this, config);
	},

	initComponent: function() {
		Ext.deluge.MoveStorage.superclass.initComponent.call(this);

		this.addButton(_('Cancel'), this.onCancel, this);
		this.addButton(_('Move'), this.onMove, this);

		this.form = this.add({
			xtype: 'form',
			border: false,
			defaultType: 'textfield',
			width: 300,
			bodyStyle: 'padding: 5px'
		});

		this.moveLocation = this.form.add({
			fieldLabel: _('Location'),
			name: 'location',
			width: 240
		});
	},

	hide: function() {
		Ext.deluge.MoveStorage.superclass.hide.call(this);
		this.torrentIds = null;
	},

	show: function(torrentIds) {
		Ext.deluge.MoveStorage.superclass.show.call(this);
		this.torrentIds = torrentIds;
	},

	onCancel: function() {
		this.hide();
	},

	onMove: function() {
		var dest = this.moveLocation.getValue();
		Deluge.Client.core.move_storage(this.torrentIds, dest);
		this.hide();
	}
});
Deluge.MoveStorage = new Ext.deluge.MoveStorage();