MEET app

A serverless, progressive web application (PWA) built with React using a test-driven development (TDD) technique. The application uses the Meetup API to fetch upcoming events for a selected city.

User Stories and Test Scenarios

FEATURE 1: FILTER EVENTS BY CITY

"As a user, I should be able to choose from a list of cities to see events happening in a specified city."

Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
Given user hasn’t searched for any city
When the user opens the app
Then the user should see a list of upcoming events

Scenario 2: User should see a list of suggestions when they search for a city.
Given the main page is open
When the user starts typing in the city textbox
Then the user should receive a list of cities (suggestions) that match what they’ve typed

Scenario 3: User can select a city from the suggested list.
Given user was typing “Berlin” in the city textbox
And the list of suggested cities is showing
When the user selects a city (e.g., “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e., “Berlin, Germany”)
And the user should receive a list of upcoming events in that city

FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS

"As a user, I should be able to 'show/hide event details', so that I can see a list of events taking place in that city."

Scenario 1: An event element is collapsed by default
Given that events are loaded
When a user views a list of events
Then each event should display in collapsed form

Scenario 2: User can expand an event to see its details
Given that a list of events is loaded and displayed
When a user clicks on a single event
Then an expanded view of that event is displayed

Scenario 3: User can collapse an event to hide its details
Given that an expanded view of an event is displayed
When a user clicks on a “close” button in that view
Then the display will revert to the previous list of collapsed events

FEATURE 3: SPECIFY NUMBER OF EVENTS

"As a user, I should be able to see a 'number of events', so that I can see how many events are taking place."

Scenario 1: When user hasn’t specified a number, 32 is the default number
Given that events are loaded
When a user views a list of events without specifying how many to view
Then 32 events are listed

Scenario 2: User can change the number of events they want to see
Given that events are loaded
When a user selects a number of events to view
Then the list of events displayed is no greater than that selected number

FEATURE 4: USE THE APP WHEN OFFLINE

"As a returning user, I should be able to access the app offline, so that I can use the app when I am unable to be online."

Scenario 1: Show cached data when there’s no internet connection
Given that a user has accessed event data on the app previously
When the user accesses previously-viewed event data while offline
Then the app displays the user’s cached data

Scenario 2: Show error when user changes the settings (city, time range)
Given that a user has accessed event data on the app previously
When the user attempts to change settings to view event data while offline
Then an error message will explain that non-cached data is unavailable

FEATURE 5: DATA VISUALIZATION

"As a user, I should be able to access a chart that shows the number of upcoming events in a city, so that I can easily see how many events are taking place in that city."

Scenario 1: Show a chart with the number of upcoming events in each city
Given that event data is loaded for a city
When a user selects a “chart view” of event data while viewing a list of events
Then the app displays a chart that shows the number of upcoming events in that city
