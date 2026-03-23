Feature: Saucedemo Shopping Flow

  Background:
    Given I open the saucedemo website

  @smoke
  Scenario: Full shopping flow - login, browse, cart, and remove
    When I login as "standard_user"
    And I click the login button
    Then I should see the products page

    When I collect all products with their name and price
    Then the products list should not be empty

    When I add the first product to the cart
    Then the cart quantity should be 1

    When I navigate to the cart page
    Then the cart should contain 1 item with correct name and description
    And the Remove button should be enabled
    And the Checkout button should be enabled
    And the Continue Shopping button should be enabled

    When I remove the product from the cart
    Then the cart quantity should be 0
