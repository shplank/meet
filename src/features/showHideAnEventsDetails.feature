Feature: SHOW/HIDE AN EVENT'S DETAILS

  Scenario: An event element is collapsed by default
    Given the app is loaded
    And events are loaded
    When a user views a list of events
    Then each event should display in collapsed form

  Scenario: User can expand an event to see its details
    Given the app is loaded
    And events are displayed with details hidden
    When a user clicks the show more button on a single event
    Then an expanded view of that event is displayed

  Scenario: User can collapse an event to hide its details
    Given the app is loaded
    And an expanded view of an event is displayed
    When a user clicks on a show less button in that view
    Then the display will revert to the previous list of collapsed events
