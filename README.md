See this app in action at [https://defualt.github.io/dia-homework/dist/](https://defualt.github.io/dia-homework/dist/).

Boilerplate adapted from https://github.com/drgx/react-native-plus-web.  
This provided a basic webpack setup  
and basic app bootstrap for react-native-web.

To follow the source code for the app,  
start at `index.web.js` and follow the trail of imports.

Each file has top comments describing the contents.

This app has an infinite scroll feature.  To see it in action,
make sure to sure the "Sort Articles" dropdown to
something like "Published at.",
because the default sort is "Top Headlines" which is limited in count
by the api.

This project adheres to feature-based organization.
All interesting code is found in the "features" folder.
Features could be visual components, bootstrapping modules,
bundling infrastructure -- pretty much anything that's convenient
to consider a feature is treated as feature.

`react-native-web` is used instead of vanilla `react`
because it provides a nice abstraction over html elements,
and it provides the flexibility to port to native platforms.

`eslint` is implemented with the `Airbnb` standards as a base,
modified with `prettier` rules so that the linter doesn't
complain about things that `prettier` fixes automatically,
also modified with performance ensurance rules,
and also modified with other `eslint` customization is in place.

## commands

### `npm install`

Do this once to install dependencies.

### `npm run watch:web`

Develop the app.  
Bundle in dev mode.
Open [http://localhost:3000/](http://localhost:3000/)

### `npm run build:web`

Bundle in production mode.
HTML and JS files placed in the `./dist` folder.

### `npm run eslint`

Runs eslint to find errors, performance issue, and code mess.


### `npm run prettier`

Cleans up your code and makes it consistent with
whitespace and quote types.
