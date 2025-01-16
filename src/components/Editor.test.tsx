import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Editor from './Editor';

// Mock MonacoEditor since it requires special setup
jest.mock('react-monaco-editor', () => {
  const mockReact = jest.requireActual('react');
  return function MockEditor(props: any) {
    const [value, setValue] = mockReact.useState(props.value);
    
    mockReact.useEffect(() => {
      setValue(props.value);
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      props.onChange(newValue);
    };

    return (
      <textarea
        data-testid="mock-monaco-editor"
        value={value}
        onChange={handleChange}
      />
    );
  };
});

describe('Editor component', () => {
  const mockOnChange = jest.fn();
  
  it('renders with initial code', () => {
    render(
      <Editor 
        code="const x = 1;" 
        onChange={mockOnChange}
      />
    );
    
    const editor = screen.getByTestId('mock-monaco-editor');
    expect(editor).toBeInTheDocument();
    expect(editor).toHaveValue('const x = 1;');
  });

  it('calls onChange when code is modified', async () => {
    render(
      <Editor 
        code="const x = 1;" 
        onChange={mockOnChange}
      />
    );
    
    const editor = screen.getByTestId('mock-monaco-editor');
    await act(async () => {
      await userEvent.clear(editor);
      await userEvent.paste(editor, 'const x = 2;');
    });
    
    expect(mockOnChange).toHaveBeenLastCalledWith('const x = 2;');
  });
});
