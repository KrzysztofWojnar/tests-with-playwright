Feature: Simple Saucedemo flow
  As a user
  I want to perform purchase process
  So that I can buy products

  Scenario: Buying many products - happy path
    Given I am on the login page
    When I log in as the "standard" user
    When I add all items to the cart
    When I go to the cart
    When I remove third item from the cart
    Then I have products in my cart
      | name                              |
      | Sauce Labs Backpack               |
      | Sauce Labs Bike Light             |
      | Sauce Labs Fleece Jacket          |
      | Sauce Labs Onesie                 |
      | Test.allTheThings() T-Shirt (Red) |
    Then The cart does not contain the item "Sauce Labs Bolt T-Shirt"
    Then The total items counter shows 5
    When I finish the purchase
    Then Success purchase screen is visible

  Scenario: Validate item in cart
    Given I am on the login page
    When I log in as the "problem" user
    When I find and click on item "Sauce Labs Bike Light"
    When I add the item to the cart from item page
    When I go to the cart
    Then I can see "Sauce Labs Bike Light" in the cart

  Scenario: Sort products by name
    Given I am on the login page
    When I log in as the "standard" user
    When I sort products by "Name (A to Z)"
    Then the products are sorted alphabetically

  Scenario: Login with locked user
    Given I am on the login page
    When I log in as the "locked" user
    Then login fails with message "Epic sadface: Sorry, this user has been locked out."
