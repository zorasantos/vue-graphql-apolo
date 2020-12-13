// Acessa a camada de dados
const { GraphQLServer } = require('graphql-yoga')
const Binding = require('prisma-binding')
const { prisma } = require('./generated/prisma-client')
// Resolvers são funções que implementam alguma lógica que devolve valores
const resolvers = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers,
  context: {
    db: new Binding.Prisma({
      typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
      endpoint: process.env.PRISMA_ENDPOINT
    }),
    prisma
  }
})

server.start()
  .then(() => console.log('Server running on http://localhost:4000...'))