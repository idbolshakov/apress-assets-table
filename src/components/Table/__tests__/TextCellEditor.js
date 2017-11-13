import React from 'react';

import {getStateSetter} from '../../../../test/testUtils';
import {getShallowWrapper} from '../../../../test/testUtils';
import TextCellEditor from '../containers/TextCellEditor';


describe('TextCellEditor', () => {
  const maxLength = 75;
  const className = '.e-table-cell-text';
  const props = {
    isEdit: false,
    maxLen: maxLength,
    handlerEdit: jest.fn(),
    handlerSave: jest.fn()
  };
  const setProps = getStateSetter(props);

  describe('read only mode', () => {
    const freezedProps = setProps();
    let wrapper;

    beforeEach(() => {
      wrapper = getShallowWrapper(TextCellEditor, freezedProps);
    });

    it('should be enabled the read only mode', () => {
      const container = wrapper.find(className);

      expect(container.is('.is-edit')).toEqual(false);
      expect(container.prop('contentEditable')).toEqual(false);
    });

    it('should not listen to an blur event', () => {
      expect(wrapper.getNode().props.onBlur).toBeUndefined();
    });

    it('should not listen to an keydown event', () => {
      expect(wrapper.getNode().props.onKeyDown).toBeUndefined();
    });

    it('should not listen to an keypress event', () => {
      expect(wrapper.getNode().props.onKeyPress).toBeUndefined();
    });

    it('should not listen to an keyup event', () => {
      expect(wrapper.getNode().props.onKeyUp).toBeUndefined();
    });

    it('should not listen to an paste event', () => {
      expect(wrapper.getNode().props.onPaste).toBeUndefined();
    });
  });

  describe('content editable mode', () => {
    const freezedProps = setProps({isEdit: true});
    const event = {target: {textContent: ''}};
    let wrapper;
    let container;
    let instance;

    beforeEach(() => {
      wrapper = getShallowWrapper(TextCellEditor, freezedProps);
      container = wrapper.find(className);
      instance = wrapper.instance();
    });

    it('should be enabled the edit mode', () => {
      expect(container.is('.is-edit')).toEqual(true);
      expect(container.prop('contentEditable')).toEqual(true);
    });

    it('should listen to an blur event', () => {
      spyOn(instance, 'save');
      container.simulate('blur', event);

      expect(instance.save).toHaveBeenCalled();
    });

    it('should listen to an keydown event', () => {
      spyOn(instance, 'handleKeyDown');
      container.simulate('keydown');

      expect(instance.handleKeyDown).toHaveBeenCalled();
    });

    it('should listen to an keypress event', () => {
      spyOn(instance, 'handleKeyPress');
      container.simulate('keypress');

      expect(instance.handleKeyPress).toHaveBeenCalled();
    });

    it('should listen to an keyup event', () => {
      spyOn(instance, 'setCharactersCountLeft');
      container.simulate('keyup', event);

      expect(instance.setCharactersCountLeft).toHaveBeenCalled();
    });

    it('should listen to an paste event', () => {
      spyOn(instance, 'handlePaste');
      container.simulate('paste');

      expect(instance.handlePaste).toHaveBeenCalled();
    });
  });

  describe('componentWillReceiveProps(nextProps)', () => {
    it('should clear state.charactersLeft', () => {
      const freezedProps = setProps({isEdit: true});
      const wrapper = getShallowWrapper(TextCellEditor, freezedProps);
      const instance = wrapper.instance();
      const nextProps = setProps();

      wrapper.setProps(nextProps);

      expect(wrapper.state('charactersLeft'))
        .toBe(instance.getCharectersCountLeft(nextProps.text, nextProps));
    });

    it('should set state.charactersLeft', () => {
      const freezedProps = setProps();
      const wrapper = getShallowWrapper(TextCellEditor, freezedProps);
      const instance = wrapper.instance();
      const nextProps = setProps({text: '', isEdit: true});

      wrapper.setProps(nextProps);

      expect(wrapper.state('charactersLeft'))
        .toBe(instance.getCharectersCountLeft(nextProps.text, nextProps));
    });
  });

  describe('getCharectersCountLeft(text, props)', () => {
    const text = 'text example';

    it('should return an empty string in read-only mode', () => {
      const freezedProps = setProps();
      const wrapper = getShallowWrapper(TextCellEditor, freezedProps);
      const instance = wrapper.instance();

      expect(instance.getCharectersCountLeft(text, freezedProps)).toBe('');
    });

    it('should return the number of remaining characters in edit mode', () => {
      const freezedProps = setProps({isEdit: true});
      const wrapper = getShallowWrapper(TextCellEditor, freezedProps);
      const instance = wrapper.instance();

      expect(instance.getCharectersCountLeft(text, freezedProps)).toBe(freezedProps.maxLen - text.length);
    });
  });

  describe('getEventHandlers()', () => {
    it('should return an empty object in read-only mode', () => {
      const freezedProps = setProps();
      const wrapper = getShallowWrapper(TextCellEditor, freezedProps);
      const handlers = wrapper.instance().getEventHandlers();

      expect(Object.keys(handlers).length).toBe(0);
    });

    it('should return the object with event handlers in edit mode', () => {
      const freezedProps = setProps({isEdit: true});
      const wrapper = getShallowWrapper(TextCellEditor, freezedProps);
      const handlers = wrapper.instance().getEventHandlers();
      const expected = ['onBlur', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onPaste'];

      expect(Object.keys(handlers)).toEqual(expected);
    });
  });

  describe('setCharactersCountLeft(text, props)', () => {
    const changedText = 'changed text';

    it('should not update the state in read-only mode', () => {
      const freezedProps = setProps({text: ''});
      const wrapper = getShallowWrapper(TextCellEditor, freezedProps);
      const instance = wrapper.instance();
      const prevStateCharactersLeft = wrapper.state('charactersLeft');

      instance.setCharactersCountLeft(changedText, freezedProps);

      expect(wrapper.state('charactersLeft')).toBe(prevStateCharactersLeft);
    });

    it('should update the state in edit mode', () => {
      const freezedProps = setProps({text: '', isEdit: true});
      const wrapper = getShallowWrapper(TextCellEditor, freezedProps);
      const instance = wrapper.instance();
      const prevStateCharactersLeft = wrapper.state('charactersLeft');

      instance.setCharactersCountLeft(changedText, freezedProps);

      expect(wrapper.state('charactersLeft')).not.toBe(prevStateCharactersLeft);
    });
  });

  describe('save()', () => {
    const textToSave = 'textToSave';

    beforeEach(() => {
      spyOn(props, 'handlerEdit');
      spyOn(props, 'handlerSave');

      const wrapper = getShallowWrapper(TextCellEditor, props);

      wrapper.instance().save(textToSave);
    });

    it('should call handlerEdit', () => {
      expect(props.handlerEdit).toHaveBeenCalledWith(false);
    });

    it('should call handlerSave', () => {
      expect(props.handlerSave).toHaveBeenCalledWith(textToSave);
    });
  });

  describe('paste(e)', () => {
    const freezedProps = setProps();
    const wrapper = getShallowWrapper(TextCellEditor, freezedProps);
    const instance = wrapper.instance();
    const textContent = 'textContent';
    const clipboardData = 'clipboardData';

    it('should not change the original text if the text to insert is missing', () => {
      const event = {
        target: {textContent},
        clipboardData: {
          getData: () => null
        }
      };

      instance.paste(event);
      expect(event.target.textContent).toBe(textContent);
    });

    it('should insert text at the beginning of the line', () => {
      const event = {
        target: {textContent},
        clipboardData: {
          getData: () => clipboardData
        }
      };

      window.getSelection = () => ({
        getRangeAt: () => ({
          startOffset: 0,
          startContainer: {firstChild: {}},
          setStart: jest.fn()
        })
      });

      instance.paste(event);
      expect(event.target.textContent).toBe(clipboardData + textContent);
    });

    it('should insert text at the end of the line', () => {
      const event = {
        target: {textContent},
        clipboardData: {
          getData: () => clipboardData
        }
      };

      window.getSelection = () => ({
        getRangeAt: () => ({
          startOffset: textContent.length,
          startContainer: {firstChild: {}},
          setStart: jest.fn()
        })
      });

      instance.paste(event);
      expect(event.target.textContent).toBe(textContent + clipboardData);
    });

    it('should insert text at the middle of the line', () => {
      const middleOfTextContent = textContent.length / 2;
      const event = {
        target: {textContent},
        clipboardData: {
          getData: () => clipboardData
        }
      };

      window.getSelection = () => ({
        getRangeAt: () => ({
          startOffset: middleOfTextContent,
          startContainer: {firstChild: {}},
          setStart: jest.fn()
        })
      });

      instance.paste(event);
      expect(event.target.textContent)
        .toBe(textContent.substring(0, middleOfTextContent) + clipboardData + textContent.substring(middleOfTextContent));
    });

    it('should insert a piece of text', () => {
      const text = 'a'.repeat(maxLength - clipboardData.length / 2);
      const event = {
        target: {textContent: text},
        clipboardData: {
          getData: () => clipboardData
        }
      };
      const middleOfTextContent = text.length / 2;
      const pastedLength = maxLength - text.length;

      window.getSelection = () => ({
        getRangeAt: () => ({
          startOffset: middleOfTextContent,
          startContainer: {firstChild: {}},
          setStart: jest.fn()
        })
      });

      instance.paste(event);
      expect(event.target.textContent).toBe(
        text.substring(0, middleOfTextContent) +
        clipboardData.substring(0, pastedLength) +
        text.substring(middleOfTextContent)
      );
    });
  });

  describe('handleKeyDown(e)', () => {
    const event = {
      keyCode: 1,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {textContent: 'textContent'}
    };
    let container;
    let instance;

    beforeEach(() => {
      const freezedProps = setProps({isEdit: true});
      const wrapper = getShallowWrapper(TextCellEditor, freezedProps);

      container = wrapper.find(className);
      instance = wrapper.instance();

      spyOn(instance, 'save');
    });

    it('should not do anything', () => {
      spyOn(event, 'preventDefault');
      spyOn(event, 'stopPropagation');

      container.simulate('keydown', event);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(event.stopPropagation).not.toHaveBeenCalled();
      expect(instance.save).not.toHaveBeenCalled();
    });

    it('should handle keystroke Enter', () => {
      const e = {...event, keyCode: 13};

      spyOn(e, 'preventDefault');
      spyOn(e, 'stopPropagation');

      container.simulate('keydown', e);

      expect(e.preventDefault).toHaveBeenCalled();
      expect(e.stopPropagation).toHaveBeenCalled();
      expect(instance.save).toHaveBeenCalledWith(e.target.textContent);
    });
  });

  describe('handleKeyPress(e)', () => {
    let container;

    beforeEach(() => {
      const freezedProps = setProps({isEdit: true});
      const wrapper = getShallowWrapper(TextCellEditor, freezedProps);

      container = wrapper.find(className);
    });

    it('should not do anything', () => {
      const event = {
        target: {textContent: 'textContent'},
        preventDefault: jest.fn()
      };

      spyOn(event, 'preventDefault');
      container.simulate('keypress', event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should stop the event', () => {
      const event = {
        target: {textContent: 'a'.repeat(maxLength)},
        preventDefault: jest.fn()
      };

      spyOn(event, 'preventDefault');
      container.simulate('keypress', event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('handlePaste(e)', () => {
    let container;
    let instance;

    beforeEach(() => {
      const freezedProps = setProps({isEdit: true});
      const wrapper = getShallowWrapper(TextCellEditor, freezedProps);

      container = wrapper.find(className);
      instance = wrapper.instance();

      spyOn(instance, 'paste');
    });

    it('should stop the event', () => {
      const event = {
        target: {textContent: 'a'.repeat(maxLength)},
        preventDefault: jest.fn()
      };

      spyOn(event, 'preventDefault');
      container.simulate('paste', event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(instance.paste).not.toHaveBeenCalled();
    });

    it('should call paste method', () => {
      const event = {
        target: {textContent: 'textContent'},
        preventDefault: jest.fn()
      };

      spyOn(event, 'preventDefault');
      container.simulate('paste', event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(instance.paste).toHaveBeenCalledWith(event);
    });
  });
});
