# react-tiny-world

> A ReactJS app of a small sea world where the user can build islands

This tiny world will be represented by a grid that starts as all sea and then the user can click on the world and add or remove land and create tiny islands. The user will need to be able to change the size of this tiny world and have data displayed about this world.

## Technical Analysis

### UI options for render

- Canvas
  **Pros:** fast render, better UI performance
  **Cons:** harder to code, interactions and resize canvas can be tricky
- HTML containers (div or span)
  **Pros:** easier to code, interactions and resize of canvas are easy to achieve
  **Cons:** slower to render affecting UI performance on a large set of elements, might consider react fiber as a performance upgrade

### UI options for CSS

- Use CSS in JS
- Tailwind CSS
- Material-UI if needed

### Unit tests for UI

- Initial state of App - display
  - empty state
  - size
  - data shown (amount of cells, amount of islands)
- Change grid size Dialog - display - validate inputs (width, height) - submit should trigger grid size change
- Cell - display - toggle
- Grid - toggling some cells should display correct data - grid size change

### State management options

- Because this is not a data intensive app, I'll try to keep state on the main component using useState hook.

### Algorithms and Data Structures

- Create unit tests for Grid - countFilled - countIslands - change size
- Create Grid class
  - Constructor (width, height)
  - Create method to get the amount of cells filled
  - Create method to get the amount of islands (_use Breath First Search approach, may be improved by memoizing previous filled cells and only going through them instead of the entire Grid.)_
    - get neighbors for specific cell
    - visit neighbors
  - Create method to resize Grid _(may clean the Grid or preserve filled cells)_

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Development history

### Day 1

- Data structures
- Algorithms with Unit testing and
- Proof of concept for UI:

![First Iteration](/public/proof-of-concept-ui.png)

### Day 2

- Add resize function to the Grid
- Add Unit tests for resize function
- Add resize dialog UI
- Improve CSS for UI

![Second Iteration](/public/ui-2.png)

### Day 3

- Go through the code and Refactor if needed
- Add Unit tests for UI
- Test coverage 100%
- Add code styling
- Clean up code
