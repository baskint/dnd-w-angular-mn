'use strict';

var dndApp = angular.module('dndApp', ['lvl.directives.dragdrop', 'lvl.services'])

function getRootUrlAppBpaf() {
    var rootSeg = "";

    var seg = location.pathname.split('/');

    if (seg.length === 3)
        rootSeg = '/' + seg[1];

    return rootSeg;
}