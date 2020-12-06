const subscriptionClient = new SubscriptionClient(
    "ws://react.eogresources.com/graphql",
    { reconnect: true },
);

export const client = createClient({
    url: "https://react.eogresources.com/graphql",
    exchanges: [
        ...defaultExchanges,
        subscriptionExchange({
            forwardSubscription: (operation) =>
                subscriptionClient.request(operation),
        }),
    ],
}),

