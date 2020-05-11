Feature: special cards

  Scenario: regular number card
    Given a game with players:
    |player1|player2|player3|
    And it is "player1" turn, direction is "LEFT_TO_RIGHT"
    When "player1" places a "RED" 8 card on the table
    Then next player is "player2"

  Scenario: change direction card
    Given a game with players:
    |player1|player2|player3|
    And it is "player1" turn, direction is "LEFT_TO_RIGHT"
    When "player1" places a "RED" "CHANGE_DIRECTION" card on the table
    Then next player is "player3"

  Scenario: plus two card
    Given a game with players:
    |player1|player2|player3|
    And it is "player1" turn, direction is "LEFT_TO_RIGHT"
    When "player1" places a "RED" "PLUS_TWO" card on the table
    Then next player is "player2"

  Scenario: stop card
    Given a game with players:
    |player1|player2|player3|player4|
    And it is "player1" turn, direction is "RIGHT_TO_LEFT"
    When "player1" places a "RED" "STOP" card on the table
    Then next player is "player3"
  
  Scenario: plus card
    Given a game with players:
    |player1|player2|player3|player4|
    And it is "player1" turn, direction is "LEFT_TO_RIGHT"
    When "player1" places a "RED" "PLUS" card on the table
    Then next player is "player1"
    When "player1" places a "RED" 8 card on the table
    Then next player is "player2"
  
  Scenario: taki card
    Given a game with players:
    |player1|player2|player3|player4|
    And it is "player1" turn, direction is "RIGHT_TO_LEFT"
    When "player1" places a "RED" "TAKI" card on the table
    Then next player is "player1"
    When "player1" places a "RED" 8 card on the table
    Then next player is "player1"
    When "player1" indicates Taki series is done
    Then next player is "player4"

   #Scenario: change color card
   # Given a game with players "player1", "player2", "player3", "player4"
   # And it is "player1" turn, previous player was "player4"
   # When "player1" places a "CHANGE_COLOR" card, selected color is "RED" on the table
   # Then next player is "player2"
    
    
    

 # Scenario Outline: much more complex stuff
 #   Given a variable set to <var>
 #   When I increment the variable by <increment>
 #   Then the variable should contain <result>

  #  Examples:
  #    | var | increment | result |
  #    | 100 |         5 |    105 |
  #    |  99 |      1234 |   1333 |
  #    |  12 |         5 |     17 |

 