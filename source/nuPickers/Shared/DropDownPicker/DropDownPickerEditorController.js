﻿
angular
    .module("umbraco")
    .controller("nuPickers.Shared.DropDownPicker.DropDownPickerEditorController",
        ['$scope', 'nuPickers.Shared.Editor.EditorResource',
        function ($scope, editorResource) {

            editorResource.getEditorDataItems($scope.model).then(function (response) {
                $scope.dropDownPickerOptions = response.data;

                editorResource.getPickedKeys($scope.model).then(function (pickedKeys) {
                    if (pickedKeys[0]) {
                        var i = 0;
                        var found = false;

                        while (!found && i < $scope.dropDownPickerOptions.length) {

                            if ($scope.dropDownPickerOptions[i].key == unescape(pickedKeys[0])) {
                                $scope.pickedOption = $scope.dropDownPickerOptions[i];
                                found = true;
                            }

                            i++;
                        } 
                    }
                });

                $scope.dropDownChange = function() {
                    $scope.model.value = editorResource.createSaveValue($scope.model.config, [$scope.pickedOption]);
                };

            });

        }]);