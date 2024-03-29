# event-manager

## Things you need to install
- Node
- Yarn

## Quick Start
The first things you need to do are cloning this repository and installing its dependencies:

```
git clone git@github.com:SwyftxBootcamp2022Team2/event-manager.git
cd event-manager
cd frontend
yarn install
```

Once installed, let's run the frontend local development enviroment
```
cd frontend
yarn start
```

For the backend, run the following
```
cd event-manager
cd backend
pip install requirements.txt
```

Then, initialise the database and run it:
```
python3 init_db.py
export FLASK_APP=myapp
export FLASK_ENV=development // [OPTIONAL] - For reloading on save
flask run
```

## What's included
- [React TypeScript](https://www.typescriptlang.org/docs/handbook/react.html)
- [ESLint](https://eslint.org/docs/latest/)
- [React Router](https://reactrouter.com/docs/en/v6)
- [Chakra UI](https://chakra-ui.com/)
