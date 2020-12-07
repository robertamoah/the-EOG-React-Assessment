// import { split } from "appolo-link";
// import { httpLink } from "apollo-link-http";
// import { ApolloClient } from "apollo-client";
// import { WebSocketLink } from "apollo-link-ws";
// import { getMainDefinition } from "apollo-utilities";
// import { InMemoryCache } from "apollo-boost";

// const wsLink = new WebSocketLink({
//   uri: "https://react.eogresources.com/graphql",
//   options: {
//     reconnect: true,
//   },
// });

// const httpLink = new httpLink({
//   uri: "https://react.eogresources.com/graphql",
// });

// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);

//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink,
// );

// export default new ApolloClient({
//   cache: new InMemoryCache(),
//   link,
// });
