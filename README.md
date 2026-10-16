# BINUS Frontend Template Usability Guide 

## Prequisites
1. Please don't forget to create the keys-frontend-template-dev.ts file and putting it **in the same folder** as package.json, package-lock.json, README.md, tsconfig.app.json, tsconfig.json. tsconfig.node.json, and vite.config.js

2. Make sure that the application already has the API */auth/token_binus* which will return the JWT Token required to fetch data from the other APIs, in the case that the API to fetch JWT tokens has already been made with a different endpoint, it can be reconfigured in the *api-client.tsx* file within the *refreshBinusToken* function

3. There is already a predefined route for success after a microsoft authorization which is */auth/success*

## api
Api is the place to fetch api using axios which has been predefined inside the utilities folder, the *api file is to be named based on the services or database name* for example: MsUser to make searching for endpoints easier. the function is declared to be used inside the custom hooks folder

## assets
Assets is the place to store assets used inside the application so that it can be used globally

## components
Components contains components that will be accesible globally within the entire application

## config
Config is the place to keep configs, in this case the API fetch tool axios has been declared, the axios has been configured to:
1. Automatically fetch the token from the previously declared */auth/token_binus* or the endpoint that has been set up in the prequisites
2. Automatically checks if the token has expired (by using the 401 or 403 response) and refetch the token from the previously declared */auth/token_binus* or the endpoint that has been set up in the prequisites, then saves the token inside the global state management too (if any is used)

## custom-hooks (global)
Custom hooks are used mainly but not limited to to manage states within api using the preinstalled tanstack-react-query, with some predefined folders such as mutations and queries which will be used to declare useMutation and useQuery hook respectively

## middlewares
Middlewares that has been declared and set up are *AuthCallbackMiddleware, CustomBooleanMiddleware, and ErrorBoundary* with the following functions
1. AuthCallbackMiddleware - Used in validating if the route contains the required variables (session_state, state and code) for authentication
2. CustomBooleanMiddleware - Used in validating if the function is true continue to the component
3. ErrorBoundary - Navigates to a fallback component when an error occurs (Nearest Error Bound)

## pages
Pages contains the main page with the name format pagename-page with the components, types, and hooks folder which will include those that are used **locally**, if the page did not use one or more of the boilerplate folders simply don't create them

## styles 
Styles contains multiple CSS files, based on which styling framework tools is used, by default it contains the *global-vanilla.css* which is a standard global css file setup that has been connected to the *main.tsx* file, other than this file there might also be a *global-tailwind.css* file which contains the default tailwind config that also has been connected to the *main.tsx* file. Unlike vanilla and tailwind, if bootstrap is the framework of choice, then there will be no files configured here since bootstrap does not really require its user to implement this style

## types
Used to store types used **globally** in the application

## Utilities
Stores functions that might be **globally** used in multiple components 

## routes 
Routes contains 2 files which will be used to map both the protected routes, public routes, etc based on application needs, the mapping is done within the App.tsx within line 25 - 41

## store, zustand, and jotai
The standard global state management boilerplate setup which has been set to persist the datas such as microsoft token and binus token as is configured inside the *config* folder