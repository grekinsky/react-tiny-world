import React from 'react';
import { render, within, fireEvent } from '@testing-library/react';
import App from './App';
import { initialWidth, initialHeight } from './constants';

describe('App', function () {
  let app, clickCell, hasData, isGridSize;

  beforeEach(() => {
    app = render(<App />);
    clickCell = function (x, y, inverse) {
      const grid = app.getByRole('grid');
      const rows = within(grid).getAllByRole('row');
      const cell = within(rows[y]).getAllByRole('gridcell')[x];
      if (inverse) {
        expect(cell.classList).toContain('grid-cell--filled');
      } else {
        expect(cell.classList).not.toContain('grid-cell--filled');
      }
      fireEvent.click(cell);
      // The cell x,y of the Grid should have "grid-cell--filled" class
      if (inverse) {
        expect(cell.classList).not.toContain('grid-cell--filled');
      } else {
        expect(cell.classList).toContain('grid-cell--filled');
      }
    };

    hasData = function (width, height, filled, islands) {
      const labelWidth = app.getByLabelText(/Width:/i);
      expect(labelWidth).toBeInTheDocument();
      expect(labelWidth).toHaveTextContent(width);

      const labelHeight = app.getByLabelText(/Height:/i);
      expect(labelHeight).toBeInTheDocument();
      expect(labelHeight).toHaveTextContent(height);

      const labelFilled = app.getByLabelText(/Filled:/i);
      expect(labelFilled).toBeInTheDocument();
      expect(labelFilled).toHaveTextContent(filled);

      const labelIslands = app.getByLabelText(/Islands:/i);
      expect(labelIslands).toBeInTheDocument();
      expect(labelIslands).toHaveTextContent(islands);
    };

    isGridSize = function (width, height) {
      const grid = app.getByRole('grid');
      expect(grid).toBeInTheDocument();

      const rows = within(grid).getAllByRole('row');
      expect(rows.length).toEqual(height);

      expect(within(rows[0]).getAllByRole('gridcell').length).toEqual(width);
    };
  });

  test('renders interface', () => {
    // App Interface
    // 01. The app shows a top bar with the text "Tiny World"
    const title = app.getByText(/Tiny World/i);
    expect(title).toBeInTheDocument();

    // 02. The app shows a Grid component with 3 rows and 3 columns and all cells should not have "grid-cell--filled" class
    isGridSize(initialWidth, initialHeight);

    // 03. The sidebar shows width: 3, height: 3, filled: 0, islands: 0
    hasData(initialWidth, initialHeight, 0, 0);

    // 04. The app shows a button with "Resize" text
    (function () {
      const resizeButton = app.getByRole('button', { name: /resize/i });
      expect(resizeButton).toBeInTheDocument();
    })();
  });

  test('grid interaction', () => {
    // Grid interaction

    // 01. The user clicks the {x: 0, y: 0} coords in the canvas
    clickCell(0, 0);

    // 02. The user clicks the {x: 1, y: 0} coords in the canvas
    clickCell(1, 0);

    // 05. The sidebar shows width:3, height: 3, filled: 2, islands 1
    hasData(initialWidth, initialHeight, 2, 1);

    // 08. The user clicks the {x: 2, y: 1} coords in the canvas
    clickCell(2, 1);

    // 07. The sidebar shows width:3, height: 3, filled: 3, islands 2
    hasData(initialWidth, initialHeight, 3, 2);

    // 08. The user clicks the {x: 1, y: 0} coords in the canvas
    clickCell(1, 0, true);

    // 10. The sidebar shows width:3, height: 3, filled: 2, islands 2
    hasData(initialWidth, initialHeight, 2, 2);
  });

  test('resize successful', () => {
    // Resize Successful
    clickCell(0, 0);
    clickCell(1, 0);
    clickCell(2, 1);

    hasData(initialWidth, initialHeight, 3, 2);

    expect(() => app.getByRole('dialog')).toThrow();
    // 01. The user clicks the button with "Resize" text
    (function () {
      const resizeButton = app.getByRole('button', { name: /resize/i });
      expect(resizeButton).toBeInTheDocument();
      fireEvent.click(resizeButton);
    })();

    (function () {
      const dialog = app.getByRole('dialog');

      // 02. The app shows a Resize dialog
      expect(dialog).toBeInTheDocument();

      // 03. The dialog shows a "width" input with a value of 3
      const inputWidth = within(dialog).getByLabelText(/width/i);
      expect(inputWidth.value).toBe(initialWidth.toString());

      // 04. The dialog shows a "height" input with a value of 3
      const inputHeight = within(dialog).getByLabelText(/height/i);
      expect(inputHeight.value).toBe(initialHeight.toString());

      // 05. The dialog shows a button with "OK" text
      const btnOK = within(dialog).getByText(/ok/i);
      expect(btnOK).toBeInTheDocument();

      // 06. The user enters a value of 2 in the width input
      fireEvent.change(inputWidth, { target: { value: '2' } });

      // 07. The user enters a value of 4 in the height input
      fireEvent.change(inputHeight, { target: { value: '4' } });

      // 08. The user clicks the button with "OK" text
      fireEvent.click(btnOK);

      // 09. The dialog hides
      expect(dialog).not.toBeInTheDocument();
    })();

    // 10. The Grid should have 4 rows and 2 columns
    isGridSize(2, 4);

    // 11. The sidebar shows width: 2, height: 4, filled: 2, islands 1
    hasData(2, 4, 2, 1);
  });

  test('resize failed', () => {
    // Resize Failed

    expect(() => app.getByRole('dialog')).toThrow();
    // 01. The user clicks the button with "Resize" text
    (function () {
      const resizeButton = app.getByRole('button', { name: /resize/i });
      expect(resizeButton).toBeInTheDocument();
      fireEvent.click(resizeButton);
    })();

    (function () {
      const dialog = app.getByRole('dialog');

      // 02. The app shows a Resize dialog
      expect(dialog).toBeInTheDocument();

      // 03. The dialog shows a "width" input with a value of 3
      const inputWidth = within(dialog).getByLabelText(/width/i);
      expect(inputWidth.value).toBe(initialWidth.toString());

      // 04. The dialog shows a button with "OK" text
      const btnOK = within(dialog).getByText(/ok/i);
      expect(btnOK).toBeInTheDocument();

      // 05. The user enters a value of 2 in the width input
      fireEvent.change(inputWidth, { target: { value: '-2' } });

      // 06. The user clicks the button with "OK" text
      fireEvent.click(btnOK);

      // 07. A text with "Invalid dimensions" should be visible in the page
      expect(app.getByText('Invalid dimensions')).toBeInTheDocument();

      // 08. The dialog should keep visible
      expect(dialog).toBeInTheDocument();
    })();
  });

  test('resize cancel', () => {
    // Resize Cancelled

    expect(() => app.getByRole('dialog')).toThrow();
    // 01. The user clicks the button with "Resize" text
    (function () {
      const resizeButton = app.getByRole('button', { name: /resize/i });
      expect(resizeButton).toBeInTheDocument();
      fireEvent.click(resizeButton);
    })();

    (function () {
      const dialog = app.getByRole('dialog');

      // 02. The app shows a Resize dialog
      expect(dialog).toBeInTheDocument();

      // 03. The dialog shows a "width" input with a value of 3
      const inputWidth = within(dialog).getByLabelText(/width/i);
      expect(inputWidth.value).toBe(initialWidth.toString());

      // 04. The dialog shows a button with "Cancel" text
      const btnCancel = within(dialog).getByText(/cancel/i);
      expect(btnCancel).toBeInTheDocument();

      // 05. The user enters a value of 2 in the width input
      fireEvent.change(inputWidth, { target: { value: '2' } });

      // 06. The user clicks the button with "OK" text
      fireEvent.click(btnCancel);

      // 07. The dialog hides
      expect(dialog).not.toBeInTheDocument();
    })();

    // 08. The Grid should have 3 rows and 3 columns
    isGridSize(initialWidth, initialHeight);

    // 09. The sidebar shows width: 3, height: 3, filled: 0, islands 0
    hasData(initialWidth, initialHeight, 0, 0);
  });
});
