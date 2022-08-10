# Monitoring beer temperature (client)

## Assumption
- I'm not supposed to improve current UI & UX. 
- I'm not supposed to add react routes
- For some reason we can not use socket.io
- Push notification is not needed (because of course user might not check this UI for ever. so it is better to implement a alert system for these cases)


## Highlights of my improvements 
- create `useAsyncInterval` hook with setTimeout instead of setInterval.
  There is a problem with setInterval when working with `async` commands. let's assume api response takes 2000 MS and you set delay in setInterval less than this number. eg 1000ms. in this case you send a lot of requests and raceCondition happen. In my solution, it waits after the sent request receive the response. also by the help of timeout in the `http` helper that I created, you don't need to wait for ever :)
- send one request in each cycle, because if the connection limit is reached by the browser, further requests will wait until connections free up. eg chrome has a limit of 6 connections per host name, and a max of 10 connections. This essentially means that it can handle 6 requests at a time coming from the same host, and will handle 4 more coming from another host at the same time


## If I had more time I would:
- Improve test coverage
- Add better error handling
- Add Loading


## Available scripts

- `npm start` - Start the application (Port 3000)
- `npm run test:coverage` Create coverage test report

