///<reference path="../../../headers/common.d.ts" />
System.register(["lodash", "angular", "./transformers", "app/core/utils/kbn"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /** @ngInject */
    function tablePanelEditor($q, uiSegmentSrv) {
        'use strict';
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'public/plugins/reftable/partials/editor.html',
            controller: RefTablePanelEditorCtrl,
        };
    }
    exports_1("tablePanelEditor", tablePanelEditor);
    var lodash_1, angular_1, transformers_1, kbn_1, RefTablePanelEditorCtrl;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (angular_1_1) {
                angular_1 = angular_1_1;
            },
            function (transformers_1_1) {
                transformers_1 = transformers_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            }
        ],
        execute: function () {///<reference path="../../../headers/common.d.ts" />
            RefTablePanelEditorCtrl = (function () {
                /** @ngInject */
                function RefTablePanelEditorCtrl($scope, $q, uiSegmentSrv) {
                    var _this = this;
                    this.$q = $q;
                    this.uiSegmentSrv = uiSegmentSrv;
                    $scope.editor = this;
                    this.panelCtrl = $scope.ctrl;
                    this.panel = this.panelCtrl.panel;
                    this.transformers = transformers_1.transformers;
                    this.unitFormats = kbn_1.default.getUnitFormats();
                    this.colorModes = [
                        { text: 'Disabled', value: null },
                        { text: 'Cell', value: 'cell' },
                        { text: 'Value', value: 'value' },
                        { text: 'Row', value: 'row' },
                    ];
                    this.columnTypes = [
                        { text: 'Number', value: 'number' },
                        { text: 'String', value: 'string' },
                        { text: 'Date', value: 'date' },
                        { text: 'Link', value: 'link' },
                        { text: 'Hidden', value: 'hidden' }
                    ];
                    this.fontSizes = ['80%', '90%', '100%', '110%', '120%', '130%', '150%', '160%', '180%', '200%', '220%', '250%'];
                    this.dateFormats = [
                        { text: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
                        { text: 'MM/DD/YY h:mm:ss a', value: 'MM/DD/YY h:mm:ss a' },
                        { text: 'MMMM D, YYYY LT', value: 'MMMM D, YYYY LT' },
                    ];
                    this.linkFormats = [
                        { text: 'ColumnLink', value: 'href="/dashboard/db/dashname?var-My={0}" title="{0}">{0}' },
                    ];
                    this.addColumnSegment = uiSegmentSrv.newPlusButton();
                    // this is used from bs-typeahead and needs to be instance bound
                    this.getColumnNames = function () {
                        if (!_this.panelCtrl.table) {
                            return [];
                        }
                        return lodash_1.default.map(_this.panelCtrl.table.columns, function (col) {
                            return col.text;
                        });
                    };
                }
                RefTablePanelEditorCtrl.prototype.getColumnOptions = function () {
                    var _this = this;
                    if (!this.panelCtrl.dataRaw) {
                        return this.$q.when([]);
                    }
                    var columns = this.transformers[this.panel.transform].getColumns(this.panelCtrl.dataRaw);
                    var segments = lodash_1.default.map(columns, function (c) { return _this.uiSegmentSrv.newSegment({ value: c.text }); });
                    return this.$q.when(segments);
                };
                RefTablePanelEditorCtrl.prototype.addColumn = function () {
                    var columns = transformers_1.transformers[this.panel.transform].getColumns(this.panelCtrl.dataRaw);
                    var column = lodash_1.default.find(columns, { text: this.addColumnSegment.value });
                    if (column) {
                        this.panel.columns.push(column);
                        this.render();
                    }
                    var plusButton = this.uiSegmentSrv.newPlusButton();
                    this.addColumnSegment.html = plusButton.html;
                    this.addColumnSegment.value = plusButton.value;
                };
                RefTablePanelEditorCtrl.prototype.transformChanged = function () {
                    this.panel.columns = [];
                    this.render();
                };
                RefTablePanelEditorCtrl.prototype.render = function () {
                    this.panelCtrl.render();
                };
                RefTablePanelEditorCtrl.prototype.removeColumn = function (column) {
                    this.panel.columns = lodash_1.default.without(this.panel.columns, column);
                    this.panelCtrl.render();
                };
                RefTablePanelEditorCtrl.prototype.setUnitFormat = function (column, subItem) {
                    column.unit = subItem.value;
                    this.panelCtrl.render();
                };
                ;
                RefTablePanelEditorCtrl.prototype.addColumnStyle = function () {
                    var columnStyleDefaults = {
                        unit: 'short',
                        type: 'number',
                        decimals: 2,
                        colors: ["rgba(245, 54, 54, 0.9)", "rgba(237, 129, 40, 0.89)", "rgba(50, 172, 45, 0.97)"],
                        colorMode: null,
                        pattern: '/.*/',
                        dateFormat: 'YYYY-MM-DD HH:mm:ss',
                        thresholds: [],
                    };
                    this.panel.styles.push(angular_1.default.copy(columnStyleDefaults));
                };
                RefTablePanelEditorCtrl.prototype.removeColumnStyle = function (style) {
                    this.panel.styles = lodash_1.default.without(this.panel.styles, style);
                };
                RefTablePanelEditorCtrl.prototype.invertColorOrder = function (index) {
                    var ref = this.panel.styles[index].colors;
                    var copy = ref[0];
                    ref[0] = ref[2];
                    ref[2] = copy;
                    this.panelCtrl.render();
                };
                return RefTablePanelEditorCtrl;
            }());
            exports_1("RefTablePanelEditorCtrl", RefTablePanelEditorCtrl);
        }
    };
});
//# sourceMappingURL=editor.js.map