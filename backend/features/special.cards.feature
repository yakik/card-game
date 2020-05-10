Feature: special cards

  Scenario: first scenario
    Given an empty game
    And pack has card of type "CHANGE_COLOR"
    And player "playerOne" joins the game
    And "playerOne" takes a card from the pack
    When "playerOne" places a "CHANGE_COLOR" card on the table
    Then "playerOne" has 0 cards left

 # Scenario Outline: much more complex stuff
 #   Given a variable set to <var>
 #   When I increment the variable by <increment>
 #   Then the variable should contain <result>

  #  Examples:
  #    | var | increment | result |
  #    | 100 |         5 |    105 |
  #    |  99 |      1234 |   1333 |
  #    |  12 |         5 |     17 |

 