import React from 'react';

import {getStateSetter} from '../../../../test/testUtils';
import {getShallowWrapper} from '../../../../test/testUtils';
import {TextCellCKEditor} from '../containers/TextCellCKEditor';


describe('TextCellCKEditor', () => {
  const maxLength = 75;
  const props = {
    name: 'TextCellCKEditor',
    maxLen: maxLength,
    handlerEdit: jest.fn(),
    handlerSave: jest.fn()
  };
  const setProps = getStateSetter(props);

  describe('getCharectersCountLeft(editor)', () => {
    it('should return the number of remaining characters', () => {
      const freezedProps = setProps();
      const wrapper = getShallowWrapper(TextCellCKEditor, freezedProps);
      const instance = wrapper.instance();
      const text = 'text';
      const editor = {
        getData: () => text
      };

      expect(instance.getCharectersCountLeft(editor)).toBe(freezedProps.maxLen - text.length);
    });
  });

  describe('setCharactersCountLeft(editor)', () => {
    it('should set the number of remaining characters', () => {
      const freezedProps = setProps();
      const wrapper = getShallowWrapper(TextCellCKEditor, freezedProps);
      const instance = wrapper.instance();
      const editor = {
        getData: () => '',
        container: {
          setAttribute: jest.fn()
        }
      };

      spyOn(editor.container, 'setAttribute');
      instance.setCharactersCountLeft(editor);

      expect(editor.container.setAttribute)
        .toHaveBeenCalledWith('data-charactersLeft', instance.getCharectersCountLeft(editor));
    });
  });

  describe('closeEditorInstance(editor)', () => {
    it('should close editor', () => {
      spyOn(props, 'handlerEdit');
      spyOn(props, 'handlerSave');

      const wrapper = getShallowWrapper(TextCellCKEditor, props);
      const instance = wrapper.instance();
      const editor = {
        getData: jest.fn(),
        destroy: jest.fn()
      };

      spyOn(editor, 'destroy');
      instance.closeEditorInstance(editor);

      expect(props.handlerEdit).toHaveBeenCalledWith(false);
      expect(props.handlerSave).toHaveBeenCalledWith(editor.getData());
      expect(editor.destroy).toHaveBeenCalled();
    });
  });

  describe('handleBlur(e)', () => {
    const componentProps = {
      ...props,
      addError: jest.fn(),
      removeError: jest.fn()
    };
    let instance;

    beforeEach(() => {
      const wrapper = getShallowWrapper(TextCellCKEditor, componentProps);
      instance = wrapper.instance();

      componentProps.addError.mockClear();
      componentProps.removeError.mockClear();
    });

    it('should add the error message', () => {
      const errorText = `Превышен лимит по количеству символов в колонке "Подробное описание". 
          Допустимый лимит с учетом специальных символов ${componentProps.maxLen}. Уменьшите количество символов и сохраните заново`;
      const editor = {
        getData: () => 'a'.repeat(maxLength + 1)
      };

      spyOn(instance, 'closeEditorInstance');
      instance.handleBlur({editor});

      expect(componentProps.addError).toHaveBeenCalledWith({
        target: 'table',
        title: errorText
      });
      expect(componentProps.removeError).not.toHaveBeenCalled();
      expect(instance.closeEditorInstance).not.toHaveBeenCalled();
    });

    it('should remove the error message and close editor', () => {
      const editor = {
        getData: () => 'text'
      };

      spyOn(instance, 'closeEditorInstance');
      instance.handleBlur({editor});

      expect(componentProps.addError).not.toHaveBeenCalled();
      expect(componentProps.removeError).toHaveBeenCalledWith({target: 'table'});
      expect(instance.closeEditorInstance).toHaveBeenCalled();
    });
  });
});
