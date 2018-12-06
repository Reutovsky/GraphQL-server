const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');


// Hardcoded data
const customers = [
  {id: '1', name:'Dmitry Ivanov', email:'codemecodeyou@gmail.com', age: 29},
  {id: '2', name:'Petya Petrov', email:'petya@gmail.com', age: 21},
  {id: '3', name:'Senia Sidorov', email:'senia@gmail.com', age: 32}
];

// Custome Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:() => ({
    customer: {
      type: CustomerType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        for(let i = 0; i < customers.length; i++){
          if(customers[i].id == args.id){
            return customers[i];
          }
        }
      }
    },
    customers:{
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args){
        return customers;
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery
});