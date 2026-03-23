Feature: Login with valid user types

  @smoke
  Scenario Outline: Login succeeds for <username>
    Given I open the saucedemo website
    When I login as "<username>"
    And I click the login button
    Then I should see the products page

    Examples:
      | username                |
      | standard_user           |
      | performance_glitch_user |
      | visual_user             |
