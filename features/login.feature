Feature: Login with valid user types

  @smoke
  Scenario Outline: Login succeeds for valid credentials
    Given I open the saucedemo website
    When I enter credentials "<username>" and "<password>"
    And I click the login button
    Then I should see the products page

    Examples:
      | username                | password     |
      | standard_user           | secret_sauce |
      | performance_glitch_user | secret_sauce |
      | visual_user             | secret_sauce |
