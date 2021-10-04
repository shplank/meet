Feature: SPECIFY NUMBER OF EVENTS

  Scenario: When user hasn’t specified a number, 32 is the default number
    Given that the user has not changed the number of events
    When the app is loaded
    Then 32 events are listed

  Scenario: User can change the number of events they want to see
    Given that events are loaded
    When a user selects a number of events to view
    Then the list of events displayed is no greater than that selected number
