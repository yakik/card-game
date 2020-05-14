Feature: two plus

  Scenario: plus two card
    Given a game with players:
    |player1|player2|player3|
    And it is "player1" turn, direction is "LEFT_TO_RIGHT"
    When "player1" places a "RED" "PLUS_TWO" card on the table
    Then next player is "player2"
    When "player2" takes a card from the pack
    Then next player is "player2"
    When "player2" takes a card from the pack
    Then next player is "player3"

Scenario: many plus two cards
    Given a game with players:
    |player1|player2|player3|
    And it is "player1" turn, direction is "LEFT_TO_RIGHT"
    When "player1" places a "RED" "PLUS_TWO" card on the table
    Then next player is "player2"
    When "player2" places a "RED" "PLUS_TWO" card on the table
    Then next player is "player3"
    When "player3" places a "RED" "PLUS_TWO" card on the table
    Then next player is "player1"
    When "player1" places a "RED" "PLUS_TWO" card on the table
    Then next player is "player2"
    When "player2" takes 4 cards from the pack
    Then next player is "player2"
    When "player2" takes 4 cards from the pack
    Then next player is "player3"

  Scenario: plus two card king
    Given a game with players:
    |player1|player2|player3|
    And it is "player1" turn, direction is "RIGHT_TO_LEFT"
    When "player1" places a King "RED" "PLUS_TWO" card on the table
    Then next player is "player3"
    When "player3" takes a card from the pack
    Then next player is "player3"
    When "player3" takes a card from the pack
    Then next player is "player2"

Scenario: plus two card after Taki
    Given a game with players:
    |player1|player2|player3|
    And it is "player1" turn, direction is "RIGHT_TO_LEFT"
    When "player1" places a "RED" "TAKI" card on the table
    Then next player is "player1"
    When "player1" places a "RED" "PLUS_TWO" card on the table
    Then next player is "player1"
    When "player1" indicates Taki series is done
    Then next player is "player3"
    When "player3" takes a card from the pack
    Then next player is "player3"
    When "player3" takes a card from the pack
    Then next player is "player2"
    
 