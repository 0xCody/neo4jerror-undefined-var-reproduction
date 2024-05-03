import {startStandaloneServer} from '@apollo/server/standalone'
import {server, driver} from 'environment'

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000},
  context: async ({req}) => {
    return {token: req.headers.authorization, driver}
  },
})

console.log(`GraphQL server ready at ${url}`)
