const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    user: User
  }
  type Mutation {
    createUser(input: UserInput): User
    create
  }
  type User {
    _id: ID
    name: String
    restaurantID: ID
    sectionID: [ID]
    email: String
    admin: Boolean
  }
  input UserInput {
    name: String
    email: String
    admin: Boolean
  }
  type Section {
    _id: ID
    name: String
    restaurantID: ID
    membersID: [ID]
    tasks: [Task]
  }
  type Task {
    _id: ID!
    taskName: String
    maxQuantity: Int
    curQuantity: Int
    completed: Boolean
  }
  type Restaurant {
    _id: ID
    name: String
    inventory: [Inventory]
    membersID: [ID]
  }
  input RestaurantInput {
    name: String
    inventory: Inventory
  }
  type Inventory {
    _id: String
    itemName: String
    itemQuantity: Int
  }
  input InventoryInput {
    itemName: String
    itemQuantity: Int
  }
`;

module.exports = typeDefs;
