import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {call, put, select} from 'redux-saga/effects';
import {DropTarget, DragSource, DragDropContext, DragLayer} from 'react-dnd';
import HTML5Backend, {getEmptyImage} from 'react-dnd-html5-backend';
import _throttle from 'lodash/throttle';
import _debounce from 'lodash/debounce';
import _isEqual from 'lodash/isEqual';
import {api, block} from '../utils';
import * as actions from './actions';
import * as actionsError from '../Error/actions';
import * as actionsTable from '../Table/actions';
import {showRemoveConfirmation} from '../dialogs/actions';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import './e-tree.scss';

const b = block('e-tree');

const constants = {
  TREE: 'tree',
  NODE_HEIGHT: 35
};

export {
  React,
  PropTypes,
  Component,
  findDOMNode,
  connect,

  DragSource,
  DropTarget,
  getEmptyImage,
  DragDropContext,
  HTML5Backend,
  DragLayer,

  _throttle,
  _debounce,
  _isEqual,
  constants,
  api,
  b,

  actions,
  actionsError,
  actionsTable,
  showRemoveConfirmation,
  DropDownMenu,

  call,
  put,
  select
};
