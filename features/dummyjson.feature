Feature: REST API Products
  As a developer
  I want to test the DummyJSON Products API
  So that I can ensure the API works correctly

  Scenario: Get all products
    When I request all products with no limit
    Then the request was successful
    And I print titles of products with odd ID numbers to console or to test report

  Scenario: Create a product
    When I create a product with the following data:
      | field       | value                   |
      | title       | Chałwa                  |
      | description | Placeholder description |
      | price       | 1.99                    |
      | brand       | Skawa                   |
    Then the request was successful
    And the created product has a valid id
    And the product data matches what was sent

  Scenario: Update a product
    When I get product with ID 3
    Then the request was successful
    When I update the product price by 1
    Then the request was successful
    And the product price was updated correctly

  Scenario Outline: Get products with delay and validate response time
    When I request all products with delay <delay>
    Then the request was successful
    And the response time is no longer than 1000 milliseconds

    Examples:
      | delay |
      | 0     |
      | 5000  |
      | 6000  |